import { AssignmentSubmissionsResponse } from '@/Features/Dashboard/Types';
import { UseQueryResult } from '@tanstack/react-query';
import { CalendarDays } from 'lucide-react';
import BadgeInfo from '@/assets/icons/totalicon.svg';

type Props = {
  AssignmentSubmissionsData: UseQueryResult<
    AssignmentSubmissionsResponse,
    Error
  >;
};

export default function AssignmentSubmissionHeader({
  AssignmentSubmissionsData,
}: Props) {
  const assignment = AssignmentSubmissionsData.data?.assignment;

  if (!assignment) return null;

  const calculateProgress = (value: number) =>
    assignment.total_students === 0
      ? 0
      : (value / assignment.total_students) * 100;

  const cards = [
    {
      title: 'Total Students',
      value: assignment.total_students,
      color: 'bg-[#0B5D66]',
      text: 'text-[#0B5D66]',
      progress: 100,
    },
    {
      title: 'Submitted',
      value: assignment.submitted,
      color: 'bg-[#0B5D66]',
      text: 'text-[#0B5D66]',
      progress: calculateProgress(assignment.submitted),
    },
    {
      title: 'Reviewed',
      value: assignment.reviewed,
      color: 'bg-[#8B6B18]',
      text: 'text-[#8B6B18]',
      progress: calculateProgress(assignment.reviewed),
    },
    {
      title: 'Not Submitted',
      value: assignment.not_submitted,
      color: 'bg-[#D92D20]',
      text: 'text-[#D92D20]',
      progress: calculateProgress(assignment.not_submitted),
    },
  ];

  return (
    <div className="px-6">
      <h1 className="text-3xl font-bold leading-tight text-[#0B5D66] md:text-[34px]">
        {assignment.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-[#667085]">
        <div className="flex items-center gap-2">
          <CalendarDays size={15} />

          <span>
            {new Date(assignment.deadline).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 font-semibold text-[#0B5D66]">
          <BadgeInfo className="h-4 w-4" />

          <span>{assignment.total_grade} Points Total</span>
        </div>
      </div>

      <div className="mt-8 hidden grid-cols-2 gap-4 lg:grid lg:grid-cols-4">
        
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-[#EAECF0] bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-[#667085]">{card.title}</p>

            <p className={`mt-3 text-2xl font-bold ${card.text}`}>
              {card.value}
            </p>

            <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-[#EAECF0]">
              <div
                className={`${card.color} h-full rounded-full transition-all duration-500`}
                style={{
                  width: `${card.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
