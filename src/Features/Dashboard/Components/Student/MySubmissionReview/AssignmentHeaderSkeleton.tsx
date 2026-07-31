export default function AssignmentHeaderSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      {/* Title */}
      <div className="h-[60px] w-2/3 rounded-lg bg-gray-200" />

      {/* Teacher */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-7 w-7 rounded-full bg-gray-200" />

        <div className="h-5 w-40 rounded bg-gray-200" />
      </div>
    </div>
  );
}
