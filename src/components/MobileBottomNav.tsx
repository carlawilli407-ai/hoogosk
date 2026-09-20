'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: (active: boolean) => (
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center ${active ? 'bg-[#026CDF]' : 'bg-transparent'}`}
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth={active ? 2.5 : 1.5} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={active ? 2.5 : 1.5}
            d="M12 8v4l2 2"
          />
        </svg>
      </div>
    ),
  },
  {
    label: 'Watchlist',
    href: '/watchlist',
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? 'text-[#A855F7]' : 'text-white/50'}`}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    ),
  },
  {
    label: 'My Tickets',
    href: '/my-account',
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? 'text-white' : 'text-white/50'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
        />
      </svg>
    ),
  },
  {
    label: 'Account',
    href: '/account',
    icon: (active: boolean) => (
      <svg
        className={`w-6 h-6 ${active ? 'text-white' : 'text-white/50'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-black border-t border-white/10 z-50"
      style={{ maxWidth: '430px' }}
    >
      <div className="flex items-center justify-around py-3 px-2">
        {navItems.map((item) => {
          const active =
            pathname === item.href || (item.href === '/my-account' && pathname === '/my-account');
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3"
            >
              {item.icon(active)}
              <span
                className={`text-[10px] font-medium ${active ? 'text-white font-bold' : 'text-white/50'}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
