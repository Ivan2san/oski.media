import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

/**
 * Handles the GitHub OAuth dance and the git reads/writes behind the admin.
 * In local storage mode (development) the credentials are unused and edits
 * go straight to disk.
 */
const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
const secret = process.env.KEYSTATIC_SECRET;

/**
 * Keystatic throws at module load if GitHub mode is missing credentials,
 * which would take the whole build down — including the public pages, which
 * don't need the admin at all. Guarding it means the site still deploys
 * before the GitHub App exists, and anyone opening the admin gets a message
 * saying exactly what's missing instead of a blank screen.
 */
const ready =
  config.storage.kind === "local" ||
  Boolean(clientId && clientSecret && secret);

async function notConfigured() {
  return Response.json(
    {
      error:
        "Keystatic is not configured. Set KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET and KEYSTATIC_SECRET, then redeploy. See README → Editing the site.",
    },
    { status: 503 },
  );
}

export const { GET, POST } = ready
  ? makeRouteHandler({ config, clientId, clientSecret, secret })
  : { GET: notConfigured, POST: notConfigured };
