import { useQuery } from '@tanstack/react-query';
import { AssignmentSubmissionsResponse } from '../Types';
import { getAssignmentSubmissionsService } from '../lib/Services/teacher/getAssignmentSubmissions.service';

interface Filters {
  assignmentId: string;
  status?: string | null;
  search?: string | null;
}

export default function useGetAssignmentSubmissions({
  assignmentId,
  status = null,
  search = null,
}: Filters) {
  return useQuery<AssignmentSubmissionsResponse>({
    queryKey: ['assignmentsSubmissions', assignmentId, status, search],
    queryFn: () =>
      getAssignmentSubmissionsService({
        p_assignment_id: assignmentId,
        p_status: status,
        p_search: search,
      }),
    placeholderData: (previousData) => previousData,
  });
  
}
