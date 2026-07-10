import { Assignment } from '@/Features/Dashboard/Types';
import { CalendarDays } from 'lucide-react';

export default function AssignmentCard(assignment: Assignment) {
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
      className={`
        rounded-xl
        border-l-4
        ${currentStyle.border}
        bg-white
        p-4
        shadow-sm
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-[#101828]">{assignment.title}</h3>

        <span
          className={`
                        rounded px-2 py-1 text-[10px] font-bold uppercase
                        ${currentStyle.badge}
                      `}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
