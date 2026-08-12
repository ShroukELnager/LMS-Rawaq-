'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CircleAlert } from 'lucide-react';
import useGetAssignmentDetails from '@/Features/Dashboard/Hooks/useGetAssignmentDetails';
import AssignmentQuestions from '@/Features/Dashboard/Components/Student/Assignments/AssignmentQuestions';
import { useAppSelector } from '@/redux/hooks';


export default function AssignmentQuestionsPage() {
const router =useRouter()
    const user = useAppSelector((state) => state.user.user);

    const role = user?.user_metadata?.account_type;
  const params = useParams();
  const assignmentId = params?.assignmentId as string;

  const { assignmentDetails, assignmentDetailsAsync, isPending, error } =
    useGetAssignmentDetails();

console.log('assignmentDetails', assignmentDetails);
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

  const questions = assignmentDetails.questions

  return (
    <>
      {/* Desktop */}
      {role == 'teacher' && (
        <header className="w-full bg-[#006D77]">
          <div className="flex py-[29.5px] items-center px-[16px] flex-row gap-[40px]">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-[4px] text-[11px] font-normal text-white hover:opacity-80 py-[12px] px-[24px]"
            >
              <ArrowLeft size={18} />
              <span
                className="
  font-inter
  text-[14px]
  font-bold
  leading-[20px]
  tracking-[0.14px]
  text-center
  align-middle
"
              >
                Back
              </span>
            </button>

            <h1 className="font-inter text-[24px] font-semibold leading-[20px] tracking-[0px] align-middle text-white">
              Assignment Preview
            </h1>
          </div>
        </header>
      )}
      <div className="hidden lg:block">
        <AssignmentQuestions
          submission={assignmentDetails.submission}
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
