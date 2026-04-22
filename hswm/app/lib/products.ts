/**
 * Product data types and collection-level utilities for the wine shop.
 *
 * This module defines the canonical `Product` shape used by all shop
 * components, as well as the `Filters` type consumed by `FilterPanel`
 * and `ShopClient`.  It also exposes two small pure-function helpers:
 *
 * - {@link normalizeWineToProduct} — coerces a raw JSON row into a `Product`.
 * - {@link paginate} — generic array paginator.
 *
 * @module products
 */

// ---------------------------------------------------------------------------
// Data types
// ---------------------------------------------------------------------------

/**
 * Raw wine record as it appears in `wines.json`.
 *
 * This shape mirrors the JSON file directly: `image_url` is nullable and
 * `price` is stored as a string.
 */
export type WineRow = {
  /** Unique identifier for the wine. */
  id: number;
  /** Display name / label of the wine. */
  title: string;
  /** Vendor / producer of the wine. */
  vendor: string;
  /** URL to the product image, or `null` if none is available. */
  image_url: string | null;
  /** Wine category slug (e.g. `"red"`, `"sparkling"`). */
  category: string;
  /** Whether the wine is currently in stock. */
  available: boolean;
  /** Free-text description of the wine. */
  description: string;
  /** Price in USD, stored as a string in the source JSON. */
  price: string;
};

/**
 * Normalised product used throughout the shop UI.
 *
 * Differs from {@link WineRow} in two ways:
 * 1. `image_url` is guaranteed non-null (a placeholder is substituted).
 * 2. `price` is a number, ready for display formatting and comparison.
 */
export type Product = {
  /** Unique identifier. */
  id: number;
  /** Display name / label. */
  title: string;
  /** Vendor / producer. */
  vendor: string;
  /** Resolved image URL (never null). */
  image_url: string;
  /** Wine category slug. */
  category: string;
  /** Whether the product is in stock. */
  available: boolean;
  /** Free-text description. */
  description: string;
  /** Numeric price in USD. */
  price: number;
};

/**
 * Active filter state managed by `ShopClient` and rendered by `FilterPanel`.
 *
 * Empty-string values for the price fields indicate "no constraint".
 */
export type Filters = {
  /** Minimum price threshold, or `""` for no minimum. */
  priceMin: number | "";
  /** Maximum price threshold, or `""` for no maximum. */
  priceMax: number | "";
  /** When `true`, hide out-of-stock products. */
  onlyAvailable: boolean;
  /** If non-empty, restrict to this single vendor. */
  vendor: string;
  /** Active category slugs; empty array means "all categories". */
  categories: string[];
};

// ---------------------------------------------------------------------------
// Pure-function helpers
// ---------------------------------------------------------------------------

/**
 * Convert a raw {@link WineRow} into a normalised {@link Product}.
 *
 * - Replaces a `null` `image_url` with the local placeholder image.
 * - Coerces the string `price` to a `number`.
 *
 * @param w - The raw wine record from the JSON data source.
 * @returns A normalised `Product` suitable for rendering.
 */
export function normalizeWineToProduct(w: WineRow): Product {
  return {
    id: w.id,
    title: w.title,
    vendor: w.vendor,
    image_url: w.image_url ?? "/image_placeholder_800px.png",
    category: w.category,
    available: w.available,
    description: w.description,
    price: Number(w.price),
  };
}

/**
 * Generic array paginator.
 *
 * @typeParam T - Element type of the source array.
 * @param items    - Full list of items to paginate.
 * @param page     - Requested 1-based page number. Clamped to valid bounds.
 * @param pageSize - Number of items per page.
 * @returns An object containing the current page slice plus pagination metadata.
 *
 * @example
 * ```ts
 * const result = paginate(allProducts, 2, 12);
 * // result.pageItems   → products 13–24
 * // result.totalPages  → Math.ceil(allProducts.length / 12)
 * // result.currentPage → 2
 * ```
 */
export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const start = (currentPage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return { pageItems, totalItems, totalPages, currentPage, pageSize };
}
