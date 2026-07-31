import useGetStudentSubmissionDetails from '@/Features/Dashboard/Hooks/useGetStudentAssignmentSubmissionDetails';
import StudentProfileCard from './StudentProfileCard';
import AssignmentDetailsCard from './AssignmentDetails';
import QuestionCard from './QuestionCard';
import { useFormContext } from 'react-hook-form';
import { GradeSubmissionRequest } from '@/Features/Dashboard/Types';
import { useEffect } from 'react';
import useGradeAssignment from '@/Features/Dashboard/Hooks/useGradeAssignment';

type Props = {
  assignmentId: string;
  studentId: string;
};

export default function StudentSubmissionDetails({
  assignmentId,
  studentId,
}: Props) {
  const submissionDetails = useGetStudentSubmissionDetails({
    assignmentId,
    studentId,
  });

const { reset, getValues } = useFormContext<GradeSubmissionRequest>();
  useEffect(() => {
    if (!submissionDetails.data) return;

    reset({
      p_submission_id: submissionDetails.data.submission_id,
      p_answers: submissionDetails.data.questions.map((q) => ({
        answer_id: q.answer_id,
        grade_awarded: q.grade_awarded,
        teacher_feedback: q.teacher_feedback ?? '',
      })),
    });
  }, [submissionDetails.data, reset]);
console.log('API', submissionDetails?.data?.questions);
console.log('Form', getValues().p_answers);
  const questions = submissionDetails.data?.questions;
  return (
    <div className="space-y-6">
      <StudentProfileCard submissionDetails={submissionDetails} />

      <AssignmentDetailsCard submissionDetails={submissionDetails} />

      <div className="space-y-6">
        {questions?.map((question, index) => (
          <div key={question.id} id={`question-${index}`}>
            <QuestionCard
              key={question.id}
              index={index}
              questionNumber={index + 1}
              title={question.question}
              type={question.question_type}
              maxGrade={question.grade}
              studentAnswer={question.student_answer ?? ''}
              feedback={question.teacher_feedback ?? ''}
              awardedGrade={question.grade_awarded }
              options={question.options}
              selectedOptionIds={question.selected_option_ids}
              isLoading={submissionDetails.isLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
