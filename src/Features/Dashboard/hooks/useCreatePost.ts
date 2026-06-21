import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePostRequest } from "../Types";
import { RequestToCreatePost } from "../lib/Services/student/createPost.service";

export default function useCreatePosts() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreatePostRequest) =>
      RequestToCreatePost(data),

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
    posts: mutation.mutate, 
    postsAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}