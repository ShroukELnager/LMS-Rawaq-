'use client';


import useGetPosts from '@/Features/Dashboard/Hooks/useGetPosts';
import { Assignment, PostCardProps } from '@/Features/Dashboard/Types';
import PostCardSkeleton from '@/Features/Dashboard/Skeleton/Student/PostCardSkeleton';
import { useRouter } from 'next/navigation';
import ErrorState from '@/Features/Dashboard/Errors/ErrorToLoadPage';
import useGetAssignments from '@/Features/Dashboard/Hooks/useGetAssignments';
import AssignmentCardSkeleton from '@/Features/Dashboard/Skeleton/Student/AssignmentsCart';
import AssignmentHeader from './AssignmentHeader';
import GroupSettings from './GroupSettings';
import GroupMembers from './GroupMembers';
import PostCard from '../../Student/GroupDetails/PostCard';
import CreatePostModal from '../../Student/Posts/CreatePostModal';
import AssignmentCard from './AssignmentCart';

type GroupPageProps = {
  groupId: string;
};

export default function SingleGroupPage({ groupId }: GroupPageProps) {


  const {
    data: posts,
    isPending,
    isError,
    error,
    refetch,
  } = useGetPosts(groupId, 3);


const {
  data: assignments,
  isLoading: isAssignmentsLoading,
  isError: isAssignmentsError,
  error: assignmentsError,
  refetch: refetchAssignments,
} = useGetAssignments(groupId);
  const router = useRouter();

  return (
    <div className="min-h-screen  p-5">
      <div className="mx-auto max-w-7xl space-y-8">
        <AssignmentHeader groupId={groupId} />

        <div className="grid gap-6 lg:grid-cols-[2fr_340px]">
          <div className="space-y-12">
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#101828]">
                  Latest Posts
                </h2>

                <button
                  onClick={() => router.push(`/group/${groupId}/posts`)}
                  className="cursor-pointer text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  View All Posts
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {isPending ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))
                ) : isError ? (
                  <ErrorState
                    message={error?.message || 'Failed to load posts'}
                    onRetry={() => refetch()}
                  />
                ) : !posts || posts.length === 0 ? (
                  <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h3 className="text-lg font-semibold text-[#101828]">
                      No posts yet
                    </h3>

                    <p className="mt-2 text-sm text-[#667085]">
                      Posts shared by the teacher will appear here.
                    </p>
                  </div>
                ) : (
                  posts.map((post: PostCardProps) => (
                    <PostCard key={post.id} {...post} />
                  ))
                )}
              </div>
            </section>

            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#101828]">
                  Assignments
                </h2>

                <button
                  onClick={() => router.push(`/group/${groupId}/assignments`)}
                  className="cursor-pointer text-sm font-medium text-[#006D77]"
                >
                  View All Assignments
                </button>
              </div>

              {isAssignmentsLoading ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <AssignmentCardSkeleton key={i} />
                  ))}
                </div>
              ) : isAssignmentsError ? (
                <ErrorState
                  message={
                    assignmentsError?.message || 'Failed to load assignments'
                  }
                  onRetry={refetchAssignments}
                />
              ) : (
                <AssignmentCard groupId={groupId} />
              )}
            </section>
          </div>

          <div className="space-y-6">
            <GroupMembers groupId={groupId} />
            <GroupSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
