import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Pure white and the brand black — maximum contrast at 16px. */
export const ICON_BG = "#0B0B0C";
export const ICON_INK = "#FFFFFF";

/**
 * Satori ships no fonts and cannot read woff2, so the .woff files live in
 * assets/fonts and are inlined at build time.
 */
export function archivo(weight: 400 | 800) {
  return readFile(join(process.cwd(), "assets", "fonts", `archivo-${weight}.woff`));
}
