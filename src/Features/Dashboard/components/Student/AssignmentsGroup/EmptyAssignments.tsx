import { ClipboardList } from 'lucide-react';

export default function EmptyAssignments() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <ClipboardList className="h-8 w-8 text-primary" />
      </div>

      <h3 className="font-inter text-xl font-semibold text-[#111C2C]">
        No assignments available for this group yet.{' '}
      </h3>

      <p className="mt-2 max-w-md font-inter text-base leading-6 text-[#6F797A]">
        There are no assignments available for this group right now. New
        assignments will appear here once they are added.
      </p>
    </div>
  );
}
