import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CreateCommentRequest,
  PostCardProps,
  Comment,
} from "../Types";

import { RequestToCreateComment } from "../lib/Services/student/createComment.service";

export default function useCreateComments() {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (data: CreateCommentRequest) =>
      RequestToCreateComment(data),


    onMutate: async ({ post_id, content }) => {

      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });


      await queryClient.cancelQueries({
        queryKey: ["comments", post_id],
      });



      const previousPosts =
        queryClient.getQueriesData<PostCardProps[]>({
          queryKey: ["posts"],
        });



      const previousComments =
        queryClient.getQueryData<Comment[]>([
          "comments",
          post_id,
        ]);



      // update comments count
      queryClient.setQueriesData<PostCardProps[]>(
        {
          queryKey: ["posts"],
        },

        (old) =>
          old?.map((post) =>
            post.id === post_id
              ? {
                  ...post,
                  comments_count:
                    post.comments_count + 1,
                }
              : post
          )
      );



      // add sent comment directly to UI
      queryClient.setQueryData<Comment[]>(
        [
          "comments",
          post_id,
        ],

        (old) => [

          ...(old ?? []),

          {
            id: crypto.randomUUID(),

            post_id,

            content,

            created_at:
              new Date().toISOString(),

            author_id: "",

            author: {
              id: "",
              first_name: "You",
              last_name: "",
              avatar_url: "",
            },

          },

        ]

      );



      return {
        previousPosts,
        previousComments,
      };

    },



    onError: (_err, variables, context) => {


      context?.previousPosts?.forEach(
        ([queryKey, data]) => {

          queryClient.setQueryData(
            queryKey,
            data
          );

        }
      );



      queryClient.setQueryData(
        [
          "comments",
          variables.post_id,
        ],

        context?.previousComments

      );



      toast.error(
        "Failed to create comment"
      );

    },



    onSuccess: () => {

      toast.success(
        "Comment added"
      );

    },



    onSettled: (_data, _error, variables) => {


      queryClient.invalidateQueries({

        queryKey: ["posts"],

      });



      queryClient.invalidateQueries({

        queryKey: [
          "comments",
          variables.post_id,
        ],

      });


    },

  });
}