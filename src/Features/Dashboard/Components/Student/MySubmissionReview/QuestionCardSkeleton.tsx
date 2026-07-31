export default function QuestionCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="h-7 w-7 rounded-full bg-gray-200" />

          <div className="space-y-2">
            <div className="h-5 w-80 rounded bg-gray-200" />
            <div className="h-5 w-56 rounded bg-gray-200" />
          </div>
        </div>

        <div className="h-5 w-24 rounded bg-gray-200" />
      </div>

      {/* Answer */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex min-h-[52px] items-center justify-between rounded-lg border border-[#E7EEFF] px-5 py-4"
          >
            <div className="h-4 w-52 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Feedback */}
      <div className="mt-5 flex items-start gap-3 rounded-[8px] bg-[#F5F7FF] p-4">
        <div className="h-5 w-5 rounded-full bg-gray-200" />

        <div className="flex-1">
          <div className="h-4 w-40 rounded bg-gray-200" />

          <div className="mt-3 space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-11/12 rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
