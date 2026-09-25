import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

// Hardcoded rather than read from env: this file is parsed outside Vite by
// some Sanity CLI tooling (e.g. `sanity deploy`'s schema extraction), where
// import.meta.env isn't populated. Project ID/dataset aren't secret, so
// there's no downside to that. Keep in sync with sanity.cli.ts and .env.
export default defineConfig({
  name: "the-ecru-stretch",
  title: "The Ecru Stretch: Blog",

  projectId: "icqi4alp",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
