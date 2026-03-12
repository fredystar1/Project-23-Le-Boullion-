"use client";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
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
