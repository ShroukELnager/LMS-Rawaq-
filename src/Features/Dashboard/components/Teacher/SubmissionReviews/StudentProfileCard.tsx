import { SubmissionReviewResponse } from '@/Features/Dashboard/Types'
import StudentAvatar from '@/Shared/Components/StudentAvatar'
import UserAvatar from '@/Shared/Utils/UserAvatar'
import { UseQueryResult } from '@tanstack/react-query'
import React from 'react'

type Props={
  submissionDetails:UseQueryResult<SubmissionReviewResponse,Error>
}
import StudentProfileCardSkeleton from './StudentProfileCardSkeleton';

export default function StudentProfileCard({ submissionDetails }: Props) {
  if (submissionDetails.isPending) {
    return <StudentProfileCardSkeleton />;
  }

  const data = submissionDetails.data;

  const studentData = data?.student ?? {
    id: '',
    first_name: '',
    last_name: '',
    avatar_url: '',
  };

  const fullName = `${studentData.first_name} ${studentData.last_name}`;

  return (
    <div className="flex items-center rounded-3xl justify-start gap-4 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-6 py-6">
      <StudentAvatar
        firstName={studentData.first_name}
        lastName={studentData.last_name}
        avatarUrl={studentData.avatar_url}
        size={78}
      />

      <div className="flex flex-col">
        <h1 className="font-sans text-xl font-semibold leading-8 md:text-2xl">
          {fullName}
        </h1>

        <span className="inline-flex h-5 items-center rounded bg-light-blue py-0.5 text-sm text-dark-slate">
          Submitted:&nbsp;
          {data?.submitted_at
            ? new Date(data.submitted_at).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            : '--'}
        </span>
      </div>
    </div>
  );
}
