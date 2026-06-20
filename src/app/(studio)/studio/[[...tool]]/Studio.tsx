"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

/** Client wrapper for the embedded Studio. */
export function Studio() {
  return <NextStudio config={config} />;
}
