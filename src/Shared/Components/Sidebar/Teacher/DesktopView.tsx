'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'My Groups', href: '/group/create', icon: '/images/groups.png' },
  { name: 'Join Requests', href: '/requests', icon: '/images/requests.png' },
  {
    name: 'Assignments',
    href: '/assignments',
    icon: '/images/assignments.png',
  },
  { name: 'Students', href: '/students', icon: '/images/studentss.png' },
  { name: 'Analytics', href: '/analytics', icon: '/images/analytics.png' },
];

const Items = [
  { name: 'Profile', href: '/profile', icon: '/images/profile.png' },
  { name: 'Settings', href: '/settings', icon: '/images/setting.png' },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden
        lg:flex
        flex-col
        w-72
        h-full
        shrink-0
        bg-[#E6E3D0]
        p-4
      "
    >
      {/* Logo */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Image
            src="/images/teacherportal.png"
            alt="Teacher Logo"
            width={22}
            height={22}
          />
        </div>

        <div>
          <h2 className="text-sm font-bold text-primary">Teacher Portal</h2>

          <p className="text-[10px] uppercase text-[#48473A]">
            Academic Excellence
          </p>
        </div>
      </div>

      {/* Dashboard */}
      <Link
        href="/dashboard"
        className={`
          mb-4
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-4
          py-2.5
          text-sm
          transition
          ${
            pathname === '/dashboard'
              ? 'bg-primary text-white'
              : 'text-[#48473A] hover:bg-white/40'
          }
        `}
      >
        <Image
          src="/images/dashboard.png"
          alt="Dashboard"
          width={18}
          height={18}
        />

        <span className="font-medium">Dashboard</span>
      </Link>

      {/* Main Menu */}
      <nav className="flex flex-1 flex-col gap-1">
        {menuItems.map((item) => {
          const active =
            pathname === item.href || pathname!.startsWith(item.href + '/');

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-2.5
                text-sm
                transition
                ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-[#48473A] hover:bg-white/40'
                }
              `}
            >
              <Image src={item.icon} alt={item.name} width={20} height={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="my-4 border-t border-text/10" />

      {/* Bottom Items */}
      <div className="flex flex-col gap-1">
        {Items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-2.5
                text-sm
                transition
                ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-[#48473A] hover:bg-white/40'
                }
              `}
            >
              <Image src={item.icon} alt={item.name} width={20} height={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Create Button */}
      <Link
        href="/group/create"
        className="
          mt-auto
          flex
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-primary
          px-4
          py-2.5
          text-sm
          text-white
          shadow-md
          transition
          hover:opacity-90
        "
      >
        <Image src="/images/plus.png" alt="Create" width={18} height={18} />

        <span className="font-medium">Create New Group</span>
      </Link>
    </aside>
  );
}
