"use client";

import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { name: "My Groups", href: "/group", icon: "/images/groups.png" },
  { name: "Explore Groups", href: "/group/joined", icon: "/images/Vector.png" },
  { name: "Assignments", href: "/assignments", icon: "/images/assignments.png" },
  { name: "Join Requests", href: "/requests", icon: "/images/requests.png" },
];

const Items = [
  { name: "Profile", href: "/profile", icon: "/images/profile.png" },
  { name: "Settings", href: "/settings", icon: "/images/setting.png" },
];

export default function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen p-5 bg-[#E6E3D0]">
      
      <div className="mb-8 flex items-center gap-3">
        
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Image
            src="/images/teacherportal.png"
            alt="Student Logo"
            width={22}
            height={22}
          />
        </div>

        <div className="leading-tight">
          <h2 className="font-sans text-sm font-bold leading-5 tracking-[0.14px] text-primary">
            Student Portal
          </h2>

          <p className="text-[10px] leading-[15px] tracking-[0.5px] uppercase font-normal text-[#48473A]">
            Academic Excellence
          </p>
        </div>
      </div>

      <button className="mb-5 flex w-full items-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm text-white transition hover:opacity-90">
        <Image
          src="/images/dashboard.png"
          alt="Dashboard Icon"
          width={18}
          height={18}
        />
        <span className="font-medium">Dashboard</span>
      </button>

      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white/40 text-[#48473A]"
          >
            <Image src={item.icon} alt={item.name} width={20} height={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="my-5 border-t border-text/10" />

      <div className="flex flex-col gap-3 mb-6">
        {Items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white/40 text-[#48473A]"
          >
            <Image src={item.icon} alt={item.name} width={20} height={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

    </aside>
  );
}