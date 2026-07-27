export default function AssignmentDetailsCardSkeleton() {
  return (
    <div className="flex flex-col justify-start gap-4 rounded-3xl bg-white px-6 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] animate-pulse">
      {/* Title */}
      <div>
        <div className="mb-3 h-8 w-72 rounded bg-gray-200" />

        <div className="mb-2 h-4 w-full rounded bg-gray-200" />

        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>

      {/* Details */}
      <div className="flex gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex h-[66px] w-[178.66px] flex-col justify-center rounded-lg border border-[#BEC8CA] bg-[#F9F9FF] p-3"
          >
            <div className="mb-2 h-3 w-20 rounded bg-gray-200" />

            <div className="h-4 w-16 rounded bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
