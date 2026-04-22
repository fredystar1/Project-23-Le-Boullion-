/**
 * Shop client orchestrator — manages filter state, pagination, and
 * layout for the wine shop.
 *
 * This is a **client component** (`"use client"`) that receives the
 * full `Product[]` array from the server-side shop page and handles
 * all interactive behaviour:
 *
 * 1. Derives the unique vendor and category lists for filter options.
 * 2. Applies active filters to produce a filtered product subset.
 * 3. Paginates the filtered results.
 * 4. Renders the two-column layout (`FilterPanel` + `ShopGrid` + `Pagination`).
 *
 * @module shop/ShopClient
 */

"use client";

import { useMemo, useState } from "react";
import FilterPanel from "./FilterPanel";
import ShopGrid from "./ShopGrid";
import Pagination from "../Pagination";
import type { Filters, Product } from "../lib/products";

/**
 * Default filter state — no constraints applied.
 * @internal
 */
const DEFAULT_FILTERS: Filters = {
  priceMin: "",
  priceMax: "",
  onlyAvailable: false,
  vendor: "",
  categories: [],
};

/** Number of products displayed per page. */
const PAGE_SIZE = 12;

/**
 * Interactive shop interface with filtering, pagination, and product grid.
 *
 * @param props          - Component props.
 * @param props.products - The complete, un-filtered product catalogue
 *                         supplied by the server component.
 * @returns The full shop layout (filter sidebar + grid + pager).
 */
export default function ShopClient({ products }: { products: Product[] }) {
  /** Active filter state. */
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  /** Current 1-based page number. */
  const [page, setPage] = useState(1);

  /** Sorted list of unique vendor names for the vendor dropdown. */
  const vendors = useMemo(
    () => Array.from(new Set(products.map((p) => p.vendor))).sort(),
    [products],
  );

  /** Sorted list of unique category slugs for the category chips. */
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );

  /**
   * Products remaining after all active filters are applied.
   *
   * Re-computed whenever `products` or `filters` change.
   */
  const filtered = useMemo(() => {
    const min = filters.priceMin === "" ? -Infinity : filters.priceMin;
    const max = filters.priceMax === "" ? Infinity : filters.priceMax;

    return products.filter((p) => {
      if (filters.onlyAvailable && !p.available) return false;
      if (filters.vendor && p.vendor !== filters.vendor) return false;
      if (p.price < min || p.price > max) return false;
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(p.category)
      )
        return false;
      return true;
    });
  }, [products, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  /** Products for the current page slice. */
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  /**
   * Update filters and reset to page 1.
   *
   * Resetting ensures the user doesn't land on an empty page after
   * narrowing the result set.
   *
   * @param next - The new filter state.
   */
  const handleSetFilters = (next: Filters) => {
    setFilters(next);
    setPage(1);
  };

  return (
    <div className="shop-shell">
      <div className="shop-layout">
        {/* FILTER COLUMN */}
        <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-6 lg:self-start">
          {/* Spacer that visually aligns with the main topbar */}
          <FilterPanel
            filters={filters}
            setFilters={handleSetFilters}
            vendors={vendors}
            categories={categories}
          />
        </aside>

        {/* MAIN COLUMN */}
        <main className="shop-main">
          <div className="shop-topbar border-b border-secondary/30 pb-3">
            <p className="shop-count">
              Showing <strong>{filtered.length}</strong> wines
            </p>
            <p className="shop-count">
              Page <strong>{currentPage}</strong> /{" "}
              <strong>{totalPages}</strong>
            </p>
          </div>

          <>
            <ShopGrid products={pageItems} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        </main>
      </div>
    </div>
  );
}
