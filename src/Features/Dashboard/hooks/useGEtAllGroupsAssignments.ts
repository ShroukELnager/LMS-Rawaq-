import { useQuery } from "@tanstack/react-query";
import { getGroupAssignmentsService } from "../lib/Services/teacher/getGroupAssignments.service";

export default function useGetGroupAssignments(groupId: string) {
  return useQuery({
    queryKey: ['groupAssignments', groupId],
    queryFn: () =>
      getGroupAssignmentsService({
        p_group_id: groupId,
      }),
    enabled: !!groupId,
  });
}
