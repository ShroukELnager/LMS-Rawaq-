import { SubmissionReviewResponse } from '@/Features/Dashboard/Types';
import { UseQueryResult } from '@tanstack/react-query';
import AssignmentDetailsCardSkeleton from './AssignmentDetailsCardSkeleton';

type Props = {
  submissionDetails: UseQueryResult<SubmissionReviewResponse, Error>;
};

export default function AssignmentDetailsCard({ submissionDetails }: Props) {
  if (submissionDetails.isPending) {
    return <AssignmentDetailsCardSkeleton />;
  }

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
    <div className="flex flex-col justify-start gap-4 rounded-3xl bg-white px-6 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <div>
        <h1 className="font-sans text-2xl font-semibold leading-8 tracking-normal text-primary">
          React Fundamentals Quiz
        </h1>

        <p className="font-sans text-base font-normal leading-6 tracking-normal text-[#3E494A]">
          Testing core concepts of React hooks, component lifecycles, and state
          management strategies.
        </p>
      </div>

      <div className="flex gap-3">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex h-[66px] w-[178.66px] flex-col justify-center rounded-lg border border-[#BEC8CA] bg-[#F9F9FF] p-3"
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
