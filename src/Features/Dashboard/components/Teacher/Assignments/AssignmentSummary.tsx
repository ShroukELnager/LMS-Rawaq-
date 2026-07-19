import { ChevronUp, Eye, FileText } from 'lucide-react';
import Send from '@assets/icons/send.svg';
import NewTap from '@assets/icons/NewTap.svg';
import { useFormContext } from 'react-hook-form';
import { AssignmentQuestion } from '@/Features/Dashboard/Types';
import { useEffect } from 'react';

interface Props {
  isPending: boolean;
}

export default function AssignmentSummary({ isPending }: Props) {
  const { watch, setValue } = useFormContext();

  const questions: AssignmentQuestion[] = watch('p_questions') || [];
  const deadline = watch('p_deadline');

  const deadlineDate =
    deadline instanceof Date ? deadline : deadline ? new Date(deadline) : null;

  const questionMap = questions.map((_, index) => index + 1);

  const totalGrade = questions.reduce(
    (sum, question) => sum + Number(question.grade || 0),
    0
  );

  useEffect(() => {
    setValue('p_total_grade', totalGrade);
  }, [totalGrade, setValue]);

  return (
    <>
      {/* ================= Desktop ================= */}
      <aside className="hidden space-y-4 lg:block">
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
                {questions.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Total Grade</span>

              <span className="font-semibold">• {totalGrade} Points</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Deadline</span>

              <span className="font-semibold text-right">
                {deadlineDate
                  ? deadlineDate.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                  : '--'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            form="create-assignment-form"
            className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#005F63] font-medium text-white transition hover:bg-[#00494C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={18} className="text-white" />
            <span>{isPending ? 'Publishing...' : 'Publish Assignment'}</span>
          </button>
        </div>

        <div className="flex h-[90px] w-full items-center rounded-xl border border-slate-200 bg-[#EEF4FF] px-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DCE9F7]">
            <Eye size={22} className="text-[#005F63]" />
          </div>

          <div className="ml-4 flex flex-1 items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">
                Live Preview
              </h4>

              <p className="mt-1 max-w-[180px] text-xs leading-5 text-slate-600">
                See how students will view this assignment.
              </p>
            </div>

            <NewTap size={16} />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-[#EEF4FF] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Question Map
          </p>

          <div className="flex flex-wrap gap-2">
            {questionMap.map((number) => (
              <button
                key={number}
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#005F63] text-sm font-semibold text-white"
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              form="create-assignment-form"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-400"
            >
              +
            </button>
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
              {questions.length}
            </h2>
          </div>

          <div className="col-span-2 rounded-xl bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Deadline
            </p>

            <p className="mt-1 text-sm font-semibold text-[#005F63]">
              {deadlineDate
                ? deadlineDate.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                : '--'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
