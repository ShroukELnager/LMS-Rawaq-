export default function AssignmentPerformanceCardSkeleton() {
  return (
    <div className="flex w-full gap-6 animate-pulse ">
      {/* Performance Card */}
      <div className="w-[31.64%] rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="mx-auto h-3 w-32 rounded bg-gray-200" />

        <div className="mt-8 flex items-end justify-center gap-2">
          <div className="h-14 w-20 rounded bg-gray-200" />
          <div className="mb-2 h-6 w-14 rounded bg-gray-200" />
        </div>

        <div className="mt-8">
          <div className="h-2 w-full rounded-full bg-gray-200" />
          <div className="mx-auto mt-4 h-6 w-12 rounded bg-gray-200" />
        </div>
      </div>

      {/* Details Card */}
      <div className="w-[65.81%] rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-x-8 gap-y-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="mt-2 h-5 w-28 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-[#E5E7EB] pt-4">
          <div className="h-3 w-36 rounded bg-gray-200" />

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
