'use client';

import UserAvatar from '@/Shared/Utils/UserAvatar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DesktopNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams?.get('search') || '');

  useEffect(() => {
    setSearch(searchParams?.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const value = search.trim();

      if (!value) {
        if (pathname === '/group' && searchParams?.has('search')) {
          router.replace('/group');
        }

        return;
      }

      router.replace(`/group?search=${encodeURIComponent(value)}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <header className="hidden h-16 items-center justify-between border-b border-gray-200 bg-white px-6 lg:flex">
      <div>
        <Link href="/" className="text-lg font-bold text-primary">
          Rawaq
        </Link>
      </div>

      <div className="relative w-full max-w-md">
        <Image
          src="/images/search.png"
          alt="Search"
          width={12}
          height={12}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search groups..."
          className="h-9 w-full rounded-full bg-[#F4F6FA] pl-9 pr-4 text-xs text-[#48473A] outline-none placeholder:text-[#9CA3AF]"
        />
      </div>

      <UserAvatar size={36} />
    </header>
  );
}
