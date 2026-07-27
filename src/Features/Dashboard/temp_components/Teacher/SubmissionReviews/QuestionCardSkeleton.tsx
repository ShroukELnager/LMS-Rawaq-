export default function QuestionCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border-l-4 border-l-primary bg-white p-6 shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-6 w-80 rounded bg-gray-200" />
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="h-6 w-28 rounded-full bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
      </div>

      {/* Question Body */}
      <div className="mt-6">
        <div className="mb-2 h-4 w-28 rounded bg-gray-200" />

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex min-h-[52px] items-center justify-between rounded-lg border border-[#D5D7DA] bg-[#F9F9FF] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-gray-200" />
                <div className="h-4 w-56 rounded bg-gray-200" />
              </div>

              <div className="h-5 w-5 rounded-full bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_180px]">
        <div>
          <div className="mb-2 h-4 w-32 rounded bg-gray-200" />

          <div className="h-[66px] w-full rounded-lg border border-[#BEC8CA] bg-[#F9F9FF]" />
        </div>

        <div className="pt-[18px]">
          <div className="mb-2 h-4 w-24 rounded bg-gray-200" />

          <div className="flex items-center gap-2">
            <div className="h-[42px] w-[120px] rounded-lg border border-[#BEC8CA] bg-[#F9F9FF]" />

            <div className="h-4 w-8 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
