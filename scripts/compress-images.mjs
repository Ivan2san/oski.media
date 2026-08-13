/**
 * Shrinks oversized images under public/images in place.
 *
 * Editors upload whatever their phone or camera produced — a 12MB screenshot
 * is normal and not their problem to solve. Everything in public/ is deployed
 * to the edge and is publicly fetchable at its raw URL, so an unprocessed
 * upload costs deployment size and image-optimisation time on every cold
 * request, even though visitors are served a resized copy.
 *
 * Two passes:
 *   1. Resize anything longer than MAX_EDGE and re-encode in its own format.
 *   2. Convert photos misfiled as PNG to JPEG. A 12MB PNG photo lands at 3MB
 *      as PNG but 280KB as JPEG — PNG is a poor container for photographs.
 *      Only PNGs *without* an alpha channel are converted, so logos and
 *      anything with transparency keep their format.
 *
 * Converting changes the file extension, which means the path stored in
 * content/ has to change with it: Keystatic finds a file by stripping the
 * field's publicPath off the stored value, so a stale path silently blanks
 * the field in the admin with no error anywhere. Every reference is rewritten
 * in the same commit.
 *
 * Run: node scripts/compress-images.mjs [--check]
 *   --check reports what would change and exits 1, without writing.
 */
import { readdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_DIR = path.join(PUBLIC_DIR, "images");
const CONTENT_DIR = path.join(process.cwd(), "content");

/** Long edge in pixels. The largest slot on the site is a full-bleed hero. */
const MAX_EDGE = 2400;

/** Anything at or under this, at sane dimensions, is left alone. */
const SKIP_UNDER_BYTES = 400 * 1024;

const ENCODERS = {
  ".jpg": (img) => img.jpeg({ quality: 82, mozjpeg: true }),
  ".jpeg": (img) => img.jpeg({ quality: 82, mozjpeg: true }),
  ".png": (img) => img.png({ compressionLevel: 9, adaptiveFiltering: true }),
  ".webp": (img) => img.webp({ quality: 82 }),
};

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // the directory may not exist yet
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;
/** public/images/a/b.png -> /images/a/b.png, the form stored in content/. */
const publicPath = (file) => "/" + path.relative(PUBLIC_DIR, file).split(path.sep).join("/");

const check = process.argv.includes("--check");
const changes = [];

for await (const file of walk(IMAGE_DIR)) {
  const ext = path.extname(file).toLowerCase();
  const encode = ENCODERS[ext];
  if (!encode) continue;

  const { size } = await stat(file);
  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  const oversized = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_EDGE;

  if (size <= SKIP_UNDER_BYTES && !oversized) continue;

  // rotate() applies the EXIF orientation, so phone uploads aren't sideways
  // once the metadata is dropped. withoutEnlargement leaves small images be.
  const resized = sharp(input).rotate().resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: "inside",
    withoutEnlargement: true,
  });

  // A PNG that isn't using transparency is a photograph in the wrong
  // container. Phone exports routinely carry an alpha channel that is fully
  // opaque, so hasAlpha alone would leave the worst offenders as PNG —
  // isOpaque is what actually decides whether anything would be lost.
  const opaque =
    ext === ".png" &&
    (!meta.hasAlpha || (await sharp(input).stats()).isOpaque);
  const toJpeg = Boolean(opaque);
  const target = toJpeg ? file.replace(/\.png$/i, ".jpg") : file;

  // Never clobber an unrelated file that already owns the target name.
  if (toJpeg && target !== file) {
    const taken = await stat(target).then(() => true).catch(() => false);
    if (taken) {
      console.warn(`skipping ${publicPath(file)} — ${path.basename(target)} exists`);
      continue;
    }
  }

  const output = await (toJpeg
    ? resized.flatten({ background: "#000" }).jpeg({ quality: 82, mozjpeg: true })
    : encode(resized)
  ).toBuffer();

  // Re-encoding can grow a file that was already well compressed.
  if (output.length >= size && !toJpeg) continue;

  changes.push({
    from: publicPath(file),
    to: publicPath(target),
    bytesFrom: size,
    bytesTo: output.length,
    renamed: target !== file,
  });

  if (!check) {
    await writeFile(target, output);
    if (target !== file) await unlink(file);
  }
}

// Rewrite the stored paths for anything that changed extension.
const renames = changes.filter((c) => c.renamed);
let rewritten = 0;

if (renames.length) {
  for await (const file of walk(CONTENT_DIR)) {
    if (!/\.(ya?ml|json|mdoc|md)$/i.test(file)) continue;
    const before = await readFile(file, "utf8");
    let after = before;
    for (const { from, to } of renames) after = after.split(from).join(to);
    if (after === before) continue;
    rewritten++;
    if (!check) await writeFile(file, after);
  }
}

if (!changes.length) {
  console.log("All images within budget.");
  process.exit(0);
}

for (const c of changes) {
  const arrow = c.renamed ? ` (-> ${path.basename(c.to)})` : "";
  console.log(`${c.from}: ${kb(c.bytesFrom)} -> ${kb(c.bytesTo)}${arrow}`);
}
const saved = changes.reduce((s, c) => s + (c.bytesFrom - c.bytesTo), 0);
console.log(
  `${changes.length} image(s), ${kb(saved)} saved` +
    (renames.length ? `, ${rewritten} content file(s) repointed.` : "."),
);

if (check) process.exit(1);
