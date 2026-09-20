import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function EventHero() {
  return (
    <div className="relative overflow-hidden" style={{ height: '400px' }}>
      <AppImage
        src="https://img.rocket.new/generatedImages/rocket_gen_img_1f713d075-1778992704052.png"
        alt="Taylor Swift Eras Tour concert stage with colorful lights in dark atmospheric stadium"
        fill
        className="object-cover"
        priority
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,14,26,0.95) 30%, rgba(10,14,26,0.4) 70%, transparent 100%)',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                Concerts
              </span>
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                🔥 Selling Fast
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Taylor Swift
            </h1>
            <p className="text-xl text-white/80 font-medium mt-1">The Eras Tour</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Sat, Mar 15, 2025 · 7:00 PM
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                SoFi Stadium · Los Angeles, CA
              </span>
            </div>
          </div>
          <Link
            href="/ticket-selection"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 text-base shrink-0"
          >
            Find Tickets
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
