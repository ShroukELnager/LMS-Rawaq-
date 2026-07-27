'use client';

import { ChevronRight, Pencil, Settings, LogOut } from 'lucide-react';

export default function GroupSettings() {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        <Settings size={20} className="text-[#045D6C]" />

        <h2 className="text-lg font-bold text-[#101828]">Group Settings</h2>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <button className="flex w-full cursor-pointer items-center justify-between border-b px-5 py-4 transition hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <Pencil size={18} className="text-gray-600" />

            <span className="font-medium text-[#101828]">Edit Group Info</span>
          </div>

          <ChevronRight size={18} className="text-gray-400" />
        </button>

        <button className="flex w-full cursor-pointer items-center justify-between px-5 py-4 transition hover:bg-red-50">
          <div className="flex items-center gap-3">
            <LogOut size={18} className="text-red-600" />

            <span className="font-medium text-red-600">Archive Group</span>
          </div>

          <ChevronRight size={18} className="text-red-300" />
        </button>
      </div>
    </div>
  );
}
