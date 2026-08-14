'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Group from '@/assets/sidebarIcons/group.svg';
import Copy from '@/assets/sidebarIcons/copy.svg';
import Assignment from '@/assets/sidebarIcons/Assignment.svg';
import Student from '@/assets/sidebarIcons/Student.svg';
import Create from '@/assets/sidebarIcons/CreatePost.svg';
import Join from '@/assets/sidebarIcons/Join.svg';
import Teacher from '@/assets/sidebarIcons/Teacher.svg';

import LogoutButton from '../../Ui/LogoutButton';

type MenuItem = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function DesktopSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /*
   * Get groupId from:
   * ?groupId=...
   */
  const queryGroupId = searchParams?.get('groupId');

  /*
   * Get groupId from:
   * /group/[groupId]/...
   */
  const pathnameGroupId = pathname?.match(/^\/group\/([^/]+)/)?.[1];

  const groupId = queryGroupId || pathnameGroupId;

  /*
   * Main menu
   */
  const menuItems: MenuItem[] = [
    {
      name: 'My Groups',
      href: '/group',
      icon: Group,
    },
    {
      name: 'Join Requests',
      href: '/requests',
      icon: Join,
    },
  ];

  /*
   * Group menu
   * Only appears when a group is selected.
   */
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
          name: 'Group Students',
          href: `/group/${encodeURIComponent(groupId)}/members`,
          icon: Student,
        },
        {
          name: 'Create New Assignments',
          href: `/group/${encodeURIComponent(groupId)}/assignments/create`,
          icon: Create,
        },
      ]
    : [];

  const isActive = (href: string) => {
    if (href === '/group') {
      return pathname === '/group';
    }

    return pathname === href || pathname?.startsWith(`${href}/`);
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
          shrink-0
          items-center
          gap-3
          rounded-lg
          px-3
          py-3
          text-sm
          transition
          ${
            active
              ? 'bg-[#00535B] text-white'
              : 'text-[#48473A] hover:bg-white/40'
          }
        `}
      >
        <Icon
          className={`shrink-0 ${active ? 'text-white' : 'text-[#48473A]'}`}
        />

        <span className="font-medium">{item.name}</span>
      </Link>
    );
  };

  return (
    <aside
      className="
        hidden
        lg:flex
        lg:flex-col
        w-72
        h-[calc(100vh-4rem)]
        min-h-0
        shrink-0
        overflow-y-auto
        bg-[#E6E3D0]
        p-5
      "
    >
      {/* Logo */}
      <div className="mb-6 flex shrink-0 items-center gap-3 ">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
          <Teacher />
        </div>

        <div className="leading-tight">
          <h2 className="text-sm font-bold leading-5 tracking-[0.14px] text-primary">
            Teacher Portal
          </h2>

          <p className="text-[10px] uppercase leading-[15px] tracking-[0.5px] text-[#48473A]">
            Academic Excellence
          </p>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex flex-col gap-1 border-b-2 border-[#CFD0C3] mb-[250px] pb-[50px]">
        {menuItems.map(renderMenuItem)}

        {/* Group Menu */}
        {groupId && groupMenuItems.map(renderMenuItem)}
      </nav>

      {/* Bottom Section */}
      <div className=" flex flex-col gap-2 pt-6  ">
        {/* Create New Group */}
        <Link
          href="/group/create"
          className="
            flex
            w-full
            shrink-0
            items-center
            justify-center
            gap-[16px]
            rounded-lg
            bg-[#00535B]
            px-3
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
            
          "
        >
          <Create className="shrink-0 text-white " />

          <span>Create New Group</span>
        </Link>

        {/* Sign Out */}
        <LogoutButton />
      </div>
    </aside>
  );
}
