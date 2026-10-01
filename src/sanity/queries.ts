import { defineQuery } from "groq";

// A post's categories, as the title + slug needed to label and link them.
const CATEGORY_REF_PROJECTION = `categories[]->{ title, "slug": slug.current }`;

const POST_SUMMARY_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  "authorName": author->name,
  "categories": ${CATEGORY_REF_PROJECTION}
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
    "authorName": author->name,
    "categories": ${CATEGORY_REF_PROJECTION}
  }
`);

// Only categories with at least one published post, so none lead to an
// empty page.
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && count(*[_type == "post" && defined(slug.current) && references(^._id)]) > 0]
    | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && $categoryId in categories[]._ref]
    | order(publishedAt desc) ${POST_SUMMARY_PROJECTION}
`);
