
import { useFormContext } from 'react-hook-form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Menu from '@assets/icons/menu.svg';
import QuestionTypeSelector from './QuestionTypeSelector';
import QuestionFooter from './QuestionFooter';
import SingleChoice from './SingleChoice';
import { useState } from 'react';
type QuestionItemProps = {
  id: string;
  index: number;
  remove: (index: number) => void;
};

export default function QuestionItem({ id, index, remove }: QuestionItemProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { register, watch } = useFormContext();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const questionType = watch(`p_questions.${index}.question_type`);
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="
      rounded-xl
      bg-white
      border
      border-[#D9E2F2]
      shadow-sm
    "
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-1 pt-2">
            <button
              type="button"
              className="cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <Menu
                size={12}
                className="text-slate-300 hover:text-slate-500 transition "
              />
            </button>

            <div className="flex h-8 w-8 shrink-0 mt-2 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
              {index + 1}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <textarea
              rows={2}
              {...register(`p_questions.${index}.question`, {
                required: 'Question is required',
              })}
              placeholder="Enter question..."
              className="
              min-h-[90px]
              w-full
              resize-none
              rounded-xl
              border
              border-[#D9E2F2]
              bg-white
              px-4
              py-3
              text-sm
              text-slate-700
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-teal-600/20
            "
            />
  {!collapsed && (
            <div className="flex items-center gap-4">
              <div className="w-[260px]">
                <QuestionTypeSelector index={index} />
              </div>

              <div className="w-[150px]">
                <div className="flex h-[46px] items-center rounded-xl border border-[#D9E2F2] bg-white px-4">
                  <span className="mr-2 text-sm font-medium text-slate-500">
                    Grade:
                  </span>

                  <input
                    {...register(`p_questions.${index}.grade`, {
                      valueAsNumber: true,
                      required: 'Grade is required',
                      min: {
                        value: 1,
                        message: 'Grade must be greater than zero',
                      },
                    })}
                    type="number"
                    min={1}
                    className="
                    w-full
                    border-none
                    bg-transparent
                    text-center
                    font-semibold
                    outline-none
                  "
                  />
                </div>
              </div>
            </div>)}
            {questionType === 'single_choice' && (
              <SingleChoice index={index} type="radio" />
            )}

            {questionType === 'multiple_choice' && (
              <SingleChoice index={index} type="checkbox" />
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5EAF3] bg-[#F0F3FF] px-4 py-3">
        <QuestionFooter
          remove={() => remove(index)}
          setCollapsed={() => setCollapsed((p) => !p)}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}
