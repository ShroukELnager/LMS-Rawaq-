export default function AssignmentSubmissionHeaderSkeleton() {
  return (
    <div className="px-6 animate-pulse">
      {/* Title */}
      <div className="h-9 w-80 rounded bg-gray-200" />

      {/* Meta */}
      <div className="mt-4 flex flex-wrap items-center gap-5">
        <div className="h-5 w-36 rounded bg-gray-200" />
        <div className="h-5 w-32 rounded bg-gray-200" />
      </div>

      {/* Stats Cards */}
      <div className="mt-8 hidden grid-cols-2 gap-4 lg:grid lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-24 rounded bg-gray-200" />

            <div className="mt-4 h-8 w-12 rounded bg-gray-200" />

            <div className="mt-5 h-[3px] w-full rounded-full bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
