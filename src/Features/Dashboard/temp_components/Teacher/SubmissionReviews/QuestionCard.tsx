import { GradeSubmissionRequest, QuestionOption } from '@/Features/Dashboard/Types';
import { Check, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import QuestionCardSkeleton from './QuestionCardSkeleton';

export type QuestionReviewProps = {
  questionNumber: number;
  title: string;
  type: 'text' | 'multiple_choice' | 'single_choice';
  maxGrade: number;
  studentAnswer: string;
  feedback: string;
  awardedGrade: number;
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
  isLoading
}: QuestionReviewProps) {

  const isText = type === 'text';
  const isSingleChoice = type === 'single_choice';


  const { register, control } = useFormContext<GradeSubmissionRequest>();
  const { fields } = useFieldArray({
    control,
    name: 'p_answers',
  });
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
        <div>
          <p className="font-inter text-[14px] font-bold uppercase pb-[4px] leading-5 tracking-[0.14px] text-primary">
            Question #{questionNumber}
          </p>

          <h3 className="font-inter text-[18px] font-semibold leading-7 text-[#111C2C]">
            {title}
          </h3>
        </div>

        <div className="flex flex-col items-end">
          <span className="rounded-full bg-light-blue px-3  font-inter text-[12px] font-bold leading-4 text-[#3E494A]">
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
                  className={`flex min-h-[52px] items-center justify-between rounded-lg border-2 px-4 py-3 ${optionClass}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type={isSingleChoice ? 'radio' : 'checkbox'}
                      checked={selected}
                      readOnly
                      className="h-5 w-5 accent-[#006D77]"
                    />

                    <span className="font-inter text-[15px] font-medium text-[#3E494A]">
                      {option.text}
                    </span>
                  </div>

                  {option.is_correct && (
                    <Check className="h-5 w-5 text-[#22C55E]" />
                  )}

                  {!option.is_correct && selected && (
                    <X className="h-5 w-5 text-[#DC2626]" />
                  )}
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
            placeholder="Great explanation, very concise."
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
              {...register(`p_answers.${index}.grade_awarded`)}
              type="number"
              min={0}
              max={maxGrade}
              required
              defaultValue={awardedGrade ?? ''}
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value > maxGrade) {
                  e.target.value = String(maxGrade);
                }
              }}
              className="h-[42px] w-[120px] rounded-[8px] border border-[#BEC8CA] bg-[#F9F9FF] px-3 font-inter text-[14px] font-semibold text-[#006D77] outline-none focus:border-primary"
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
