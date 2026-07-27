export default function SummaryReviewSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      {/* Assignment Progress */}
      <div className="h-4 w-40 rounded bg-gray-200" />

      <div className="mt-6 flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200" />
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-3 w-full rounded-full bg-gray-200" />

      <div className="mt-3 h-4 w-36 rounded bg-gray-200" />

      <hr className="my-8 border-[#D9D9D9]" />

      {/* Grade */}
      <div className="h-4 w-40 rounded bg-gray-200" />

      <div className="mt-5 flex items-end gap-2">
        <div className="h-10 w-16 rounded bg-gray-200" />
        <div className="h-7 w-12 rounded bg-gray-200" />
      </div>

      {/* Status */}
      <div className="mt-10 flex items-center justify-between">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-5 w-24 rounded-full bg-gray-200" />
      </div>

      <hr className="mt-3 border-[#D9D9D9]" />

      {/* Button */}
      <div className="mt-6 h-12 w-full rounded-xl bg-gray-200" />
    </div>
  );
}
