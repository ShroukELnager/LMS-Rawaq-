"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoGroupsState() {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative h-[310px] w-[600px] overflow-hidden rounded-xl">
        <Image
          src="/images/AB6AXuCb2MFKDpFa8rkVwgNb1HR9Bd6QFkJ0XR-FyQdQtUTfN26Cz_4QXqn9JTryO2Yow8KCKCpp7ADOY7BPqE2Mw8tCqikcx0hhGnS4aeyR20L0ueArzdVsjyICFF0ANo39YIX0j4fo1-wtPVh6Vn5P4LP4kU7bHQqPMF2funH0JOfG-F-2Z7-aaqjyBURMCjPaDeciUdduilnJr5Jd0.png"
          alt="No groups"
          fill
          className="object-cover"
        />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-[#1F2937]">
        You haven't created any groups yet.
      </h2>

      <p className="mt-2 max-w-[320px] text-xs leading-5 text-[#6B7280]">
        Create your first learning group to start sharing posts, assignments,
        and managing students. Build a space where knowledge grows together.
      </p>

      <button
        onClick={() => router.push('/group/create')}
        className="mt-6 flex h-10 w-11 items-center justify-center rounded-lg bg-[#005E66] text-white transition hover:bg-[#014950]"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}