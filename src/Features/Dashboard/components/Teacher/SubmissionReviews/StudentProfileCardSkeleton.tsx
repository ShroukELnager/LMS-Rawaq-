export default function StudentProfileCardSkeleton() {
  return (
    <div className="flex items-center justify-start gap-4 rounded-3xl bg-white px-6 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      {/* Avatar */}
      <div className="h-[78px] w-[78px] animate-pulse rounded-full bg-gray-200" />

      <div className="flex flex-col gap-3">
        {/* Name */}
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

        {/* Submitted badge */}
        <div className="h-5 w-56 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
