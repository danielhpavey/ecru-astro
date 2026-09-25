import { defineCliConfig } from "sanity/cli";

// Replace with your Sanity project ID (see README). Hardcoded for the same
// reason as sanity.config.ts.
export default defineCliConfig({
  api: {
    projectId: "your-project-id",
    dataset: "production",
  },
  studioHost: "the-ecru-stretch",
});
