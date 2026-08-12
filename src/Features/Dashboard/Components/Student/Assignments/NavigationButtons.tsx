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
    <div className="mt-12 flex items-center justify-between ">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="flex cursor-pointer items-center gap-2 bg-transparent font-inter text-sm font-bold leading-5 tracking-[0.14px] text-[#00535B] transition disabled:cursor-not-allowed disabled:text-[#98A2B3]"
      >
        <ArrowLeft
          size={21}
          className="text-[#00535B] disabled:text-[#98A2B3]"
        />
        Previous
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={isLastQuestion}
        className="flex  cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#00535B] px-8 py-3 font-inter text-base font-bold leading-6 tracking-normal text-white transition hover:bg-[#00545C] disabled:cursor-not-allowed disabled:bg-[#D0D5DD] disabled:text-[#98A2B3]"
      >
        Next Question
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
