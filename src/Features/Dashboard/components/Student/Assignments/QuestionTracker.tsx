'use client';

type Question = {
  id: string;
};

type QuestionTrackerProps = {
  questions: Question[];
  currentQuestion: number;
  answers: Record<string, string | string[]>;
  onSelectQuestion: (index: number) => void;
  onSubmit: () => void;
};

export default function QuestionTracker({
  questions,
  currentQuestion,
  answers,
  onSelectQuestion,
  onSubmit,
}: QuestionTrackerProps) {
  const getQuestionStyle = (questionId: string, index: number) => {
    const isCurrent = index === currentQuestion;

    const isAnswered = (() => {
      const answer = answers[questionId];

      if (Array.isArray(answer)) {
        return answer.length > 0;
      }

      return Boolean(answer);
    })();

    if (isCurrent) {
      return 'bg-[#006D77] text-white border-[#006D77]';
    }

    if (isAnswered) {
      return 'bg-[#DDF3F5] text-[#006D77] border-[#006D77]';
    }

    return 'bg-[#EEF2F6] text-[#98A2B3] border-[#EEF2F6]';
  };

  return (
    <aside className="rounded-3xl bg-[#F8F6E8] p-5 shadow-sm">
      <h3 className="mb-5 text-sm font-bold text-[#045D6C]">
        Question Overview
      </h3>

      <div className="grid grid-cols-4 gap-3">
        {questions.map((question, index) => (
          <button
            key={question.id}
            type="button"
            onClick={() => onSelectQuestion(index)}
            className={`
              flex
              h-12
              w-12
              cursor-pointer
              items-center
              justify-center
              rounded-xl
              border
              font-semibold
              transition
              hover:scale-105
              ${getQuestionStyle(question.id, index)}
            `}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-3 text-sm">
        <LegendItem color="bg-[#006D77]" label="Current" />

        <LegendItem
          color="bg-[#DDF3F5] border border-[#006D77]"
          label="Answered"
        />

        <LegendItem color="bg-[#EEF2F6]" label="Unanswered" />
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="
          mt-8
          flex
          w-full
          cursor-pointer
          items-center
          justify-center
          rounded-xl
          bg-[#8A6700]
          px-5
          py-3
          font-semibold
          text-white
          transition
          hover:bg-[#745700]
        "
      >
        Submit Assignment
      </button>
    </aside>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`
          h-3
          w-3
          rounded-full
          ${color}
        `}
      />

      <span className="text-[#475467]">{label}</span>
    </div>
  );
}
