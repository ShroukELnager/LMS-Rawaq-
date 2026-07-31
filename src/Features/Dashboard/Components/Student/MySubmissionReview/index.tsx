import useAssignmentReviewDetails from '@/Features/Dashboard/Hooks/useAssignmentReviewDetails';
import AssignmentHeader from './AssignmentHeader';
import QuestionCard from './QuestionCard';
import AssignmentPerformanceCard from './AssignmentPerformanceCard';

export default function MySubmissionReview({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const reviewQuery = useAssignmentReviewDetails(assignmentId);

  const assignmentDetails = reviewQuery.data;

  if (reviewQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (reviewQuery.isError || !assignmentDetails) {
    return <div>Something went wrong. Please try again.</div>;
  }

  return (
    <div className="space-y-6">
      <AssignmentHeader
        title={assignmentDetails.assignment.title}
        teacher={assignmentDetails.teacher}
      />
      <AssignmentPerformanceCard data={reviewQuery} />
      <h1 className="font-inter text-[24px] font-semibold leading-8 tracking-normal text-[#111C2C]">
        Submission Review
      </h1>
      <div className="space-y-6">
        {assignmentDetails.questions.length > 0 ? (
          assignmentDetails.questions.map((_, index) => (
            <QuestionCard key={index} data={reviewQuery} index={index} />
          ))
        ) : (
          <p className="font-inter text-base text-[#3E494A]">
            No questions found.
          </p>
        )}
      </div>
    </div>
  );
}
