import type { CategoryRef } from "./types";

/**
 * The category's slug, or one made from its title if it hasn't been generated
 * in Sanity yet. Mirrors Sanity's own slugify (lowercase, hyphens, max 96
 * characters), so clicking "Generate" later doesn't change the address.
 */
export function categorySlug(category: CategoryRef): string {
  return (
    category.slug ||
    category.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 96)
  );
}

export const categoryHref = (category: CategoryRef) => `/blog/category/${categorySlug(category)}`;
