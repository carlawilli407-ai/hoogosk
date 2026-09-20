'use client';
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import MobileBottomNav from '@/components/MobileBottomNav';

// ── Local event catalogue — no external links ──
const eventCatalog: Record<
  number,
  {
    id: number;
    title: string;
    artist: string;
    tour: string;
    date: string;
    time: string;
    venue: string;
    city: string;
    image: string;
    accentColor: string;
  }
> = {
  1: {
    id: 1,
    title: "Get To Drinkin' Tour",
    artist: 'ZACH JOHN KING',
    tour: "Get To Drinkin' Tour",
    date: 'FRI, OCT 16, 2026',
    time: '6:00 PM',
    venue: 'Mercury Lounge',
    city: 'New York, NY',
    image:
      'https://s1.ticketm.net/dam/a/551/e19efdce-e15d-436f-b66c-3aa8822a2551_RETINA_PORTRAIT_3_2.jpg',
    accentColor: '#026CDF',
  },
  2: {
    id: 2,
    title: "Don't Look Down Tour",
    artist: 'ROD WAVE',
    tour: "Don't Look Down Tour",
    date: 'SAT, SEP 19, 2026',
    time: '8:00 PM',
    venue: 'Smoothie King Center',
    city: 'New Orleans, LA',
    image:
      'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    accentColor: '#F59E0B',
  },
  3: {
    id: 3,
    title: 'The Romantic Tour',
    artist: 'BRUNO MARS',
    tour: 'The Romantic Tour',
    date: 'SAT, SEP 19, 2026',
    time: '7:00 PM',
    venue: 'Hard Rock Stadium',
    city: 'Miami, FL',
    image:
      'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
    accentColor: '#A855F7',
  },
};

// Default event when no id is provided or id is not found
const defaultEvent = eventCatalog[3];

function EventDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventIdRaw = searchParams.get('id');
  const eventId = eventIdRaw ? parseInt(eventIdRaw, 10) : null;
  const event = eventId && eventCatalog[eventId] ? eventCatalog[eventId] : null;
  const displayEvent = event || defaultEvent;

  return (
    <div className="bg-black min-h-screen pb-24 relative">
      {/* Back button */}
      <button
        onClick={() => router?.back()}
        className="absolute top-4 left-4 z-10 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* ── Header with event title ── */}
      <div
        className="px-4 pt-14 pb-3 rounded-b-2xl"
        style={{ backgroundColor: displayEvent?.accentColor || '#1a3a8a' }}
      >
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <h1 className="text-white font-extrabold text-xl leading-tight">
              {displayEvent?.artist}
            </h1>
            <p className="text-white/80 text-sm mt-0.5 capitalize">{displayEvent?.tour}</p>
            <p className="text-white/60 text-xs mt-2 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {displayEvent?.venue} — {displayEvent?.city}
            </p>
          </div>
          {/* Ticket count badge placeholder */}
          <div className="flex items-center gap-1 flex-shrink-0 bg-white/15 rounded-lg px-2.5 py-1.5">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 7h-4.5L15 5h-2L7 5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10.5l-2.5-2H20c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-8 10c-1.1 0-2-.9-2-2V6c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2h-2z" />
            </svg>
            <span className="text-white font-bold text-sm">x2</span>
          </div>
        </div>
      </div>

      {/* ── Cover image ── */}
      <div className="relative" style={{ height: '170px' }}>
        <AppImage
          src={displayEvent?.image}
          alt={`${displayEvent?.artist} concert`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      </div>

      {/* ── Quick info bar ── */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-1.5 text-white/50 text-xs">
          <svg
            className="w-4 h-4 text-[#026CDF]"
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
          {displayEvent?.date}
        </div>
        <div className="flex items-center gap-1.5 text-white/50 text-xs">
          <svg
            className="w-4 h-4 text-[#026CDF]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {displayEvent?.time}
        </div>
        <div className="flex items-center gap-1.5 text-white/50 text-xs">
          <svg
            className="w-4 h-4 text-[#026CDF]"
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
          {displayEvent?.city?.split(',')[1]?.trim()}
        </div>
      </div>

      {/* ── Bright blue "Get Tickets" bar ── */}
      <div
        className="flex items-center justify-center gap-2 px-4 py-3"
        style={{ backgroundColor: '#026CDF' }}
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 7h-4.5L15 5h-2L7 5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10.5l-2.5-2H20c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-8 10c-1.1 0-2-.9-2-2V6c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2h-2z" />
        </svg>
        <Link href="/ticket-selection" className="text-white font-bold text-sm hover:underline">
          Get Tickets
        </Link>
      </div>

      {/* ── Tabs: Tickets | Extras ── */}
      <div className="flex items-center gap-6 px-4 pt-4 pb-2 border-b border-white/10">
        <button className="text-sm font-semibold pb-2 border-b-2 border-white text-white">
          Tickets
        </button>
        <button className="text-sm font-semibold pb-2 border-b-2 border-transparent text-white/50 hover:text-white/70">
          Extras
        </button>
      </div>

      {/* ── Order info ── */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-white/40 text-xs">Available Tickets</p>
          <p className="text-white/60 text-xs mt-0.5">2 Tickets</p>
        </div>
        <button className="w-8 h-8 flex items-center justify-center">
          <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* ── Tickets list ── */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <span className="text-white/40 text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 mr-4">
            GENERAL SALE
          </span>
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Section</p>
              <p className="text-white font-bold text-base">108</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Row</p>
              <p className="text-white font-bold text-base">D</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Seat</p>
              <p className="text-white font-bold text-base">5</p>
            </div>
          </div>
          <div className="w-6 h-6 bg-[#026CDF] rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <span className="text-white/40 text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 mr-4">
            GENERAL SALE
          </span>
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Section</p>
              <p className="text-white font-bold text-base">108</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Row</p>
              <p className="text-white font-bold text-base">D</p>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-widest">Seat</p>
              <p className="text-white font-bold text-base">6</p>
            </div>
          </div>
          <div className="w-6 h-6 bg-[#026CDF] rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Extras placeholder ── */}
      <div className="mx-4 mt-4 rounded-xl overflow-hidden border border-white/10">
        <div className="relative" style={{ height: '150px' }}>
          <AppImage
            src={displayEvent?.image}
            alt={`${displayEvent?.venue} location`}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            {displayEvent?.venue}
          </div>
          <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-around py-3 bg-white/5 border-t border-white/10">
          <button className="flex flex-col items-center gap-1 w-16">
            <svg
              className="w-6 h-6 text-[#026CDF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19V5m0 0l-7 7m7-7l7 7"
              />
            </svg>
            <span className="text-white/70 text-[10px] font-semibold">Upgrade</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-16">
            <svg
              className="w-6 h-6 text-[#026CDF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m-4-4v12"
              />
            </svg>
            <span className="text-white/70 text-[10px] font-semibold">Transfer</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-16">
            <svg
              className="w-6 h-6 text-[#026CDF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-white/70 text-[10px] font-semibold">Sell</span>
          </button>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}

export default function EventDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-black min-h-screen flex items-center justify-center pb-24">
          <div className="w-8 h-8 border-2 border-[#026CDF] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <EventDetailContent />
    </Suspense>
  );
}
