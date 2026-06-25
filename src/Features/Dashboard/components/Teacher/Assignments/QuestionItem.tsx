import { AssignmentQuestion } from '@/Features/Dashboard/MockAssignmentsData';
import { GripVertical, Trash2 } from 'lucide-react';


interface Props {
  question: AssignmentQuestion;
}

export default function QuestionItem({ question }: Props) {
  return (
    <div
      className="
      rounded-xl
      border
      border-slate-200
      bg-[#EEF4FF]

      border-t-4
      border-t-teal-700

      md:border-t
      md:border-l-4
      md:border-l-teal-700
      "
    >
      <div className="p-4">
        <div className="flex gap-4">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-semibold text-white">
            {question.order}
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-slate-800">
                  {question.title}
                </h3>

                <textarea
                  rows={2}
                  defaultValue={question.instructions}
                  className="mt-3 w-full rounded-lg border border-[#D9E2F2] bg-white p-3 text-sm"
                />
              </div>

              <div className="w-full md:w-[90px]">
                <label className="mb-1 block text-xs text-slate-500">
                  Grade
                </label>

                <input
                  defaultValue={question.grade}
                  className="h-10 w-full rounded-lg border border-[#D9E2F2] bg-white text-center"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button>
                <Trash2 size={16} className="text-red-500" />
              </button>

              <button>
                <GripVertical size={16} className="text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
