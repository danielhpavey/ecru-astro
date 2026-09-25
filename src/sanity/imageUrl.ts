import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

// Falls back to explicit config if the client isn't set up yet — urlFor()
// is only ever called on images that came from a successful fetch, so this
// path shouldn't be hit in practice, but keeps the module import-safe.
const builder = createImageUrlBuilder(
  sanityClient ?? {
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  },
);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Builds a srcset string from Sanity's own image CDN, requesting each width
 * as a separate resize rather than scaling one fixed image with CSS.
 * Pass `aspectRatio` (width / height) for images with a fixed crop, e.g. a
 * card thumbnail, so every variant crops consistently instead of each width
 * getting a different height and shifting the framing.
 */
export function buildSrcSet(
  source: SanityImageSource,
  widths: number[],
  options?: { aspectRatio?: number },
) {
  return widths
    .map((w) => {
      let img = urlFor(source).width(w).auto("format");
      if (options?.aspectRatio) {
        img = img.height(Math.round(w / options.aspectRatio)).fit("crop");
      }
      return `${img.url()} ${w}w`;
    })
    .join(", ");
}
