'use client';

import { logoutAction } from '@/Features/Auth/Actions/LogoutAction';
import SignOut from '@/assets/sidebarICN/SignOut.svg';

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
        rounded-[8px]
        border
        border-[#BA1A1A]
        bg-transparent
        px-4
        py-3
        text-sm
        text-[#BA1A1A]
        transition
        hover:bg-[#BA1A1A]/5
        cursor-pointer
      "
    >
      <SignOut className="h-5 w-5 text-[#BA1A1A]" />
      <span>Logout</span>
    </button>
  );
}
