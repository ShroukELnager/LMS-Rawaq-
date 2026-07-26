import { SubmissionReviewDetailsResponse } from '@/Features/Dashboard/Types';
import { UseQueryResult } from '@tanstack/react-query';
import { CheckCircle2 } from 'lucide-react';

type AssignmentPerformanceProps = {
  data: UseQueryResult<SubmissionReviewDetailsResponse, Error>;
};

export default function AssignmentPerformanceCard({
  data,
}: AssignmentPerformanceProps) {
  const reviewData = data.data;

  if (!reviewData) return null;
console.log(reviewData);
  const assignment = reviewData.assignment;
  const submission = reviewData.submission;

  const isReviewed = submission?.status === 'reviewed';

  const totalGrade = assignment?.total_grade ?? 0;
  const awardedGrade = submission?.total_grade_awarded ?? 0;

  const percentage =
    totalGrade > 0 ? Math.round((awardedGrade / totalGrade) * 100) : 0;

  return (
    <div className="flex w-full gap-6">
      {/* Performance Card - Left */}
      <div className="w-[31.64%] rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <p className="text-center font-inter text-[12px] font-medium uppercase tracking-wide text-[#3E494A]">
          Your Performance
        </p>

        {isReviewed ? (
          <>
            <div className="mt-6 flex items-end justify-center gap-2">
              <span className="font-inter text-[48px] font-bold leading-[60px] tracking-[-0.96px] text-primary">
                {awardedGrade}
              </span>

              <span className="mb-2 font-inter text-[18px] font-semibold text-[#6F797A]">
                / {totalGrade}
              </span>
            </div>

            <div className="mt-6">
              <div className="h-2 w-full rounded-full bg-[#E7EEFF]">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="mt-4 text-center font-inter text-[18px] font-bold text-primary">
                {percentage}%
              </p>
            </div>
          </>
        ) : (
          <div className="mt-8 text-center">
            <p className="font-inter text-sm font-semibold text-[#6F797A]">
              Waiting for review
            </p>
          </div>
        )}
      </div>

      {/* Details Card - Right */}
      <div className="w-[65.81%] rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-x-8 gap-y-5">
          <InfoItem
            label="Status"
            value={
              isReviewed ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F6F3] px-3 py-1 font-inter text-xs font-semibold leading-4 text-primary">
                  <CheckCircle2 size={16} strokeWidth={2.5} />
                  Reviewed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7E6] px-3 py-1 font-inter text-xs font-semibold leading-4 text-[#B45309]">
                  Waiting
                </span>
              )
            }
          />
          <InfoItem
            label="Total Points"
            value={`${totalGrade} Points`}
            valueClass=" font-bold"
          />

          <InfoItem
            label="Grade Awarded"
            value={isReviewed ? `${awardedGrade} Points` : 'Not graded'}
            valueClass="text-primary font-bold"
          />

          <InfoItem
            label="Deadline"
            value={assignment?.deadline ? formatDate(assignment.deadline) : '-'}
            valueClass="font-inter text-base font-normal leading-6 tracking-normal text-[#111C2C]"
          />

          <InfoItem
            label="Submitted At"
            value={
              submission?.submitted_at
                ? formatDate(submission.submitted_at)
                : '-'
            }
            valueClass="font-inter text-base font-normal leading-6 tracking-normal text-[#111C2C]"
          />

          <InfoItem
            label="Teacher"
            value={
              reviewData.teacher
                ? `Prof. ${reviewData.teacher.first_name} ${reviewData.teacher.last_name}`
                : '-'
            }
            valueClass="font-inter text-base font-normal leading-6 tracking-normal text-[#111C2C]"
          />
        </div>

        <div className="mt-5 border-t border-[#E5E7EB] pt-4">
          <p className="font-inter text-[12px] font-medium text-[#6F797A]">
            General Description
          </p>

          <p className="mt-2 font-inter text-base font-normal leading-6 text-[#3E494A]">
            {assignment?.description || '-'}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  valueClass = '',
}: {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="font-inter text-[12px] font-medium text-[#6F797A]">
        {label}
      </p>

      <p
        className={`mt-1  ${valueClass}`}
      >
        {value}
      </p>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date));
}
