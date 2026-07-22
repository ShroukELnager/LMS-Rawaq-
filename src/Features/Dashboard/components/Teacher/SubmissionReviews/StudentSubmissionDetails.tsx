import useGetStudentSubmissionDetails from '@/Features/Dashboard/Hooks/useGetStudentAssignmentSubmissionDetails';
 type Props = { assignmentId: string; studentId: string };
export default function StudentSubmissionDetails({assignmentId,studentId}:Props) {
   const{data:submissions,isPending,isError}= useGetStudentSubmissionDetails({
      assignmentId,
      studentId,
    });
console.log('submissions', submissions);
  return (
    <div>StudentSubmissionDetails</div>
  )
}
