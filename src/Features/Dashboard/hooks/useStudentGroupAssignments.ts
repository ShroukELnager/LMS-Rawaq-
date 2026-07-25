import { useQuery } from '@tanstack/react-query';
import { StudentGroupAssignmentsResponse } from '../Types';
import { StudentGroupAssignmentsService } from '../lib/Services/student/StudentGroupAssignments.service';

export default function useStudentGroupAssignments(
  groupId: string
) {
  return useQuery<StudentGroupAssignmentsResponse>({
    queryKey: ['StudentGroupAssignments', groupId],
    queryFn: () =>
      StudentGroupAssignmentsService({
        p_group_id: groupId,
      }),
  });
}
