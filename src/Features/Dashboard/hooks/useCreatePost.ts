import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestToJoinGroup } from "../lib/Services/student/requesToJoin.service";
import { JoinGroupRequest } from "../Types";

export default function useCreatePosts() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: JoinGroupRequest) =>
      RequestToJoinGroup(data),

    onSuccess: () => {
      toast.success("Your post has been created successfully");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

     
    },

    onError: () => {
      toast.error("Failed to create post");
    },
  });

  return {
    posts: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}