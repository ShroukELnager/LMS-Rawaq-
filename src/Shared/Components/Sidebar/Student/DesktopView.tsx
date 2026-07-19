'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '../../Ui/LogoutButton';

const menuItems = [
  { name: 'My Groups', href: '/group/joined', icon: '/images/groups.png' },
  { name: 'Explore Groups', href: '/group', icon: '/images/Vector.png' },
  {
    name: 'Assignments',
    href: '/assignments',
    icon: '/images/assignments.png',
  },
  { name: 'Join Requests', href: '/requests', icon: '/images/requests.png' },
];

const Items = [
  { name: 'Profile', href: '/profile', icon: '/images/profile.png' },
  { name: 'Settings', href: '/settings', icon: '/images/setting.png' },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  const isDashboardActive = pathname === '/dashboard';

  return (
  <aside
  className="
    hidden
    lg:block
    w-72
    h-[calc(100vh-4rem)]
    overflow-y-auto
    bg-[#E6E3D0]
    p-5
    shrink-0
  "
>

      {/* Logo */}
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
          <h2 className="text-sm font-bold leading-5 tracking-[0.14px] text-primary">
            Student Portal
          </h2>

          <p className="text-[10px] uppercase leading-[15px] tracking-[0.5px] text-[#48473A]">
            Academic Excellence
          </p>
        </div>
      </div>

      {/* Dashboard */}
      <Link
        href="/dashboard"
        className={`
          mb-5
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-4
          py-3
          text-sm
          transition

          ${
            isDashboardActive
              ? 'bg-primary text-white'
              : 'text-[#48473A] hover:bg-white/40'
          }
        `}
      >
        <Image
          src="/images/dashboard.png"
          alt="Dashboard Icon"
          width={18}
          height={18}
        />

        <span className="font-medium">Dashboard</span>
      </Link>

      {/* Main Menu */}
      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

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
                py-3
                text-sm
                transition

                ${
                  isActive
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
      <div className="my-5 border-t border-text/10" />

      {/* Bottom Menu */}
      <div className="flex flex-col gap-3">
        {Items.map((item) => {
          const isActive = pathname === item.href;

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
                py-3
                text-sm
                transition

                ${
                  isActive
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
        <LogoutButton />
      </div>
    </aside>
  );
}
