'use client';

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

  if (totalPages <= 1) return null;



const start = (currentPage - 1) * pageSize + 1;
const end = Math.min(currentPage * pageSize, totalCount);
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-sm text-[#667085]">
        Showing {start}–{end} of {totalCount} {label}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D0D5DD] disabled:cursor-not-allowed disabled:opacity-40"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition ${
                currentPage === page
                  ? 'border-primary bg-primary text-white'
                  : 'border-[#D0D5DD] bg-white text-[#344054] hover:border-primary hover:text-primary'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D0D5DD] disabled:cursor-not-allowed disabled:opacity-40"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
