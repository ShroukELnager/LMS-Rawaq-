export function AssignmentsSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex h-[360px] flex-col rounded-xl border border-slate-200 border-t-[7px] border-t-slate-200 bg-white p-5 shadow-sm animate-pulse"
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="h-6 w-24 rounded-full bg-slate-200" />
            <div className="h-5 w-20 rounded bg-slate-200" />
          </div>

          {/* Title */}
          <div className="mb-3 space-y-2">
            <div className="h-6 w-full rounded bg-slate-200" />
            <div className="h-6 w-2/3 rounded bg-slate-200" />
          </div>

          {/* Description */}
          <div className="mb-4 h-[76px] space-y-2">
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-200" />
            <div className="h-4 w-3/4 rounded bg-slate-200" />
          </div>

          {/* Date */}
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-slate-100 p-3">
            <div className="h-[18px] w-[18px] rounded bg-slate-200" />

            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-4 w-28 rounded bg-slate-200" />
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto h-10 w-full rounded-lg bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
