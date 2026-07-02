import { AssignmentQuestion } from '@/Features/Dashboard/MockAssignmentsData';
import { GripVertical, Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import Trash from '@assets/icons/delete.svg';
import Menu from '@assets/icons/menu.svg';
type QuestionItemProps = {
  index: number;
  remove: (index: number) => void;
};

export default function QuestionItem({ index, remove }: QuestionItemProps) {
  const { register } = useFormContext();
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
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
            {index + 1}
          </div>

          <div className="flex flex-1 items-center gap-6">
            <textarea
              rows={2}
              {...register(`p_questions.${index}.question`, {
                required: 'Question is required',
              })}
              placeholder="Enter question..."
              className="
          h-12
          flex-1
          resize-none
          rounded-lg
          border
          border-[#D9E2F2]
          bg-white
          px-4
          py-3
          text-sm
          text-slate-700
          placeholder:text-slate-400
        "
            />

            <div className="mt-5 w-[130px]">
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Grade/Points
              </label>

              <input
                {...register(`p_questions.${index}.points`, {
                  valueAsNumber: true,
                  required: 'Grade is required',
                  min: {
                    value: 1,
                    message: 'Points must be greater than zero.',
                  },
                })}
                type="number"
                min={1}
                className="
            h-10
            w-full
            rounded-lg
            border
            border-[#D9E2F2]
            bg-white
            text-center
            font-semibold

            text-slate-800
          "
              />
            </div>
          </div>

          <div className="flex flex-col items-center  gap-4">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => remove(index)}
            >
              <Trash size={18} className="text-red-500" />
            </button>

            <button type="button" className="cursor-pointer">
              <Menu size={20} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
