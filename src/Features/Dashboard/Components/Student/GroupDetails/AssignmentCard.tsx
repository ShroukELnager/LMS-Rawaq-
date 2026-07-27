'use client';

import { useRouter } from 'next/navigation';
import { CalendarDays } from 'lucide-react';
import { Assignment } from '@/Features/Dashboard/Types';

type AssignmentCardProps = Assignment & {
  groupId: string;
};

export default function AssignmentCard({
  groupId,
  ...assignment
}: AssignmentCardProps) {
  const router = useRouter();

  type AssignmentStatus = 'Submitted' | 'Reviewed' | 'Not Submitted';

  const status: AssignmentStatus = assignment.reviewed
    ? 'Reviewed'
    : assignment.submitted
      ? 'Submitted'
      : 'Not Submitted';

  const statusStyles: Record<
    AssignmentStatus,
    {
      badge: string;
      border: string;
    }
  > = {
    Submitted: {
      badge: 'bg-[#006D77] text-white',
      border: 'border-l-[#006D77]',
    },
    'Not Submitted': {
      badge: 'bg-red-100 text-red-600',
      border: 'border-l-red-600',
    },
    Reviewed: {
      badge: 'bg-blue-100 text-blue-700',
      border: 'border-l-blue-600',
    },
  };

  const currentStyle = statusStyles[status];

  return (
    <div
      onClick={() =>
        router.push(`/group/${groupId}/assignments/${assignment.id}`)
      }
      className={`
        cursor-pointer
        rounded-xl
        border-l-4
        ${currentStyle.border}
        bg-white
        p-4
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-[#101828]">{assignment.title}</h3>

        <span
          className={`
            rounded
            px-2
            py-1
            text-[10px]
            font-bold
            uppercase
            ${currentStyle.badge}
          `}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-[#667085]">
        <CalendarDays size={16} />
        <span>{new Date(assignment.deadline).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
