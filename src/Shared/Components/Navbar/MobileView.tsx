"use client";

import UserAvatar from "@/Shared/Utils/UserAvatar";
import Link from "next/link";


export default function MobileNavbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
      <Link href='/' className="text-lg font-bold text-primary">
        Rawaq
      </Link>

      <UserAvatar size={32} />
    </header>
  );
}