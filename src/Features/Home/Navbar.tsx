'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-[24px] py-[20px] md:px-[48px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-inter text-[24px] font-bold leading-[32px] text-[#00535B]"
        >
          Rawaq
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-[32px] md:flex">
          <Link
            href="#features"
            className="font-inter text-[0.875rem] font-medium text-[#3E494A]"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="font-inter text-[0.875rem] font-medium text-[#3E494A]"
          >
            How it Works
          </Link>

          <Link
            href="#faq"
            className="font-inter text-[0.875rem] font-medium text-[#3E494A]"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-6 md:flex">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-[#016D77] px-[24px] py-[8px] font-inter text-[14px] font-medium text-white hover:bg-[#00535B]"
            >
              Go To App
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="font-inter text-[0.875rem] font-medium text-[#00535B]"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-[#016D77] px-[24px] py-[8px] font-inter text-[14px] font-medium text-white hover:bg-[#00535B]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-7 w-7 text-[#111C2C]" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#F9F9FF] md:hidden">
          <div className="flex h-full flex-col px-[24px] py-[24px]">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-inter text-[24px] font-bold text-[#00535B]"
              >
                Rawaq
              </Link>

              <button onClick={() => setOpen(false)} aria-label="Close Menu">
                <X className="h-7 w-7 text-[#111C2C]" />
              </button>
            </div>

            <nav className="mt-[32px] flex flex-col gap-[24px]">
              <Link
                href="#features"
                onClick={() => setOpen(false)}
                className="text-[16px] font-medium text-[#3E494A]"
              >
                Features
              </Link>

              <Link
                href="#how-it-works"
                onClick={() => setOpen(false)}
                className="text-[16px] font-medium text-[#3E494A]"
              >
                How it Works
              </Link>

              <Link
                href="#faq"
                onClick={() => setOpen(false)}
                className="text-[16px] font-medium text-[#3E494A]"
              >
                FAQ
              </Link>
            </nav>

            <div className="mt-[24px] border-t border-[#BEC8CA]" />

            <div className="mt-[24px] flex flex-col gap-[24px]">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-[8px] bg-[#016D77] py-[16px] text-center text-[18px] font-bold text-white"
                >
                  Go To App
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-center text-[20px] font-bold text-[#00535B]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-[8px] bg-[#016D77] py-[16px] text-center text-[18px] font-bold text-white"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
