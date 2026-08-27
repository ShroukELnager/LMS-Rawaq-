'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  label?: string;
};

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  label = 'students',
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const start = (currentPage - 1) * pageSize + 1;

  const end = Math.min(currentPage * pageSize, totalCount);

  /*
   * Pagination rules:
   *
   * Always show:
   * - First page
   * - Last page
   *
   * Show:
   * - Current page
   * - One page before current
   * - One page after current
   *
   * If there is only ONE missing page between
   * two visible pages, show the number.
   *
   * If there are MORE than one missing pages,
   * show dots.
   */
  const getPages = () => {
    const pages = new Set<number>();

    pages.add(1);
    pages.add(totalPages);

    pages.add(currentPage);
    pages.add(currentPage - 1);
    pages.add(currentPage + 1);

    const validPages = Array.from(pages)
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);

    const result: (number | 'ellipsis')[] = [];

    for (let index = 0; index < validPages.length; index++) {
      const page = validPages[index];

      result.push(page);

      const nextPage = validPages[index + 1];

      if (nextPage) {
        const gap = nextPage - page;

        if (gap === 2) {
          result.push(page + 1);
        }

        if (gap > 2) {
          result.push('ellipsis');
        }
      }
    }

    return result;
  };

  const pages = getPages();

  return (
    <div className="mt-6 flex w-full items-center justify-center rounded-b-2xl bg-[#F9F9FD] px-4 py-5 md:justify-between md:bg-transparent md:px-0 md:py-0">
      {/* Showing count */}
      <p className="hidden text-sm text-[#667085] md:block">
        Showing {start}–{end} of {totalCount} {label}
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="
            flex
            h-[40px]
            w-[40px]
            items-center
            justify-center
            rounded-lg
            border-0
            bg-transparent
            text-[#667085]
            transition
            hover:bg-gray-100
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronLeft className="h-6 w-6 stroke-[2]" />
        </button>

        {/* Pages */}
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="
                flex
                h-[40px]
                w-[40px]
                items-center
                justify-center
                text-base
                font-medium
                text-[#667085]
              "
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
                flex
                h-[40px]
                w-[40px]
                items-center
                justify-center
                rounded-lg
                border-0
                text-base
                font-medium
                transition
                ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-[#101828] hover:bg-gray-100'
                }
              `}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="
            flex
            h-[40px]
            w-[40px]
            items-center
            justify-center
            rounded-lg
            border-0
            bg-transparent
            text-[#667085]
            transition
            hover:bg-gray-100
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronRight className="h-6 w-6 stroke-[2]" />
        </button>
      </div>
    </div>
  );
}
