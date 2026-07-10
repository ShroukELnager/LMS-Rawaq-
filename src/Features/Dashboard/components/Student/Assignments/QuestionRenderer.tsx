'use client';

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
  value?: string | string[];
  onChange: (value: string | string[]) => void;
};

export default function QuestionRenderer({
  question,
  value,
  onChange,
}: QuestionRendererProps) {
  if (question.question_type === 'single_choice') {
    return (
      <div className="space-y-4">
        {question.options.map((option) => (
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
                value === option.id
                  ? 'border-[#006D77] bg-[#EEF8FA]'
                  : 'border-gray-200'
              }
            `}
          >
            <input
              type="radio"
              name={question.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="h-5 w-5 accent-[#006D77]"
            />

            <span className="text-base text-[#344054]">
              {option.option_text}
            </span>
          </label>
        ))}
      </div>
    );
  }

  if (question.question_type === 'multiple_choice') {
    const selected = Array.isArray(value) ? value : [];

    const toggleOption = (optionId: string) => {
      if (selected.includes(optionId)) {
        onChange(selected.filter((id) => id !== optionId));
      } else {
        onChange([...selected, optionId]);
      }
    };

    return (
      <div className="space-y-4">
        {question.options.map((option) => {
          const checked = selected.includes(option.id);

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
                ${checked ? 'border-[#006D77] bg-[#EEF8FA]' : 'border-gray-200'}
              `}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleOption(option.id)}
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
  }

  return (
    <textarea
      rows={8}
      value={typeof value === 'string' ? value : ''}
      onChange={(e) => onChange(e.target.value)}
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
  );
}
