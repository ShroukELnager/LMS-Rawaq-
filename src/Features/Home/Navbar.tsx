'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#EEEEF4] bg-[#F9F9FF]">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-inter text-[24px] font-bold leading-[32px] tracking-[0px] text-[#00535B]"
        >
          Rawaq
        </Link>

        {/* ================= Desktop ================= */}
        <nav className="hidden items-center gap-[32px] md:flex">
          <Link
            href="#features"
            className="font-inter text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] text-[#3E494A]"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="font-inter text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] text-[#3E494A]"
          >
            How it Works
          </Link>

          <Link
            href="#faq"
            className="font-inter text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] text-[#3E494A]"
          >
            FAQ
          </Link>
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/login"
            className="font-inter text-[0.875rem] font-medium leading-[1.25rem] tracking-[0.00875rem] text-[#00535B]"
          >
            Login
          </Link>

          <Link
            href="/sign"
            className="rounded-full bg-[#016D77] px-[24px] py-[8px] font-inter text-[14px] font-medium leading-[20px] tracking-[0.14px] text-center text-white shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A] hover:bg-[#00535B]"
          >
            Get Started
          </Link>
        </div>

        {/* ================= Mobile Button ================= */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-7 w-7 text-[#111C2C]" />
        </button>
      </div>

      {/* ================= Mobile Menu ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#F9F9FF] md:hidden">
          <div className="flex h-full flex-col px-[24px] py-[24px]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-inter text-[24px] font-bold leading-[32px] tracking-[0px] text-[#00535B]"
              >
                Rawaq
              </Link>

              <button onClick={() => setOpen(false)} aria-label="Close Menu">
                <X className="h-7 w-7 text-[#111C2C]" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-[32px] flex flex-col gap-[24px]">
              <Link
                href="#features"
                onClick={() => setOpen(false)}
                className="font-inter text-[16px] font-medium leading-[24px] text-[#3E494A]"
              >
                Features
              </Link>

              <Link
                href="#how-it-works"
                onClick={() => setOpen(false)}
                className="font-inter text-[16px] font-medium leading-[24px] text-[#3E494A]"
              >
                How it Works
              </Link>

              <Link
                href="#faq"
                onClick={() => setOpen(false)}
                className="font-inter text-[16px] font-medium leading-[24px] text-[#3E494A]"
              >
                FAQ
              </Link>
            </nav>

            {/* Line */}
            <div className="mt-[24px] border-t border-[#BEC8CA]" />

            {/* Actions */}
            <div className="mt-[24px] flex flex-col gap-[24px]">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-center font-inter text-[20px] font-bold leading-[28px] text-[#00535B]"
              >
                Login
              </Link>

              <Link
                href="/sign"
                onClick={() => setOpen(false)}
                className="rounded-[8px] bg-[#016D77] py-[16px] text-center font-inter text-[18px] font-bold leading-[28px] text-white shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
