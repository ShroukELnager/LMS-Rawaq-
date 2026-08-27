'use client';

import { ClipboardList, FileText, Users } from 'lucide-react';
import SectionCard from './SectionCard';
import PostCard from './PostCard';
import AssignmentCard from './AssignmentCard';
import FloatingButton from './FloatingButton';
import { useState } from 'react';
import CreatePostModal from '../Posts/CreatePostModal';
import SuccessModal from '../Posts/SuccessModal';
import useGetPosts from '@/Features/Dashboard/Hooks/useGetPosts';
import {
  Assignment,
  PostCardProps,
  StudentGroup,
} from '@/Features/Dashboard/Types';
import PostCardSkeleton from '@/Features/Dashboard/Skeleton/Student/PostCardSkeleton';
import { useRouter } from 'next/navigation';
import ErrorState from '@/Features/Dashboard/Errors/ErrorToLoadPage';
import useGetAssignments from '@/Features/Dashboard/Hooks/useGetAssignments';
import AssignmentCardSkeleton from '@/Features/Dashboard/Skeleton/Student/AssignmentsCart';
import HeaderCard from './HeaderCard';
import ChatBox from '../Ai/ChatBox';
import useGetSingleGroup from '@/Features/Dashboard/Hooks/useGetStudentSingleGroup';

type GroupPageProps = {
  groupId: string;
};

export default function GroupPage({ groupId }: GroupPageProps) {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {
    data: posts,
    isPending,
    isError,
    error,
    refetch,
  } = useGetPosts(groupId, 3);

  const {
    data: studentGroups,
    isLoading: isGroupLoading,
    isError: isGroupError,
    error: groupError,
    refetch: refetchGroup,
  } = useGetSingleGroup(groupId);

  // StudentGroupsResponse = StudentGroup[]
  const group: StudentGroup | undefined = studentGroups?.[0];

  const {
    data: assignments,
    isLoading: isAssignmentsLoading,
    isError: isAssignmentsError,
    error: assignmentsError,
    refetch: refetchAssignments,
  } = useGetAssignments(groupId);

  const router = useRouter();

  return (
    <div className="min-h-screen p-5">
      <HeaderCard groupId={groupId} />

      <div className="mx-auto max-w-7xl">
        {/* Top Cards */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {/* Posts - Desktop only */}
          <div className="hidden md:block">
            <SectionCard
              title="Posts"
              description="Stay updated with class updates"
              icon={<FileText size={18} color="#0F766E" />}
              borderColor="#0F766E"
              iconBg="#D8EEF0"
            />
          </div>

          {/* Assignments - Desktop only */}
          <div className="hidden md:block">
            <SectionCard
              title="Assignments"
              description="Manage your submissions"
              icon={<ClipboardList size={18} color="#A16207" />}
              borderColor="#A16207"
              iconBg="#FFF2D8"
            />
          </div>

          {/* Members - Mobile + Desktop */}
          <SectionCard
            title="Members"
            description="Connect with classmates"
            icon={<Users size={18} color="#78716C" />}
            borderColor="#78716C"
            iconBg="#F1F0EA"
          />
        </div>

        {/* Content */}
        <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-[2fr_1fr]">
          {/* ================= Assignments ================= */}
          <div className="min-w-0 lg:order-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#101828]">Assignments</h2>

              <button
                onClick={() => router.push(`/group/${groupId}/assignments`)}
                className="cursor-pointer text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                View all
              </button>
            </div>

            <div className="flex min-w-0 gap-4 overflow-x-auto pb-2 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:overflow-x-visible lg:pb-0">
              {isAssignmentsLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[85%] shrink-0 sm:w-[280px] lg:w-auto"
                  >
                    <AssignmentCardSkeleton />
                  </div>
                ))
              ) : isAssignmentsError ? (
                <div className="w-full shrink-0">
                  <ErrorState
                    message={
                      assignmentsError?.message || 'Failed to load assignments'
                    }
                    onRetry={() => refetchAssignments()}
                  />
                </div>
              ) : !assignments || assignments.length === 0 ? (
                <div className="w-full shrink-0 rounded-2xl bg-white p-8 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-[#101828]">
                    No assignments yet
                  </h3>

                  <p className="mt-2 text-sm text-[#667085]">
                    Your teacher hasn't published any assignments for this group
                    yet.
                  </p>
                </div>
              ) : (
                assignments.map((assignment: Assignment) => (
                  <div
                    key={assignment.id}
                    className="w-[85%] shrink-0 sm:w-[280px] lg:w-auto"
                  >
                    <AssignmentCard {...assignment} groupId={groupId} />
                  </div>
                ))
              )}
            </div>

            {/* Chat */}
            {isGroupLoading ? (
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                Loading group...
              </div>
            ) : isGroupError ? (
              <div className="mt-6">
                <ErrorState
                  message={
                    groupError?.message || 'Failed to load group information'
                  }
                  onRetry={() => refetchGroup()}
                />
              </div>
            ) : group ? (
              <ChatBox group={group} />
            ) : null}
          </div>

          {/* ================= Posts ================= */}
          <div className="min-w-0 lg:order-1">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#101828]">
                Latest Posts
              </h2>

              <button
                onClick={() => router.push(`/group/groupId=${groupId}/posts`)}
                className="hidden cursor-pointer text-sm font-medium text-teal-700 hover:text-teal-800 md:flex"
              >
                View all posts
              </button>
            </div>

            <div className="flex min-w-0 flex-col gap-4">
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

            <button
              onClick={() => router.push(`/group/${groupId}/assignments`)}
              className="mt-6 h-[44px] w-full rounded-[12px] bg-[#00535B] px-4 py-[12px] text-center font-inter text-[14px] font-bold leading-[20px] tracking-[0.14px] text-white transition hover:bg-[#014950] lg:hidden"
            >
              View All Posts
            </button>
          </div>
        </div>

        <FloatingButton onClick={() => setIsCreatePostOpen(true)} />

        {isCreatePostOpen && (
          <CreatePostModal
            onClose={() => setIsCreatePostOpen(false)}
            onSuccess={() => {
              setIsCreatePostOpen(false);
              setIsSuccessModalOpen(true);
            }}
            groupId={groupId}
          />
        )}

        {isSuccessModalOpen && (
          <SuccessModal onClose={() => setIsSuccessModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
