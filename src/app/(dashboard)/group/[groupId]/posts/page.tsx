'use client';

import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import UserAvatar from '@/Shared/Utils/UserAvatar';
import useCreatePosts from '@/Features/Dashboard/Hooks/useCreatePost';
import useGetPosts from '@/Features/Dashboard/Hooks/useGetPosts';
import PostCardSkeleton from '@/Features/Dashboard/Skeleton/Student/PostCardSkeleton';
import { PostCardProps } from '@/Features/Dashboard/Types';
import ErrorState from '@/Features/Dashboard/Errors/ErrorToLoadPage';
import PostCard from '@/Features/Dashboard/Components/Student/GroupDetails/PostCard';
import { useParams } from 'next/navigation';

import StudentPostHeader from '@/Features/Dashboard/Components/Student/GroupDetails/StudentPostHeader';
import TeacherPostHeader from '@/Features/Dashboard/Components/Teacher/TeacherPostHeader';

export default function PostsPage() {
  const params = useParams();
  const groupId = params?.groupId as string;

  const user = useAppSelector((state) => state.user.user);

  const role = user?.user_metadata?.account_type;

  const [content, setContent] = useState('');

  const { posts, isPending: isCreating } = useCreatePosts();

  const { data, isPending, isError, error, refetch } = useGetPosts(
    groupId!,
    10
  );

  const handlePublish = () => {
    if (!content.trim()) return;

    posts(
      {
        group_id: groupId!,
        author_id: user?.id!,
        content,
      },
      {
        onSuccess: () => {
          setContent('');
          refetch();
        },
      }
    );
  };

  const PostHeader = role === 'teacher' ? TeacherPostHeader : StudentPostHeader;

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-8">
      <div className="mx-auto max-w-3xl px-5">
        {/* Header */}
        <div className="mb-10">
          <PostHeader groupId={groupId} />
        </div>

        {/* Create Post */}
        <div className="mb-8 rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <UserAvatar size={45} />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share an update with the group..."
              className="
                h-20
                flex-1
                resize-none
                border-0
                text-sm
                text-[#344054]
                outline-none
                placeholder:text-[#98A2B3]
              "
            />
          </div>

          <div className="mt-5 border-t border-[#EAECF0]" />

          <div className="mt-4 flex justify-end">
            <button
              onClick={handlePublish}
              disabled={isCreating}
              className="
                cursor-pointer
                rounded-lg
                bg-[#006D77]
                px-6
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#005761]
                disabled:opacity-60
              "
            >
              {isCreating ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-5">
          {isPending ? (
            Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          ) : isError ? (
            <ErrorState
              message={error?.message || 'Failed to load posts'}
              onRetry={() => refetch()}
            />
          ) : !data || data.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-[#101828]">
                No posts yet
              </h3>

              <p className="mt-2 text-sm text-[#667085]">
                Posts shared by the teacher will appear here.
              </p>
            </div>
          ) : (
            data.map((post: PostCardProps) => (
              <PostCard key={post.id} {...post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
