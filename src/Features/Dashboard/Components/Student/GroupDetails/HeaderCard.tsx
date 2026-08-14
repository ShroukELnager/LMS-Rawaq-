import useGetSingleGroup from '@/Features/Dashboard/Hooks/useGetStudentSingleGroup';

import Profile from '@/assets/icons/profile.svg';

import StudentAvatar from '@/Shared/Components/StudentAvatar';
type HeaderCardProps = {
  groupId: string;
};

export default function HeaderCard({ groupId }: HeaderCardProps) {
  const { data } = useGetSingleGroup(groupId);
  const group = data?.[0];

  return (
    <>
      {/* desktop */}
      <div className="rounded-[12px] bg-[#006D77] p-[32px] flex flex-row gap-[20px] hidden  md:flex">
        <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-[#F9F9FF] shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A]">
          <StudentAvatar
            firstName={group?.created_by.first_name}
            lastName={group?.created_by.last_name}
            avatarUrl={group?.created_by.avatar_url}
            size={80}
          />
        </div>

        <div className="flex-1 flex-row gap-[4px]">
          <h1 className="font-inter text-[32px] font-semibold leading-[40px] tracking-[-0.32px] text-white">
            {group?.name}
          </h1>

          <p className="font-inter text-[14px]  leading-[20px] tracking-[0.14px text-white">
            Instructor:
            <span className="font-inter text-[14px]  leading-[20px] tracking-[0.14px] capitalize text-white">
              {group?.created_by.first_name} {group?.created_by.last_name}
            </span>
          </p>

          <p className="font-inter text-[16px]  leading-[24px] tracking-[0px] text-white">
            Mastering modern web development with React and Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Mobile */}
      <div className="rounded-[12px] bg-[#006D77] p-[32px] flex flex-row gap-[20px] flex  md:hidden">
        <div className="flex-1 flex-row gap-[4px]">
          <h1 className="font-inter text-[32px] font-semibold leading-[40px] tracking-[-0.32px] text-white">
            {group?.name}
          </h1>

          <p className="font-inter text-[14px]  leading-[20px] tracking-[0.14px] text-white flex items-center gap-[4px]">
            <Profile />
            <span className="font-inter text-[14px]  leading-[20px] tracking-[0.14px] capitalize text-white">
              {group?.created_by.first_name} {group?.created_by.last_name}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
