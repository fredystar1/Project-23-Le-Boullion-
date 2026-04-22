/**
 * Filter panel sidebar for the wine shop.
 *
 * This is a **client component** (`"use client"`) that renders
 * interactive filter controls (price range, availability toggle, vendor
 * dropdown, and category chips).  Filter state is lifted up to
 * `ShopClient` via the `setFilters` callback.
 *
 * @module shop/FilterPanel
 */

"use client";

import type { Filters } from "../lib/products";

/**
 * Props accepted by the {@link FilterPanel} component.
 */
type Props = {
  /** Current filter state. */
  filters: Filters;
  /** Callback to update the filter state. */
  setFilters: (next: Filters) => void;
  /** Sorted list of unique vendor names (populates the vendor dropdown). */
  vendors: string[];
  /** Sorted list of unique category slugs (populates the category chips). */
  categories: string[];
};

/**
 * Render the shop filter sidebar.
 *
 * Sections:
 * 1. **Price range** — min / max number inputs.
 * 2. **Availability** — "Only show in-stock" checkbox.
 * 3. **Vendor** — dropdown select.
 * 4. **Category** — toggle chips.
 *
 * A badge displays the number of active filter dimensions, and a
 * "Reset" button clears all filters at once.
 *
 * @param props - See {@link Props}.
 * @returns The filter panel `<aside>` element.
 */
export default function FilterPanel({
  filters,
  setFilters,
  vendors,
  categories,
}: Props) {
  /**
   * Toggle a category slug in or out of the active filter set.
   *
   * @param cat - The category slug to toggle.
   */
  const toggleCategory = (cat: string) => {
    const has = filters.categories.includes(cat);
    const nextCats = has
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];

    setFilters({ ...filters, categories: nextCats });
  };

  /** Reset all filters to their default (empty) state. */
  const reset = () => {
    setFilters({
      priceMin: "",
      priceMax: "",
      onlyAvailable: false,
      vendor: "",
      categories: [],
    });
  };

  /** Number of distinct filter dimensions that are currently active. */
  const activeCount =
    (filters.priceMin !== "" ? 1 : 0) +
    (filters.priceMax !== "" ? 1 : 0) +
    (filters.onlyAvailable ? 1 : 0) +
    (filters.vendor ? 1 : 0) +
    (filters.categories.length > 0 ? 1 : 0);

  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="filter-panel">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="filter-title">Refine</h2>
            <p className="filter-subtitle">A pour for every occasion</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {activeCount > 0 ? (
              <span className="filter-apply-pill">{activeCount} active</span>
            ) : null}
            <button type="button" onClick={reset} className="filter-reset">
              Reset
            </button>
          </div>
        </div>

        <div className="filter-divider" />

        {/* Price */}
        <div className="mb-5">
          <p className="filter-label mb-2">Price range</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="filter-label opacity-80">Min</label>
              <input
                type="number"
                inputMode="decimal"
                value={filters.priceMin}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceMin:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                className="filter-input mt-1"
                placeholder="0"
                min={0}
              />
            </div>

            <div>
              <label className="filter-label opacity-80">Max</label>
              <input
                type="number"
                inputMode="decimal"
                value={filters.priceMax}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceMax:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                className="filter-input mt-1"
                placeholder="100"
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-5">
          <label className="filter-toggle">
            <input
              type="checkbox"
              checked={filters.onlyAvailable}
              onChange={(e) =>
                setFilters({ ...filters, onlyAvailable: e.target.checked })
              }
              className="filter-checkbox"
            />
            Only show in-stock
          </label>
        </div>

        {/* Vendor */}
        <div className="mb-5">
          <p className="filter-label mb-2">Vendor</p>
          <select
            value={filters.vendor}
            onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}
            className="filter-select"
          >
            <option value="">All vendors</option>
            {vendors.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div>
          <p className="filter-label mb-2">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = filters.categories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={
                    active ? "filter-chip filter-chip--active" : "filter-chip"
                  }
                >
                  {cat.replaceAll("_", " ")}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
