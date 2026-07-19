'use client';

import { Controller, useFormContext } from 'react-hook-form';

type Option = {
  id: string;
  option_text: string;
};

type Question = {
  id: string;
  question: string;
  question_type: 'single_choice' | 'multiple_choice' | 'text';
  grade: number;
  sort_order: number;
  options: Option[];
};

type QuestionRendererProps = {
  question: Question;
  questionIndex: number;
};

export default function QuestionRenderer({
  question,
  questionIndex,
}: QuestionRendererProps) {
  const { control } = useFormContext();

  if (question.question_type === 'single_choice') {
    return (
      <Controller
        control={control}
        name={`p_answers.${questionIndex}.selected_option_ids`}
        render={({ field }) => (
          <div className="space-y-4">
            {question.options.map((option) => {
              const checked = field.value?.[0] === option.id;

              return (
                <label
                  key={option.id}
                  className={`
                    flex
                    cursor-pointer
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    p-5
                    transition
                    hover:border-[#006D77]
                    ${
                      checked
                        ? 'border-[#006D77] bg-[#EEF8FA]'
                        : 'border-gray-200'
                    }
                  `}
                >
                  <input
                    type="radio"
                    checked={checked}
                    onChange={() => field.onChange([option.id])}
                    className="h-5 w-5 accent-[#006D77]"
                  />

                  <span className="text-base text-[#344054]">
                    {option.option_text}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      />
    );
  }

  if (question.question_type === 'multiple_choice') {
    return (
      <Controller
        control={control}
        name={`p_answers.${questionIndex}.selected_option_ids`}
        render={({ field }) => {
          const values: string[] = field.value || [];

          return (
            <div className="space-y-4">
              {question.options.map((option) => {
                const checked = values.includes(option.id);

                return (
                  <label
                    key={option.id}
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      p-5
                      transition
                      hover:border-[#006D77]
                      ${
                        checked
                          ? 'border-[#006D77] bg-[#EEF8FA]'
                          : 'border-gray-200'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          field.onChange(
                            values.filter((id) => id !== option.id)
                          );
                        } else {
                          field.onChange([...values, option.id]);
                        }
                      }}
                      className="h-5 w-5 accent-[#006D77]"
                    />

                    <span className="text-base text-[#344054]">
                      {option.option_text}
                    </span>
                  </label>
                );
              })}
            </div>
          );
        }}
      />
    );
  }

  return (
    <Controller
      control={control}
      name={`p_answers.${questionIndex}.text_answer`}
      render={({ field }) => (
        <textarea
          {...field}
          rows={8}
          placeholder="Write your answer here..."
          className="
            w-full
            rounded-2xl
            border
            border-gray-300
            p-5
            outline-none
            transition
            focus:border-[#006D77]
            focus:ring-2
            focus:ring-[#006D77]/20
          "
        />
      )}
    />
  );
}
