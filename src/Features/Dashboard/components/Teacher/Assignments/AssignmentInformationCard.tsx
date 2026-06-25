'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Info } from 'lucide-react';

import { Assignment } from '@/Features/Dashboard/MockAssignmentsData';

interface Props {
  assignment: Assignment;
}

export default function AssignmentInformationCard({ assignment }: Props) {
  const [deadline, setDeadline] = useState<Date | null>(assignment.deadline);

  return (
    <div className="rounded-2xl border border-[#D9E2F2] bg-[#EEF4FF] p-5 lg:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Info size={18} className="text-slate-700" />
        <h2 className="font-semibold text-slate-900">Assignment Information</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium">
            Assignment Title
          </label>

          <input
            defaultValue={assignment.title}
            className="h-11 w-full rounded-lg border border-[#D9E2F2] bg-white px-4"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium">Description</label>

          <textarea
            rows={4}
            defaultValue={assignment.description}
            className="w-full rounded-lg border border-[#D9E2F2] bg-white p-4"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium">Deadline</label>

          <DatePicker
            selected={deadline}
            onChange={(date:any) => setDeadline(date)}
            dateFormat="MMM dd, yyyy"
            className="h-11 w-full rounded-lg border border-[#D9E2F2] bg-white px-4"
          />
        </div>
      </div>
    </div>
  );
}
