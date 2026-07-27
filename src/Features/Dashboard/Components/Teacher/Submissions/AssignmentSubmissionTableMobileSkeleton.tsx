export default function AssignmentSubmissionTableMobileSkeleton() {
  return (
    <div className="space-y-4 lg:hidden">
      {/* Search */}
      <div className="h-11 w-full animate-pulse rounded-lg bg-gray-200" />

      {/* Tabs */}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-9 w-24 animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-[#EAECF0] bg-white p-4 shadow-sm"
          >
            {/* Student */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />

              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

                <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            {/* Grade + Button */}
            <div className="mt-5 flex items-end justify-between">
              <div className="space-y-2">
                <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />

                <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
