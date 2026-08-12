import { formatRequestTime } from "@/Features/Dashboard/lib/FormatRequestTime";
import { TeacherGroup } from "@/Features/Dashboard/Types";
import { Stat } from "./Stat";
import { useRouter } from "next/navigation";
        import { ArrowRight } from 'lucide-react';

export function GroupCard({ group }: { group: TeacherGroup }) {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm ">
      <h3 className="text-2xl font-bold text-[#1F2937]">{group.name}</h3>

      <p className="mt-3 min-h-[48px] line-clamp-2 overflow-hidden text-[15px] leading-6 text-[#6B7280]">
        {group.description || '\u00A0'}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat value={group.members_count} label="Members" />
        <Stat value={group.assignments_count} label="Tasks" />
        <Stat value={group.posts_count} label="Posts" />
      </div>

      <div className="mt-auto pt-6">
        <p className="text-xs text-[#9CA3AF]">
          Created {formatRequestTime(group.created_at)}
        </p>
        <button
          onClick={() => router.push(`/group/${group.id}`)}
          className="group mt-5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-white transition hover:bg-[#014950]"
        >
          Open Group
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
