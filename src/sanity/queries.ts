import { defineQuery } from "groq";

const POST_SUMMARY_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "authorName": author->name
}`;

// Inline images inside `body` need their own dimensions queried explicitly,
// Sanity doesn't include asset metadata by default, so without this,
// width/height attributes on rendered <img> tags would be wrong.
const BODY_WITH_IMAGE_DIMENSIONS = `
  body[]{
    ...,
    _type == "image" => {
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }
`;

// Fetches every post, unfiltered and unpaginated — used with Astro's
// paginate() in getStaticPaths, which slices the full array itself rather
// than us slicing it in GROQ.
export const POSTS_LIST_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${POST_SUMMARY_PROJECTION}
`);

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...3] ${POST_SUMMARY_PROJECTION}
`);

export const POST_DETAIL_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage,
    ${BODY_WITH_IMAGE_DIMENSIONS},
    "authorName": author->name
  }
`);
