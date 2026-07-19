'use client';

import { useState } from 'react';
import { AssignmentSubmissionRequestBody } from '@/Features/Dashboard/Types';
import { useFormContext } from 'react-hook-form';
import { SendHorizonal } from 'lucide-react';
import AssignmentSubmitModal from './AssignmentSubmitModal';

type Question = {
  id: string;
};

type QuestionTrackerProps = {
  questions: Question[];
  currentQuestion: number;
  onSelectQuestion: (index: number) => void;
  onSubmit: (data: AssignmentSubmissionRequestBody) => void;
};

export default function QuestionTracker({
  questions,
  currentQuestion,
  onSelectQuestion,
  onSubmit,
}: QuestionTrackerProps) {
  const { watch } = useFormContext<AssignmentSubmissionRequestBody>();

  const [openModal, setOpenModal] = useState(false);

  const answers = watch('p_answers');

  const getQuestionStyle = (index: number) => {
    const isCurrent = index === currentQuestion;

    const answer = answers?.[index];

    const isAnswered = Boolean(
      answer &&
      ((answer.selected_option_ids && answer.selected_option_ids.length > 0) ||
        (answer.text_answer && answer.text_answer.trim().length > 0))
    );

    if (isCurrent) {
      return `
        bg-[#006D77]
        text-white
        border-white
        ring-2
        ring-[#006D77]
      `;
    }

    
    if (isAnswered) {
      return `
        bg-[#D8E3FA]
        text-[#344054]
        border-[#D8E3FA]
      `;
    }

    return `
      bg-white
      text-[#006D77]
      border-[#006D77]
    `;
  };

  return (
    <>
      <aside
        className="
          w-full
          rounded-[28px]
          border
          border-[#E4DECC]
          bg-[#E8E3D0]
          p-6
          lg:w-[288px]
          lg:sticky
          lg:top-6
          h-fit
        "
      >
        <h3 className="mb-6 text-base font-bold text-[#045D6C]">
          Question Overview
        </h3>

        {/* Questions Grid */}
        <div
          className="
            grid
            grid-cols-4
            justify-items-center
            gap-x-3
            gap-y-3
          "
        >
          {questions.map((question, index) => (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelectQuestion(index)}
              className={`
                flex
                h-[50.5px]
                w-[50.5px]
                cursor-pointer
                items-center
                justify-center
                rounded-[8px]
                border-2
                text-base
                font-semibold
                transition-all
                duration-200
                hover:scale-105
                ${getQuestionStyle(index)}
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-[#D8D2C2]" />

        {/* Legend */}
        <div className="space-y-4">
          <LegendItem
            color="
              bg-[#006D77]
              border-2
              border-white
              ring-1
              ring-[#006D77]
            "
            label="Current"
          />

          <LegendItem
            color="
              bg-white
              border-2
              border-[#006D77]
            "
            label="Unanswered"
          />

          <LegendItem
            color="
              bg-[#D8E3FA]
            "
            label="Answered"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="
            mt-8
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-[#7A5E0A]
            px-5
            py-4
            text-base
            font-semibold
            text-[#F8E6A3]
            transition
            hover:bg-[#684F08]
          "
        >
          <SendHorizonal size={20} />

          <span>Submit Assignment</span>
        </button>
      </aside>

      <AssignmentSubmitModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        totalQuestions={questions.length}
        onSubmit={onSubmit}
      />
    </>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`
          h-4
          w-4
          rounded-full
          ${color}
        `}
      />

      <span className="text-sm font-medium text-[#475467]">{label}</span>
    </div>
  );
}
