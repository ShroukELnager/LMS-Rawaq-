import { Assignment } from '@/Features/Dashboard/MockAssignmentsData';
import { ChevronUp, FileText, Eye } from 'lucide-react';

interface Props {
  assignment: Assignment;
}

export default function AssignmentSummary({ assignment }: Props) {
  const totalGrade = assignment.questions.reduce((acc, q) => acc + q.grade, 0);

  return (
    <>
      {/* ================= Desktop ================= */}
      <aside className="hidden lg:block space-y-4">
        <div className="rounded-2xl border border-[#D8E1F1] bg-[#EEF4FF] p-5">
          <div className="mb-6 flex items-center gap-2">
            <FileText size={15} className="text-slate-600" />

            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">
              Assignment Summary
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Questions</span>

              <span className="font-semibold text-teal-700">
                {assignment.questions.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Grade</span>

              <span className="font-semibold">• {totalGrade} Points</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Deadline</span>

              <span className="font-semibold">
                {assignment.deadline.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <button className="mt-8 h-12 w-full rounded-xl bg-[#005F63] font-medium text-white transition hover:bg-[#00494C]">
            Publish Assignment
          </button>

          <button className="mt-3 h-12 w-full rounded-xl border border-slate-300 bg-white font-medium text-[#005F63]">
            Save Draft
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex gap-3">
            <Eye size={18} className="text-slate-500" />

            <div>
              <h4 className="text-sm font-medium">Live Preview</h4>

              <p className="mt-1 text-xs text-slate-500">
                See how students will view this assignment.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= Mobile ================= */}

      <div className="rounded-2xl border border-[#DDD7C0] bg-[#E9E5D2] p-4 lg:hidden">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-[#005F63]" />

            <h3 className="text-sm font-medium text-slate-700">
              Assignment Summary
            </h3>
          </div>

          <ChevronUp size={18} className="text-slate-500" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Total Grade
            </p>

            <h2 className="mt-1 text-3xl font-bold text-[#005F63]">
              {totalGrade}
            </h2>

            <p className="text-xs text-slate-500">pts</p>
          </div>

          <div className="rounded-xl bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Questions
            </p>

            <h2 className="mt-1 text-3xl font-bold text-[#005F63]">
              {assignment.questions.length}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
