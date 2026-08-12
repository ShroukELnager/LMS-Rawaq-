'use client';

import { useState } from 'react';
import { AssignmentSubmissionRequestBody } from '@/Features/Dashboard/Types';
import { useFormContext } from 'react-hook-form';
import { SendHorizonal } from 'lucide-react';
import AssignmentSubmitModal from './AssignmentSubmitModal';
import { useAppSelector } from '@/redux/hooks';

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

    const user = useAppSelector((state) => state.user.user);
  
    const role = user?.user_metadata?.account_type;
  const { watch } = useFormContext();

  const [openModal, setOpenModal] = useState(false);

  const answers = watch('p_answers');

  const getQuestionStyle = (index: number) => {
    const isCurrent = index === currentQuestion;

    const answer = answers?.[index];

    const isAnswered = Boolean(
      answer &&
        ((answer.selected_option_ids &&
          answer.selected_option_ids.length > 0) ||
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
      <div className="w-full">
        {/* Question Overview Card */}
        <aside className="w-full rounded-[12px] bg-[#E6E3D0] p-[24px]">
          <h2 className="font-inter text-[14px] font-semibold leading-5 text-[#00535B]">
            Question Overview
          </h2>

          {/* Questions Grid */}
          <div className="mt-[16px] grid grid-cols-4 gap-x-[12px] gap-y-[12px]">
            {questions.map((question, index) => (
              <button
                key={question.id}
                type="button"
                onClick={() => onSelectQuestion(index)}
                className={`
                  flex
                  h-[44px]
                  w-full
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-[8px]
                  border-2
                  text-[14px]
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
          <div className="my-[20px] border-t border-[#D8D2C2]" />

          {/* Legend */}
          <div className="space-y-[12px]">
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
              label="Answered"
            />

            <LegendItem color="bg-[#D8E3FA]" label="Unanswered" />
          </div>
        </aside>
        {role === 'student' && (
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="
      mt-[20px]
      flex
      h-[50px]
      w-full
      cursor-pointer
      items-center
      justify-center
      gap-[8px]
      rounded-[8px]
      bg-[#7A5E0A]
      px-[16px]
      text-[14px]
      font-semibold
      text-[#FFDA83]
      transition
      hover:bg-[#705400]
    "
          >
            <SendHorizonal size={18} />
            <span>Submit Assignment</span>
          </button>
        )}
      </div>

      <AssignmentSubmitModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        totalQuestions={questions.length}
        onSubmit={onSubmit}
      />
    </>
  );
}

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-[8px]">
      <span
        className={`
          h-[12px]
          w-[12px]
          shrink-0
          rounded-full
          ${color}
        `}
      />

      <span className="font-inter text-[12px] font-medium leading-4 text-[#475467]">
        {label}
      </span>
    </div>
  );
}