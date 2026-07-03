import { useFormContext } from 'react-hook-form';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Menu from '@assets/icons/menu.svg';
import { useState } from 'react';

import QuestionTypeSelector from './QuestionTypeSelector';
import QuestionFooter from './QuestionFooter';
import SingleChoice from './SingleChoice';
import MobileQuestionHeader from './MobileQuestionHeader';
import { AssignmentRequestBody } from '@/Features/Dashboard/Types';

type QuestionItemProps = {
  id: string;
  index: number;
  remove: (index: number) => void;
};

export default function QuestionItem({ id, index, remove }: QuestionItemProps) {
  const [collapsed, setCollapsed] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<AssignmentRequestBody>();

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
      className="rounded-xl border border-[#D9E2F2] bg-white shadow-sm"
    >
      <div className="md:hidden">
        <MobileQuestionHeader
          index={index}
          remove={() => remove(index)}
          duplicate={() => {}}
          attributes={attributes}
          listeners={listeners}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="hidden flex-col items-center gap-1 pt-2 md:flex">
            <button
              type="button"
              className="cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <Menu
                size={12}
                className="text-slate-300 transition hover:text-slate-500"
              />
            </button>

            <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
              {index + 1}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div>
              <textarea
                rows={2}
                {...register(`p_questions.${index}.question`, {
                  required: 'Question is required',
                })}
                placeholder="Enter question..."
                className={`
                  min-h-[90px]
                  w-full
                  resize-none
                  rounded-xl
                  border
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  placeholder:text-slate-400
                  outline-none
                  transition
                  ${
                    errors.p_questions?.[index]?.question
                      ? 'border-red-500'
                      : 'border-[#D9E2F2] focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }
                `}
              />

              {errors.p_questions?.[index]?.question && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.p_questions[index]?.question?.message}
                </p>
              )}
            </div>

            {!collapsed && (
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full md:w-[260px]">
                  <QuestionTypeSelector index={index} />
                </div>

                <div className="w-full md:w-[150px]">
                  <div
                    className={`
                      flex
                      h-[46px]
                      items-center
                      rounded-xl
                      border
                      bg-white
                      px-4
                      transition
                      ${
                        errors.p_questions?.[index]?.grade
                          ? 'border-red-500'
                          : 'border-[#D9E2F2] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'
                      }
                    `}
                  >
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
                      className="w-full border-none bg-transparent text-center font-semibold outline-none"
                    />
                  </div>

                  {errors.p_questions?.[index]?.grade && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.p_questions[index]?.grade?.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {questionType === 'single_choice' && (
              <SingleChoice index={index} type="radio" />
            )}

            {questionType === 'multiple_choice' && (
              <SingleChoice index={index} type="checkbox" />
            )}
          </div>
        </div>
      </div>

      <div className="hidden border-t border-[#E5EAF3] bg-[#F0F3FF] px-4 py-3 md:block">
        <QuestionFooter
          remove={() => remove(index)}
          duplicate={() => {}}
          setCollapsed={() => setCollapsed((prev) => !prev)}
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}
