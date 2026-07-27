'use client';

import { useParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import StudentSubmissionDetails from '@/Features/Dashboard/Components/Teacher/SubmissionReviews/StudentSubmissionDetailsPage';
import SummaryReview from '@/Features/Dashboard/Components/Teacher/SubmissionReviews/ReviewSummary';

import useGetStudentSubmissionDetails from '@/Features/Dashboard/Hooks/useGetStudentAssignmentSubmissionDetails';
import useGradeAssignment from '@/Features/Dashboard/Hooks/useGradeAssignment';

import { GradeSubmissionRequest } from '@/Features/Dashboard/Types';

export default function Page() {
  const params = useParams();

  const assignmentId = params?.assignmentId as string;
  const studentId = params?.studentId as string;

  const { data,isLoading } = useGetStudentSubmissionDetails({
    assignmentId,
    studentId,
  });

  const questionCount = data?.questions.length ?? 0;
 const totalGrade=data?.total_grade
  const review = useForm<GradeSubmissionRequest>({
    defaultValues: {
      p_submission_id: '',
      p_answers: [],
    },
  });

  const { mutate, isPending } = useGradeAssignment();

  const onSubmit = (formData: GradeSubmissionRequest) => {
    console.log('Review Payload:', formData);
    mutate(formData);
  };

  return (
    <FormProvider {...review}>
      <main className="mx-auto max-w-[1280px] px-6 py-8">
        <div
          className="
            grid
            gap-8
            lg:grid-cols-[810px_390px]
          "
        >
          {/* Left */}
          <div className="min-w-0">
            <StudentSubmissionDetails
              assignmentId={assignmentId}
              studentId={studentId}
            />
          </div>

          {/* Right */}
          <aside className="h-fit">
            <SummaryReview
              totalQuestions={questionCount}
              totalGrade={totalGrade ?? 0}
              onPublish={review.handleSubmit(onSubmit)}
              isPending={isPending}
              isLoading={isLoading}
            />
          </aside>
        </div>
      </main>
    </FormProvider>
  );
}
