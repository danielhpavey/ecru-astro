import type { PortableTextBlock } from "sanity";

/** A category as attached to a post. `slug` is null until it's generated in Sanity. */
export interface CategoryRef {
  title: string;
  slug: string | null;
}

export interface Category extends CategoryRef {
  _id: string;
  description?: string | null;
}

export interface PostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
  authorName?: string;
  categories?: CategoryRef[] | null;
}

export interface Post extends PostSummary {
  body: PortableTextBlock[];
}
