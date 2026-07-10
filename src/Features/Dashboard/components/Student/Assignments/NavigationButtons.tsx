'use client';

import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

type NavigationButtonsProps = {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export default function NavigationButtons({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
}: NavigationButtonsProps) {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="mt-12 flex items-center justify-between border-t pt-6">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-[#006D77]
          px-6
          py-3
          font-medium
          text-[#006D77]
          transition
          hover:bg-[#006D77]
          hover:text-white
          disabled:cursor-not-allowed
          disabled:border-gray-300
          disabled:text-gray-400
          disabled:hover:bg-transparent
          disabled:hover:text-gray-400
        "
      >
        <ArrowLeft size={18} />
        Previous
      </button>

    

      {isLastQuestion ? (
        <button
          type="button"
          onClick={onSubmit}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#006D77]
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-[#00545c]
          "
        >
          <Send size={18} />
          Submit Assignment
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#006D77]
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-[#00545c]
          "
        >
          Next
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
