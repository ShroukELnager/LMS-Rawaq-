'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Explore from '@/assets/sidebarICN/explore.svg';
import Group from '@/assets/sidebarICN/group.svg';
import Calender from '@/assets/sidebarICN/Calender.svg';
import Copy from '@/assets/sidebarICN/copy.svg';
import Assignment from '@/assets/sidebarICN/Assignment.svg';

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

  // Get groupId from /group/[groupId]/...
  const pathnameGroupId = pathname?.match(/^\/group\/([^/]+)/)?.[1];

  const groupId = queryGroupId || pathnameGroupId;

  const navItems: NavItem[] = [
    {
      name: 'Explore',
      href: '/group',
      icon: Explore,
    },
    {
      name: 'Groups',
      href: '/group/joined',
      icon: Group,
    },
    {
      name: 'Calendar',
      href: '/my-calender',
      icon: Calender,
    },
  ];

  const groupNavItems: NavItem[] = groupId
    ? [
        {
          name: 'Posts',
          href: `/group/${encodeURIComponent(groupId)}/posts`,
          icon: Copy,
        },
        {
          name: 'Assignments',
          href: `/group/${encodeURIComponent(groupId)}/assignments`,
          icon: Assignment,
        },
      ]
    : [];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`
          flex
          min-w-0
          flex-1
          flex-col
          items-center
          justify-center
          rounded-xl
          px-2
          py-1.5
          transition
          ${active ? 'text-[#00535B]' : 'text-[#48473A]'}
        `}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          <Icon
            className={`
           
              shrink-0
              ${active ? 'text-[#00535B]' : 'text-[#48473A]'}
            `}
          />
        </span>

        <span className="mt-1 truncate text-[11px] font-medium">
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* 
        Spacer:
        بيحجز مساحة للـ fixed bottom nav
        عشان آخر محتوى في الصفحة مايتغطاش
      */}
      <div className="h-[72px] lg:hidden" />

      {/* Bottom Navigation */}
      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          border-t
          border-[#BEC8CA1A]
          bg-white
          shadow-[0_-4px_12px_rgba(0,0,0,0.08)]
          lg:hidden
        "
      >
        <div className="mx-auto flex w-full items-center px-2 py-2">
          {/* Main navigation */}
          {navItems.map(renderNavItem)}

          {/* Group navigation */}
          {groupId && groupNavItems.map(renderNavItem)}
        </div>
      </nav>
    </>
  );
}
