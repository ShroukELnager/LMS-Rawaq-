'use client';

import Image from 'next/image';
import { Heart, MessageSquare, SendHorizontal } from 'lucide-react';
import { useState } from 'react';

import { PostCardProps } from '@/Features/Dashboard/Types';
import { fixSupabaseUrl } from '@/Features/Dashboard/lib/FixSupabaseUrl';
import { useAppSelector } from '@/redux/hooks';

import { formatRequestTime } from '@/Features/Dashboard/lib/FormatRequestTime';

import useLikePosts from '@/Features/Dashboard/Hooks/useLikePosts';
import useUnlikePost from '@/Features/Dashboard/Hooks/useUnLikePosts';
import useCreateComments from '@/Features/Dashboard/Hooks/useCreateComment';
import useGetComments from '@/Features/Dashboard/Hooks/useGetComments';

export default function PostCard(post: PostCardProps) {
  const avatarUrl = fixSupabaseUrl(post.author?.avatar_url);

  const user = useAppSelector((state) => state.user.user);

  const { mutate: likePost } = useLikePosts();

  const { mutate: unlikePost } = useUnlikePost();

  const [content, setContent] = useState('');

  const { data: comments = [], isLoading: commentsLoading } = useGetComments(
    post.id
  );

  const { mutate: createComment, isPending } = useCreateComments();

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

  const handlePublish = () => {
    const value = content.trim();

    if (!value || isPending) return;

    createComment(
      {
        post_id: post.id,
        content: value,
      },

      {
        onSuccess: () => {
          setContent('');
        },
      }
    );
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3">
        <Image
          src={avatarUrl || '/images/avatar.png'}
          alt="user"
          width={45}
          height={45}
          className="rounded-full object-cover"
        />

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#101828]">
              {post.author?.first_name} {post.author?.last_name}
            </h3>

            {!(
              user?.user_metadata?.account_type === 'teacher' &&
              user?.id === post.author.id
            ) && (
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

      {/* Content */}

      <p className="mt-4 text-sm leading-7 text-[#475467]">{post.content}</p>

      {/* Actions */}

      <div className="mt-5 flex items-center gap-8 border-b border-[#EAECF0] pb-4">
        <button
          onClick={handleLike}
          className={`
            flex items-center gap-2 text-sm
            ${post.is_liked ? 'text-red-500' : 'text-[#667085]'}
          `}
        >
          <Heart size={18} className={post.is_liked ? 'fill-red-500' : ''} />

          <span>{post.likes_count}</span>
        </button>

        <div className="flex items-center gap-2 text-sm text-[#667085]">
          <MessageSquare size={18} />

          <span>{post.comments_count}</span>
        </div>
      </div>

      {/* Comments */}

      <div className="mt-5 space-y-4">
        {commentsLoading && (
          <p className="text-sm text-gray-400">Loading comments...</p>
        )}

        {!commentsLoading && comments.length === 0 && (
          <div
            className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        bg-[#F9FAFB]
        py-8
        text-center
      "
          >
            <MessageSquare size={32} className="mb-3 text-[#98A2B3]" />

            <p
              className="
          text-sm
          font-medium
          text-[#344054]
        "
            >
              No comments yet.
            </p>

            <p
              className="
          mt-1
          text-xs
          text-[#667085]
        "
            >
              Be the first to start the discussion.
            </p>
          </div>
        )}

        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <Image
              src={
                fixSupabaseUrl(comment.author?.avatar_url) ||
                '/images/avatar.png'
              }
              alt="comment-user"
              width={40}
              height={40}
              className="
          h-10
          w-10
          rounded-full
          object-cover
          ring-2
          ring-white
          shadow-sm
        "
            />

            <div className="flex flex-col">
              <div
                className="
            max-w-[320px]
            rounded-2xl
            rounded-tl-md
            bg-[#E7EEFF]
            px-4
            py-2.5
            transition
            hover:bg-[#E8EAED]
          "
              >
                <h4
                  className="
              text-sm
              font-semibold
              text-[#050505]
            "
                >
                  {comment.author?.first_name} {comment.author?.last_name}
                </h4>

                <p
                  className="
              mt-1
              break-words
              text-sm
              leading-5
              text-[#050505]
            "
                >
                  {comment.content}
                </p>
              </div>

              <div
                className="
            mt-1
            px-3
            text-xs
            text-[#65676B]
          "
              >
                {formatRequestTime(comment.created_at)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}

      <div className="mt-5 flex items-center gap-3">
        <Image
          src={
            fixSupabaseUrl(user?.user_metadata?.avatar_url) ||
            '/images/avatar.png'
          }
          alt="current-user"
          width={38}
          height={38}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="relative flex-1">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();

                handlePublish();
              }
            }}
            placeholder="Write a comment..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-[#D0D5DD]
              bg-[#EEF4FF]
              pl-4
              pr-12
              text-sm
              outline-none
              focus:border-primary
              focus:bg-white
            "
          />

          <button
            onClick={handlePublish}
            disabled={isPending || !content.trim()}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-primary
              disabled:opacity-40
              cursor-pointer
            "
          >
            {isPending ? (
              <div
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-primary
                  border-t-transparent
                "
              />
            ) : (
              <SendHorizontal size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
