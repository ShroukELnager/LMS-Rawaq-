import { SubmissionReviewResponse } from '@/Features/Dashboard/Types';
import StudentAvatar from '@/Shared/Components/StudentAvatar';
import UserAvatar from '@/Shared/Utils/UserAvatar';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

type Props = {
  submissionDetails: UseQueryResult<SubmissionReviewResponse, Error>;
};
export default function AssignmentDetailsCard({ submissionDetails }: Props) {
  const data = submissionDetails.data;

      const details = [
        {
          label: 'DEADLINE',
          value: 'Oct 24, 2023',
        },
        {
          label: 'MAX GRADE',
          value: `${data?.total_grade ?? '--'} pts`,
        },
        {
          label: 'QUESTIONS',
          value: '12 Items',
        },
        {
          label: 'TYPE',
          value: 'Assessment',
        },
      ];

  return (
    <div className="flex  justify-start rounded-3xl gap-4 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-6 py-6  flex-col">
      <div>
        <h1 className="font-sans font-semibold text-2xl leading-8 tracking-normal text-primary">
          React Fundamentals Quiz
        </h1>
        <p className="font-sans font-normal text-base leading-6 tracking-normal text-[#3E494A]">
          Testing core concepts of React hooks, component lifecycles, and state
          management strategies.
        </p>
      </div>

      <div className="flex gap-3">
        {details.map((item) => (
          <div
            key={item.label}
            className="w-[178.66px] h-[66px] rounded-lg border border-[#BEC8CA] p-3 flex flex-col bg-[#F9F9FF] justify-center"
          >
            <span className="font-sans text-xs font-medium leading-4 text-[#3E494A]">
              {item.label}
            </span>

            <span className="font-sans text-sm font-semibold leading-5 text-[#006D77]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
