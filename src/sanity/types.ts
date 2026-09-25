import type { PortableTextBlock } from "sanity";

export interface PostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
  authorName?: string;
}

export interface Post extends PostSummary {
  body: PortableTextBlock[];
}
