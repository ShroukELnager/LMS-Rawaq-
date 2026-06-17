import { useQuery } from "@tanstack/react-query";
import { viewGroupService } from "../lib/Services/teacher/getAllRequests.service";

export default function useJoinRequests() {
  const query = useQuery({
    queryKey: ["joinRequests"],
    queryFn: viewGroupService,
  });

  return {
    requests: query.data,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}