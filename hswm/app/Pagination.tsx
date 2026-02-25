"use client";

import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 my-8 flex-wrap">
      <Link
        href={`/shop?page=${Math.max(1, currentPage - 1)}`}
        className={`px-3 py-2 rounded border ${
          currentPage === 1 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Prev
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={`/shop?page=${p}`}
          className={`px-3 py-2 rounded border ${
            p === currentPage ? "font-semibold" : ""
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={`/shop?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`px-3 py-2 rounded border ${
          currentPage === totalPages ? "pointer-events-none opacity-50" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}
