
export default function GroupSkeleton() {
  return (
<div className="p-4 lg:p-6">
      <div>
        <div className="h-8 w-72 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-4 w-56 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-gray-200" />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="h-7 w-20 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Title */}
            <div className="mt-4">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-6 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Teacher */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />

              <div className="flex-1">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-3 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="mb-2 flex justify-between">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-2 w-full animate-pulse rounded-full bg-gray-200" />
            </div>

            {/* Start Date */}
            <div className="mt-4 flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Status */}
            <div className="mt-3 flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Button */}
            <div className="mt-5 h-11 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
    )
}
