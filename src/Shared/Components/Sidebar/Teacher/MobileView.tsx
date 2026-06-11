"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: "/images/home.png",
  },
  {
    name: "Groups",
    href: "/",
    icon: "/images/groups.png",
  },
  {
    name: "Requests",
    href: "/requests",
    icon: "/images/requests.png",
  },
  {
    name: "Tasks",
    href: "/assignments",
    icon: "/images/assignments.png",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "/images/profile.png",
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="flex items-center justify-between bg-white px-4 py-2  shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-xl px-3 py-2 transition
                ${isActive ? "text-primary" : "text-[#48473A]"}`}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={20}
                height={20}
                className={isActive ? "opacity-100" : "opacity-70"}
              />

              <span className="mt-1 text-[11px] font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}