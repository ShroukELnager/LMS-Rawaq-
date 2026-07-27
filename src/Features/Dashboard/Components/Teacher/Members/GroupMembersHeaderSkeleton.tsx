import Download from '@/assets/icons/download.svg';

export default function GroupMembersHeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />

        <div className="mt-3 flex items-center gap-2">
          <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />

          <div className="h-6 w-28 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      <button
        disabled
        className="flex cursor-not-allowed items-center gap-2 rounded-md bg-[#E6E3D0] px-4 py-2 opacity-70"
      >
        <Download className="h-4 w-4 text-[#666556]" />

        <div className="h-4 w-14 animate-pulse rounded bg-[#CFCBB6]" />
      </button>
    </div>
  );
}
