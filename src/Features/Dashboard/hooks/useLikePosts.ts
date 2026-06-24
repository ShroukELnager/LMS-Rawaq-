import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikePostRequest, PostCardProps } from "../Types";
import { LikePostService } from "../lib/Services/student/likepost.service";

export default function useLikePosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LikePostRequest) => LikePostService(data),

    onMutate: async ({ post_id }) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueriesData<
        PostCardProps[]
      >({
        queryKey: ["posts"],
      });

      queryClient.setQueriesData<PostCardProps[]>(
        { queryKey: ["posts"] },
        (old) =>
          old?.map((post) =>
            post.id === post_id
              ? {
                  ...post,
                  is_liked: true,
                  likes_count: post.likes_count + 1,
                }
              : post
          )
      );

      return { previousPosts };
    },

    onError: (_err, _variables, context) => {
      context?.previousPosts?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      toast.error("Failed to like post");
    },

    onSuccess: () => {
      toast.success("Post liked");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}