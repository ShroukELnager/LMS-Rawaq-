import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestToJoinGroup } from "../lib/Services/student/requesToJoin.service";
import { JoinGroupRequest, ListGroupsResponse } from "../Types";



export default function useRequestToJoin() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: JoinGroupRequest) =>
      RequestToJoinGroup(data),

    onMutate: async (newRequest: JoinGroupRequest) => {
      await queryClient.cancelQueries({ queryKey: ["listGroups"] });

      const previousGroups =
        queryClient.getQueryData<ListGroupsResponse[]>(["listGroups"]);

      queryClient.setQueryData<ListGroupsResponse[]>(
        ["listGroups"],
        (old = []) => {
          return old.map((group) =>
            group.id === newRequest.group_id
              ? {
                  ...group,
                  status: "pending",
                }
              : group
          );
        }
      );

      return { previousGroups };
    },

    onError: (err, _newRequest, context) => {
      if (context?.previousGroups) {
        queryClient.setQueryData(
          ["listGroups"],
          context.previousGroups
        );
      }

      toast.error("Failed to send request");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["listGroups"],
      });

      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },

    // ✅ نجاح
    onSuccess: () => {
      toast.success("Your request has been sent successfully");
    },
  });

  return {
    requestToJoin: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}