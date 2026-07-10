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
import { Assignment, PostCardProps } from '@/Features/Dashboard/Types';
import PostCardSkeleton from '@/Features/Dashboard/Skeleton/Student/PostCardSkeleton';
import { useRouter } from 'next/navigation';
import ErrorState from '@/Features/Dashboard/Errors/ErrorToLoadPage';
import useGetAssignments from '@/Features/Dashboard/Hooks/useGetAssignments';
import AssignmentCardSkeleton from '@/Features/Dashboard/Skeleton/Student/AssignmentsCart';

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
  data: assignments,
  isLoading: isAssignmentsLoading,
  isError: isAssignmentsError,
  error: assignmentsError,
  refetch: refetchAssignments,
} = useGetAssignments(groupId);console.log("assignments", assignments);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-5">
      <div className="mx-auto max-w-7xl">
        {/* Top Cards */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <SectionCard
            title="Posts"
            description="Stay updated with class updates"
            icon={<FileText size={18} color="#0F766E" />}
            borderColor="#0F766E"
            iconBg="#D8EEF0"
          />

          <SectionCard
            title="Assignments"
            description="Manage your submissions"
            icon={<ClipboardList size={18} color="#A16207" />}
            borderColor="#A16207"
            iconBg="#FFF2D8"
          />

          <SectionCard
            title="Members"
            description="Connect with classmates"
            icon={<Users size={18} color="#78716C" />}
            borderColor="#78716C"
            iconBg="#F1F0EA"
          />
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Posts */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#101828]">
                Latest Posts
              </h2>

              <button
                onClick={() => router.push(`/group/posts?groupId=${groupId}`)}
                className="cursor-pointer text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                View all posts
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
          </div>

          {/* Assignments */}
          <div>
            <h2 className="text-xl font-bold text-[#101828]">Assignments</h2>

            <div className="mt-5 flex flex-col gap-4">
              {isAssignmentsLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <AssignmentCardSkeleton key={index} />
                ))
              ) : isAssignmentsError ? (
                <ErrorState
                  message={
                    assignmentsError?.message || 'Failed to load assignments'
                  }
                  onRetry={() => refetchAssignments()}
                />
              ) : !assignments || assignments.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
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
                  <AssignmentCard
                    key={assignment.id}
                    {...assignment}
                    groupId={groupId}
                  />
                ))
              )}
            </div>
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
