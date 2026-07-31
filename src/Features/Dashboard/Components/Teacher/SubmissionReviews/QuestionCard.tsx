import {
  GradeSubmissionRequest,
  QuestionOption,
} from '@/Features/Dashboard/Types';
import { Check } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import QuestionCardSkeleton from './QuestionCardSkeleton';
import X from '@/assets/icons/wrong.svg';
export type QuestionReviewProps = {
  questionNumber: number;
  title: string;
  type: 'text' | 'multiple_choice' | 'single_choice';
  maxGrade: number;
  studentAnswer: string;
  feedback: string;
  awardedGrade: number | null;
  options: QuestionOption[] | null;
  selectedOptionIds: string[];
  index: number;
  isLoading?: boolean;
};

export default function QuestionCard({
  questionNumber,
  title,
  type,
  maxGrade,
  studentAnswer,
  feedback,
  awardedGrade,
  options,
  selectedOptionIds,
  index,
  isLoading,
}: QuestionReviewProps) {
const { register, setValue, watch } = useFormContext<GradeSubmissionRequest>();

const grade = watch(`p_answers.${index}.grade_awarded`);
  const isText = type === 'text';
  const isSingleChoice = type === 'single_choice';
  const currentGrade = watch(`p_answers.${index}.grade_awarded`);
console.log('currentGrade', currentGrade);
  const isBelowHalf = currentGrade != null && currentGrade < maxGrade / 2;


  if (isLoading) {
    return <QuestionCardSkeleton />;
  }
  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-md border-l-4 ${
        isText
          ? 'border-l-primary'
          : isSingleChoice
            ? 'border-l-[#22C55E]'
            : 'border-l-[#DC2626]'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="border-b border-[#E7EEFF] pb-4">
          <p className="font-inter text-[1rem] font-bold uppercase pb-[4px] leading-5 tracking-[0.14px] text-primary">
            Question #{questionNumber}
          </p>

          <h3 className="font-inter text-[1.2857rem] pt-[4px] font-semibold leading-7 text-[#111C2C]">
            {title}
          </h3>
        </div>

        <div className="flex flex-col items-end">
          <span className="rounded-full bg-light-blue px-3 py-[5.5px] font-inter text-[0.8571rem] font-bold leading-4 text-[#3E494A] whitespace-nowrap">
            {' '}
            {isText
              ? 'Text Answer'
              : isSingleChoice
                ? 'Single Choice'
                : 'Multiple Choice'}
          </span>

          <span className="mt-1 font-inter text-[12px] font-semibold leading-4 text-[#3E494A]">
            Max: {maxGrade} pts
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="mt-6">
        {isText ? (
          <>
            <p className="mb-2 font-inter text-[12px] font-semibold leading-4 text-[#3E494A]">
              Student Answer:
            </p>

            <div className="rounded-lg border border-[#BEC8CA] bg-[#F1F5F9] p-4 font-['Liberation_Mono'] text-[16px] leading-6 text-[#3E494A]">
              {studentAnswer || 'No answer'}
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {options?.map((option) => {
              const selected = selectedOptionIds.includes(option.id);

              const optionClass = option.is_correct
                ? 'border-[#22C55E] bg-[#F0FDF4]'
                : selected
                  ? 'border-[#DC2626] bg-[#FEF2F2]'
                  : 'border-[#D5D7DA] bg-white';

              return (
                <div
                  key={option.id}
                  className={`flex min-h-[56px] items-center justify-between rounded-lg border-2 px-4 py-3 ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    {isSingleChoice ? (
                      <input
                        type="radio"
                        checked={selected}
                        readOnly
                        className="h-5 w-5 accent-primary"
                      />
                    ) : (
                      <div
                        className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[2px] border transition-all duration-200 ${
                          selected
                            ? option.is_correct
                              ? 'border-primary bg-primary'
                              : 'border-[#DC2626] bg-[#DC2626]'
                            : 'border-[#D5D7DA] bg-white'
                        }`}
                      >
                        {selected && (
                          <Check
                            size={12}
                            strokeWidth={3}
                            className="text-white"
                          />
                        )}
                      </div>
                    )}

                    <span className="font-inter text-[15px] font-medium text-[#3E494A]">
                      {option.text}
                    </span>
                  </div>

                  <div className="flex-shrink-0">
                    {option.is_correct ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full">
                        <Check
                          size={18}
                          strokeWidth={2.5}
                          className="text-[#22C55E]"
                        />
                      </div>
                    ) : (
                      selected && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full">
                          <X className="h-[18px] w-[18px]" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_180px]">
        <div>
          <p className="mb-2 font-inter text-[12px] font-semibold leading-4 text-[#3E494A]">
            Feedback to Student
          </p>

          <textarea
            {...register(`p_answers.${index}.teacher_feedback`)}
            defaultValue={feedback ?? ''}
            rows={3}
            className="h-[66px] w-full rounded-[8px] border border-[#BEC8CA] bg-[#F9F9FF] px-3 pt-2 pb-8 outline-none focus:border-primary"
          />
        </div>

        <div className="pt-[18px]">
          <p className="mb-2 font-inter text-[12px] font-semibold leading-4 text-[#3E494A]">
            Awarded Grade
          </p>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={maxGrade}
              value={grade ?? ''}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const input = e.target.value;

                if (input === '') {
                  setValue(`p_answers.${index}.grade_awarded`, null, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                  return;
                }

                let value = Number(input);

                if (value < 0) value = 0;
                if (value > maxGrade) value = maxGrade;

                setValue(`p_answers.${index}.grade_awarded`, value, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
              className={`h-[42px] w-[120px] rounded-[8px] border border-[#BEC8CA] bg-[#F9F9FF] px-3 font-inter text-[14px] font-semibold outline-none focus:border-primary ${
                isBelowHalf ? 'text-red-600' : 'text-[#006D77]'
              }`}
            />

            <span className="font-inter text-[14px] font-medium text-[#3E494A]">
              / {maxGrade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
