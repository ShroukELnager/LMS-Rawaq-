import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentRequest } from "../Types";
import { RequestToCreateComment } from "../lib/Services/student/createComment.service";

export default function useCreateComments() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateCommentRequest) =>
      RequestToCreateComment(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },

    onError: () => {
      toast.error("Failed to create comment");
    },
  });

  return {
    posts: mutation.mutate, 
    postsAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}