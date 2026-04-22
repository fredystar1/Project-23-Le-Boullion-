/**
 * Pagination controls component.
 *
 * Renders a horizontal row of page-number buttons with Prev / Next
 * arrows.  Used by `ShopClient` to navigate through the product grid.
 *
 * This is a **client component** (`"use client"`) because the page
 * buttons trigger state changes via the `onPageChange` callback.
 *
 * @module Pagination
 */

"use client";

/**
 * Props accepted by the {@link Pagination} component.
 */
type PaginationProps = {
  /** The currently active 1-based page number. */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Callback invoked when the user selects a different page. */
  onPageChange: (page: number) => void;
};

/**
 * Render a simple page-number pagination bar.
 *
 * The "Prev" button is disabled on the first page and "Next" is
 * disabled on the last page.  The active page button receives the
 * `pager-btn--active` CSS modifier.
 *
 * @remarks
 * A future improvement could add ellipsis truncation for large page
 * counts (see inline comment in source).
 *
 * @param props - See {@link PaginationProps}.
 * @returns A `<div>` containing the pager buttons.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  // Simple pager for now (upgrade to ellipsis later)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pager">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrev}
        className="pager-btn"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`pager-btn ${
            p === currentPage ? "pager-btn--active font-semibold" : ""
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
        className="pager-btn"
      >
        Next
      </button>
    </div>
  );
}
