"use client";

import UserAvatar from "@/Shared/Utils/UserAvatar";
import Image from "next/image";


export default function DesktopNavbar() {
  return (
    <header className="hidden lg:flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Logo */}
      <div>
        <h1 className="text-lg font-bold text-primary">
          Rawaq
        </h1>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Image
          src="/images/search.png"
          alt="Search"
          width={12}
          height={12}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50"
        />

        <input
          type="text"
          placeholder="Search groups..."
          className="h-9 w-full rounded-full bg-[#F4F6FA] pl-9 pr-4 text-xs text-[#48473A] placeholder:text-[#9CA3AF] outline-none"
        />
      </div>

      {/* User */}
      <UserAvatar size={36} />
    </header>
  );
}