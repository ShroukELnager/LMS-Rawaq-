export default function AssignmentCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border-l-4 border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="h-5 w-32 rounded bg-gray-200" />

        <div className="h-5 w-16 rounded bg-gray-200" />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-gray-200" />
        <div className="h-3 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}
