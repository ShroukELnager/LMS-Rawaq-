'use client';

import { logoutAction } from '@/Features/Auth/Actions/LogoutAction';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <button
      onClick={handleLogout}
      className="
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-sm
        text-[#48473A]
        transition
        hover:bg-white/40
        cursor-pointer
      "
    >
      <LogOut className="h-5 w-5" />
      <span>Logout</span>
    </button>
  );
}
