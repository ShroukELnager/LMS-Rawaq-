import { StatSkeleton } from "./Stat";

export function GroupCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm animate-pulse">
      {/* Title */}
      <div className="h-7 w-3/4 rounded-md bg-gray-200" />

      {/* Description */}
      <div className="mt-3 space-y-2 min-h-[48px]">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6">
        {/* Created date */}
        <div className="h-3 w-32 rounded bg-gray-200" />

        {/* Button */}
        <div className="mt-5 h-11 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}


