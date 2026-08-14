'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Explore from '@/assets/sidebarICN/explore.svg';
import Group from '@/assets/sidebarICN/group.svg';
import Calender from '@/assets/sidebarICN/Calender.svg';
import Copy from '@/assets/sidebarICN/copy.svg';
import Assignment from '@/assets/sidebarICN/Assignment.svg';
import Create from '@/assets/sidebarICN/CreatePost.svg';
import Student from '@/assets/sidebarICN/Student.svg';

import LogoutButton from '../../Ui/LogoutButton';

type MenuItem = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function DesktopSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get groupId from ?groupId=
  const queryGroupId = searchParams?.get('groupId');

  // Get groupId if we're already inside /group/[groupId]/...
  const pathnameGroupId = pathname?.match(/^\/group\/([^/]+)/)?.[1];

  const groupId = queryGroupId || pathnameGroupId;

  const menuItems: MenuItem[] = [
    {
      name: 'Explore Groups',
      href: '/group',
      icon: Explore,
    },
    {
      name: 'My Groups',
      href: '/group/joined',
      icon: Group,
    },
    {
      name: 'My Calendar',
      href: '/my-calender',
      icon: Calender,
    },
  ];

  const groupMenuItems: MenuItem[] = groupId
    ? [
        {
          name: 'Group Posts',
          href: `/group/${encodeURIComponent(groupId)}/posts`,
          icon: Copy,
        },
        {
          name: 'Group Assignments',
          href: `/group/${encodeURIComponent(groupId)}/assignments`,
          icon: Assignment,
        },
        {
          name: 'Create New Post',
          href: `/group/${encodeURIComponent(groupId)}/posts`,
          icon: Create,
        },
      ]
    : [];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-[12px]
          text-sm
          transition
          ${
            active
              ? 'bg-[#00535B] text-white'
              : 'text-[#48473A] hover:bg-white/40'
          }
        `}
      >
        <Icon className={active ? 'text-white' : 'text-[#48473A]'} />

        <span className="font-medium">{item.name}</span>
      </Link>
    );
  };

  return (
    <aside
      className="
        sticky
        top-16
        hidden
        h-[calc(100vh-4rem)]
        w-72
        shrink-0
        overflow-y-auto
        bg-[#E6E3D0]
        p-5
        lg:flex
        lg:flex-col
      "
    >
      {/* Logo */}
      <div className="mb-6 flex shrink-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
          <Student color="white" />
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

      {/* Main Menu */}
      <nav className="flex min-h-0 flex-col gap-[4px]">
        {menuItems.map(renderMenuItem)}

        {/* Group Menu - ONLY when group is selected */}
        {groupId && groupMenuItems.map(renderMenuItem)}
      </nav>

      {/* Push Sign Out to bottom */}
      <div className="mt-auto shrink-0 pt-5">
        <LogoutButton />
      </div>
    </aside>
  );
}
