import { useQuery } from "@tanstack/react-query";
import { JoinedGroupsService } from "../lib/Services/student/joinedGroups.service";

export default function useJoinGroups() {
  const query = useQuery({
    queryKey: ["joinGroupss"],
    queryFn: JoinedGroupsService,
  });

  return {
    groups: query.data,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}