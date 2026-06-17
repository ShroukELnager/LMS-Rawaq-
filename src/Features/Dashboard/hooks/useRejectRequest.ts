import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  JoinGroupResponse, RejectRequest} from "../Types";
import { RejectRequestService } from "../lib/Services/teacher/rejectRequests.service";



export default function useRejectRequest() {
  const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: (data: RejectRequest) =>
      RejectRequestService(data),

onMutate: async (newRequest) => {
  await queryClient.cancelQueries({
    queryKey: ["joinRequests"],
  });

  const previousRequests =
    queryClient.getQueryData<JoinGroupResponse[]>([
      "joinRequests",
    ]);

  queryClient.setQueryData<JoinGroupResponse[]>(
    ["joinRequests"],
    (old = []) =>
      old.filter(
        (request) =>
          request.id !== newRequest.p_request_id
      )
  );

  return { previousRequests };
},

    onError: (err, _newRequest, context) => {
      if (context?.previousRequests) {
        queryClient.setQueryData(
          ["joinRequests"],
          context.previousRequests
        );
      }

      toast.error("Failed to reject request");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["joinRequests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["joinRequests"],
      });
    },

    
    onSuccess: () => {
      toast.success("This request has been Rejected successfully");
    },
  });
  

  return {
    rejectRequest: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}