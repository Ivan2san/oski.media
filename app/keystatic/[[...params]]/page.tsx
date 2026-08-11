"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "@/keystatic.config";

/**
 * The admin UI. Client-only and code-split, so nothing here reaches a
 * visitor's bundle on the public pages.
 */
export default makePage(config);
