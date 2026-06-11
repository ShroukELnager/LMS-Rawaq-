"use client";

import UserAvatar from "@/Shared/Utils/UserAvatar";


export default function MobileNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
      <h1 className="text-lg font-bold text-primary">
        Rawaq
      </h1>

      <UserAvatar size={32} />
    </header>
  );
}