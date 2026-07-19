export default function AssignmentCardSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm"
        >
          <div className="animate-pulse">
            {/* Status */}
            <div className="h-6 w-20 rounded-full bg-gray-200" />

            {/* Title */}
            <div className="mt-4 h-6 w-3/4 rounded bg-gray-200" />

            {/* Description */}
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-5/6 rounded bg-gray-200" />
            </div>

            {/* Info */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index}>
                  <div className="mb-2 h-3 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-300" />
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="mb-2 flex justify-between">
                <div className="h-3 w-28 rounded bg-gray-200" />
                <div className="h-3 w-12 rounded bg-gray-200" />
              </div>

              <div className="h-2 w-full rounded-full bg-gray-200" />
            </div>

            {/* Buttons */}
            <div className="mt-5 space-y-3">
              <div className="h-11 w-full rounded-lg bg-gray-200" />
              <div className="h-11 w-full rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
