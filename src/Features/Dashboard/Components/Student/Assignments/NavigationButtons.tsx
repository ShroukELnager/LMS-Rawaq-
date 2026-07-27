'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

type NavigationButtonsProps = {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function NavigationButtons({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
}: NavigationButtonsProps) {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="mt-12 flex items-center justify-between border-t border-[#EAECF0] pt-6">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="
          flex
          cursor-pointer
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
          disabled:border-[#D0D5DD]
          disabled:text-[#98A2B3]
          disabled:hover:bg-transparent
          disabled:hover:text-[#98A2B3]
        "
      >
        <ArrowLeft size={18} />
        Previous
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={isLastQuestion}
        className="
          flex
          cursor-pointer
          items-center
          gap-2
          rounded-xl
          bg-[#006D77]
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-[#00545C]
          disabled:cursor-not-allowed
          disabled:bg-[#D0D5DD]
          disabled:text-[#98A2B3]
        "
      >
        Next Question
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
