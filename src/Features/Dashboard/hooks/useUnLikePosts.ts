import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostCardProps } from "../Types";
import { UnLikePostService } from "../lib/Services/student/unLikePosts.service";

export default function useUnlikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      post_id,
      user_id,
    }: {
      post_id: string;
      user_id: string;
    }) => UnLikePostService(post_id, user_id),

    onMutate: async ({ post_id }) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueriesData<PostCardProps[]>({
        queryKey: ["posts"],
      });

      queryClient.setQueriesData<PostCardProps[]>(
        { queryKey: ["posts"] },
        (old) =>
          old?.map((post) =>
            post.id === post_id
              ? {
                  ...post,
                  is_liked: false,
                  likes_count: Math.max(0, post.likes_count - 1),
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

      toast.error("Failed to unlike post");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}