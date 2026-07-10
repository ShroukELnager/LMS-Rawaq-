import { useQuery } from "@tanstack/react-query";

import { Assignment } from "../Types";
import { GetAssignmentsService } from "../lib/Services/student/getAssignments.service";


export default function useGetAssignments(groupId: string) {

  return useQuery<Assignment[]>({
    queryKey: ['assignments', groupId],

    queryFn: () => GetAssignmentsService(groupId),

    enabled: !!groupId,
  });

}