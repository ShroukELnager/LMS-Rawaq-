import Download from '@/assets/icons/download.svg';
import { GetGroupMemberResponse } from '@/Features/Dashboard/Types';

type Props = {
  data?: GetGroupMemberResponse;
};

export default function GroupMembersHeader({ data }: Props) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="font-[Inter] text-[24px] font-bold leading-8 text-[#101828]">
          Group Members
        </h1>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-[Inter] text-sm text-[#667085]">
            React Fundamentals
          </span>

          <span className="rounded-full bg-[#E8EEF8] px-3 py-1 text-xs font-medium text-[#344054]">
            {data?.pagination.total_count ?? 0} Total Members
          </span>
        </div>
      </div>

      <button className="flex cursor-pointer items-center gap-2 rounded-md bg-[#E6E3D0] px-4 py-2 text-xs font-medium text-[#666556]">
        <Download className="h-4 w-4" />
        Export
      </button>
    </div>
  );
}
