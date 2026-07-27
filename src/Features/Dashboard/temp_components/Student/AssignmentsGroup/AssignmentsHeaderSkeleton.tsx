export function AssignmentsHeaderSkeleton() {
  return (
    <div className="mb-8 flex flex-col gap-3 animate-pulse">
      {/* Title */}
      <div className="h-[40px] w-[320px] rounded-lg bg-slate-200" />

      {/* Description */}
      <div className="flex flex-col gap-2">
        <div className="h-6 w-[600px] max-w-full rounded bg-slate-200" />
        <div className="h-6 w-[450px] max-w-full rounded bg-slate-200" />
      </div>
    </div>
  );
}
