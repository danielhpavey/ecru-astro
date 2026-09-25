import { createClient, type SanityClient } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;

/**
 * `null` until PUBLIC_SANITY_PROJECT_ID is set. Blog pages check for this
 * and render an empty/"coming soon" state instead of querying, so the rest
 * of the site keeps building and deploying even before Sanity is configured.
 */
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2026-01-01",
      useCdn: false,
    })
  : null;
