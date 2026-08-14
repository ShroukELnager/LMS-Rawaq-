'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Group from '@/assets/sidebarIcons/group.svg';
import Join from '@/assets/sidebarIcons/join.svg';
import copy from '@/assets/sidebarIcons/copy.svg';
import Assignment from '@/assets/sidebarIcons/Assignment.svg';
import Student from '@/assets/sidebarIcons/Student.svg';

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function MobileBottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get groupId from ?groupId=
  const queryGroupId = searchParams?.get('groupId');

  // Get groupId if we're already inside /group/[groupId]/...
  const pathnameGroupId = pathname?.match(/^\/group\/([^/]+)/)?.[1];

  const groupId = queryGroupId || pathnameGroupId;

  const navItems: NavItem[] = [
    {
      name: 'Groups',
      href: '/group',
      icon: Group,
    },
    {
      name: 'Requests',
      href: '/requests',
      icon: Join,
    },

    ...(groupId
      ? [
          {
            name: 'Assignments',
            href: `/group/${encodeURIComponent(groupId)}/assignments`,
            icon: Assignment,
          },
          {
            name: 'Students',
            href: `/group/${encodeURIComponent(groupId)}/members`,
            icon: Student,
          },
          {
            name: 'Posts',
            href: `/group/${encodeURIComponent(groupId)}/posts`,
            icon: copy,
          },
        ]
      : []),
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="flex items-center justify-between border-t-2 border-[#9AA3A5] bg-white px-2 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center rounded-xl px-2 py-2 transition ${
                active ? 'text-primary' : 'text-[#48473A]'
              }`}
            >
              <Icon className={active ? 'text-primary' : 'text-[#48473A]'} />

              <span className="mt-1 text-[11px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
