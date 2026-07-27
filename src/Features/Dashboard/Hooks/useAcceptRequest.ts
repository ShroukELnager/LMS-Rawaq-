import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AcceptRequest, JoinGroupResponse} from "../Types";
import { AcceptRequestService } from "../lib/Services/teacher/acceptRequests.service";



export default function useAcceptRequest() {
  const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: (data: AcceptRequest) =>
      AcceptRequestService(data),

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

      toast.error("Failed to send request");
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
      toast.success("This request has been Approved successfully");
    },
  });
  

  return {
    acceptRequest: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}