export const MembersSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
        >
          <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};