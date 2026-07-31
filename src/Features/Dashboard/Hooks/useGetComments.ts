import { useQuery } from '@tanstack/react-query';

import { Comment } from '../Types';
import { CommentssService } from '../lib/Services/student/getComments.service';

export default function useGetComments(post_id: string, enabled: boolean) {
  return useQuery<Comment[]>({
    queryKey: ['comments', post_id],

    queryFn: () => CommentssService(post_id),

    enabled: !!post_id && enabled,
  });
}
