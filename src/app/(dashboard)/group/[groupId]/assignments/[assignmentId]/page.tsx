'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CalendarDays, CircleAlert, FileText, Star } from 'lucide-react';
import Send from '@assets/icons/send.svg';

import useGetAssignmentDetails from '@/Features/Dashboard/Hooks/useGetAssignmentDetails.service';
import StatCard from '@/Features/Dashboard/Components/Student/StatAssignmentCart';
import NotSubmittedPage from '@/Features/Dashboard/Components/Student/Assignments/AssignmentsPage/NotSubmittedPage';
import LateSubmissionPage from '@/Features/Dashboard/Components/Student/Assignments/AssignmentsPage/LateSubmissionPage';
import SubmittedPage from '@/Features/Dashboard/Components/Student/Assignments/AssignmentsPage/SubmittedPage';

export default function Page() {
  const router = useRouter();

  const params = useParams();
  const assignmentId = params?.assignmentId as string;
  const groupId = params?.groupId as string;

  const { assignmentDetails, assignmentDetailsAsync, isPending, error } =
    useGetAssignmentDetails();
   console.log(JSON.stringify(assignmentDetails, null, 2));
  useEffect(() => {
    if (!assignmentId) return;

    assignmentDetailsAsync({
      p_assignment_id: assignmentId,
    });
  }, [assignmentId, assignmentDetailsAsync]);

  if (!assignmentDetails) return null;

  if (isPending) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        <div className="h-72 animate-pulse rounded-3xl bg-gray-100" />

        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <CircleAlert className="size-12 text-red-500" />

        <h2 className="text-xl font-semibold">Failed to load assignment</h2>

        <button
          onClick={() =>
            assignmentDetailsAsync({
              p_assignment_id: assignmentId!,
            })
          }
          className="rounded-lg bg-[#006D77] px-6 py-3 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

const { is_late, submission, can_submit } = assignmentDetails;
console.log('submission', submission);
// return is_late ? (
//   <LateSubmissionPage assignmentDetails={assignmentDetails} />
// ) : submission.status=="submitted" ?(
//     <SubmittedPage assignmentDetails={assignmentDetails} />


// ) : (
//   <NotSubmittedPage
//     assignmentDetails={assignmentDetails}
//     groupId={groupId}
//     assignmentId={assignmentId}
//   />);
// }
return(<NotSubmittedPage
    assignmentDetails={assignmentDetails}
    groupId={groupId}
    assignmentId={assignmentId}
  />)}
