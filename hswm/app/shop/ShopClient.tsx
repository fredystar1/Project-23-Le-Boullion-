"use client";

import { useMemo, useState } from "react";
import FilterPanel from "./FilterPanel";
import ShopGrid from "./ShopGrid";
import Pagination from "../Pagination";
import type { Filters, Product } from "../lib/products";

const DEFAULT_FILTERS: Filters = {
  priceMin: "",
  priceMax: "",
  onlyAvailable: false,
  vendor: "",
  categories: [],
};

const PAGE_SIZE = 12;

export default function ShopClient({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const vendors = useMemo(
    () => Array.from(new Set(products.map((p) => p.vendor))).sort(),
    [products],
  );

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );

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

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

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
          <div className="shop-topbar-spacer" />
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
