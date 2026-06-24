'use client';

import Image from 'next/image';
import { Heart, MessageSquare } from 'lucide-react';
import { PostCardProps } from '@/Features/Dashboard/Types';
import { fixSupabaseUrl } from '@/Features/Dashboard/lib/FixSupabaseUrl';
import { useAppSelector } from '@/redux/hooks';
import { formatRequestTime } from '@/Features/Dashboard/lib/FormatRequestTime';
import useLikePosts from '@/Features/Dashboard/hooks/useLikePosts';
import useUnlikePost from '@/Features/Dashboard/hooks/useUnLikePosts';

export default function PostCard(post: PostCardProps) {
  const avatarUrl = fixSupabaseUrl(post.author?.avatar_url);

  const user = useAppSelector((state) => state.user.user);

  const { mutate: likePost } = useLikePosts();

  const { mutate: unlikePost } = useUnlikePost();

  const handleLike = () => {
    if (!user?.id) return;

    if (post.is_liked) {
      unlikePost({
        post_id: post.id,
        user_id: user.id,
      });
    } else {
      likePost({
        post_id: post.id,
      });
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src={avatarUrl || '/images/avatar.png'}
          alt="user"
          width={45}
          height={45}
          className="rounded-full"
        />

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#101828]">
              {post.author?.first_name} {post.author?.last_name}
            </h3>

            {user?.user_metadata?.account_type === 'teacher' && (
              <span className="rounded bg-primary px-2 py-0.5 text-xs text-white">
                Instructor
              </span>
            )}
          </div>

          <span className="text-xs text-[#98A2B3]">
            {formatRequestTime(post.created_at)}
          </span>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#475467]">
        {post.content}
      </p>

      <div className="mt-4 flex gap-6">
        <button
          onClick={handleLike}
          className={`flex cursor-pointer items-center gap-2 text-sm transition
          ${post.is_liked ? 'text-red-500' : 'text-[#667085]'}
          `}
        >
          <Heart size={15} className={post.is_liked ? 'fill-red-500' : ''} />

          <span>{post.likes_count} likes</span>
        </button>

        <div className="flex items-center gap-2 text-sm text-[#667085]">
          <MessageSquare size={15} />

          <span>{post.comments_count} comments</span>
        </div>
      </div>
    </div>
  );
}
