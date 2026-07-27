'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CircleAlert } from 'lucide-react';

import AssignmentQuestions from '@/Features/Dashboard/Components/Student/Assignments/AssignmentQuestions';
import useGetAssignmentDetails from '@/Features/Dashboard/Hooks/useGetAssignmentDetails';

export default function AssignmentQuestionsPage() {
  const params = useParams();
  const assignmentId = params?.assignmentId as string;

  const { assignmentDetails, assignmentDetailsAsync, isPending, error } =
    useGetAssignmentDetails();

  useEffect(() => {
    if (!assignmentId) return;

    assignmentDetailsAsync({
      p_assignment_id: assignmentId,
    });
  }, [assignmentId, assignmentDetailsAsync]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Failed to load assignment.
      </div>
    );
  }

  if (!assignmentDetails) return null;

  const questions = [...assignmentDetails.questions].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <AssignmentQuestions
          assignmentId={assignmentId}
          questions={questions}
        />
      </div>

      {/* Mobile & Tablet */}
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-6 lg:hidden">
        <div className="flex max-w-sm flex-col items-center rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <CircleAlert className="size-12 text-red-600" />
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-red-600">
            Open desktop screen to answer the assignment
          </h2>

          <p className="mt-3 text-center text-sm text-gray-500">
            Assignment answering is available only on desktop devices.
          </p>
        </div>
      </div>
    </>
  );
}
