export default function PostCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-[45px] w-[45px] rounded-full bg-gray-200" />

        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-11/12 rounded bg-gray-200" />
        <div className="h-3 w-4/5 rounded bg-gray-200" />
      </div>

      {/* Footer */}
      <div className="mt-4 flex gap-6">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}
