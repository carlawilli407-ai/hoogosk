'use client';
import React from 'react';
import Link from 'next/link';

export default function MobileHeader() {
  return (
    <header className="bg-black sticky top-0 z-50 border-b border-white/5">
      <div className="flex items-center justify-between px-4 pt-3 pb-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#026CDF] flex items-center justify-center">
            <span className="text-white font-extrabold text-sm">t</span>
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight leading-none">
            ticketmaster
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/my-account" className="text-white/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </Link>
          <Link href="/account" className="text-white/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
