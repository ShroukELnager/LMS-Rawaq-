'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import SummaryReview from '@/Features/Dashboard/Components/Teacher/SubmissionReviews/ReviewSummary';
import StudentSubmissionDetails from '@/Features/Dashboard/Components/Teacher/SubmissionReviews/StudentSubmissionDetailsPageComponent';

import useGetStudentSubmissionDetails from '@/Features/Dashboard/Hooks/useGetStudentAssignmentSubmissionDetails';
import useGradeAssignment from '@/Features/Dashboard/Hooks/useGradeAssignment';

import { GradeSubmissionRequest } from '@/Features/Dashboard/Types';



export default function Page() {
  const params = useParams();

  const assignmentId = params?.assignmentId as string;
  const studentId = params?.studentId as string;
  const groupId = params?.groupId as string;

  const { data, isLoading } = useGetStudentSubmissionDetails({
    assignmentId,
    studentId,
  });

  const review = useForm<GradeSubmissionRequest>({
    defaultValues: {
      p_submission_id: '',
      p_answers: [],
    },
  });

const router = useRouter();

const { mutate, isPending } = useGradeAssignment({
  onSuccess: () => {
        console.log('success callback fired');

    router.push(
      `/group/${groupId}/assignments`
    );
  },
});
  const [openWarningDialog, setOpenWarningDialog] = useState(false);

  const [pendingFormData, setPendingFormData] =
    useState<GradeSubmissionRequest | null>(null);

  const questionCount = data?.questions.length ?? 0;
  const totalGrade = data?.total_grade ?? 0;

const onSubmit = (formData: GradeSubmissionRequest) => {
  const hasUngradedQuestions =
    data?.questions.some((question, index) => {
      const grade = formData.p_answers[index]?.grade_awarded;

      return (
        (question.question_type === 'single_choice' ||
          question.question_type === 'multiple_choice') &&
        (grade == null || grade === 0)
      );
    }) ?? false;

  if (hasUngradedQuestions) {
    setPendingFormData(formData);
    setOpenWarningDialog(true);
    return;
  }

  mutate(formData);
};

  const handlePublishAnyway = () => {
    if (!pendingFormData) return;

    mutate(pendingFormData);

    setOpenWarningDialog(false);
    setPendingFormData(null);
  };

  return (
    <FormProvider {...review}>
      <main className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[810px_390px]">
          <div className="min-w-0">
            <StudentSubmissionDetails
              assignmentId={assignmentId}
              studentId={studentId}
            />
          </div>

          <aside className="h-fit">
            <SummaryReview
              totalQuestions={questionCount}
              totalGrade={totalGrade}
              onPublish={review.handleSubmit(onSubmit)}
              isPending={isPending}
              isLoading={isLoading}
            />
          </aside>
        </div>
      </main>
      {openWarningDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-14 items-center justify-center rounded-full ">
                <svg
                  className="h-7 w-7 text-[#DC2626]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.29 3.86 1.82 18A2 2 0 0 0 3.55 21h16.9a2 2 0 0 0 1.73-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-bold text-primary">
                  Ungraded Questions
                </h2>

                <p className="mt-1 text-sm text-[#667085]">
                  Some single-choice or multiple-choice questions haven't been
                  graded yet.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="mt-6 rounded-xl border border-[#FFE7BA] bg-[#FFF9EB] p-4 text-[15px] leading-6 text-[#5F5F5F]">
              Are you sure you want to publish this review?
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpenWarningDialog(false);

                  const firstUngradedIndex =
                    data?.questions.findIndex((question, index) => {
                      const grade = review.getValues(
                        `p_answers.${index}.grade_awarded`
                      );

                      return (
                        (question.question_type === 'single_choice' ||
                          question.question_type === 'multiple_choice') &&
                        (grade == null || grade === 0)
                      );
                    }) ?? -1;

                  setOpenWarningDialog(false);

                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      document
                        .getElementById(`question-${firstUngradedIndex}`)
                        ?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                    });
                  });

                  if (firstUngradedIndex !== -1) {
                    setTimeout(() => {
                      document
                        .getElementById(`question-${firstUngradedIndex}`)
                        ?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                    }, 150);
                  }
                }}
                className="rounded-xl border border-[#D0D5DD] px-5 py-2.5 font-semibold text-[#344054] transition hover:bg-gray-100"
              >
                Continue Reviewing
              </button>

              <button
                type="button"
                onClick={handlePublishAnyway}
                className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
              >
                Publish Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </FormProvider>
  );
}
