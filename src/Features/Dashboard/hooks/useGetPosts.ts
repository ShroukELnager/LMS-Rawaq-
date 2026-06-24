import { useQuery } from "@tanstack/react-query";
import { PostsService } from "../lib/Services/student/getPosts.sevice";

export default function useGetPosts(
  groupId: string,
  limit: number = 3
) {
  return useQuery({
    queryKey: ["posts", groupId, limit],
    queryFn: () => PostsService(groupId, limit),
    enabled: !!groupId,
  });
}