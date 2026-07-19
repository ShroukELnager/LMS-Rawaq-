import { useQuery } from '@tanstack/react-query';
import { getStudentAssignmentSubmissionDetailsService } from '../lib/Services/teacher/getStudentAssignmentSubmissionDetails.service';

export default function useGetAssignmentSubmissions({p_assignment_id,p_student_id}:{p_assignment_id:string,p_student_id:string}) {
  return useQuery({
    queryKey: ['assignmentsStudentSubmissions', p_assignment_id, p_student_id],
    queryFn: () =>
      getStudentAssignmentSubmissionDetailsService({
        p_assignment_id: p_assignment_id,
        p_student_id: p_student_id,
      }),
  });
}
