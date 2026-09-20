'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import MobileBottomNav from '@/components/MobileBottomNav';

const forYouEvents = [
  {
    id: 1,
    title: 'ZACH JOHN KING',
    month: 'OCT',
    day: '16',
    dayName: 'Friday',
    time: '6:00PM',
    venue: 'New York, NY - Mercury Lounge',
    tour: "Get To Drinkin' Tour",
    image: 'https://s1.ticketm.net/dam/a/551/e19efdce-e15d-436f-b66c-3aa8822a2551_RETINA_PORTRAIT_3_2.jpg',
    alt: 'Zach John King performing live on stage',
    accentColor: '#026CDF',
  },
  {
    id: 2,
    title: 'ROD WAVE',
    month: 'SEP',
    day: '19',
    dayName: 'Saturday',
    time: '8:00PM',
    venue: 'New Orleans, LA - Smoothie King Center',
    tour: "Don't Look Down Tour",
    image: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    alt: 'Rod Wave performing at Smoothie King Center',
    accentColor: '#F59E0B',
  },
  {
    id: 3,
    title: 'BRUNO MARS',
    month: 'SEP',
    day: '19',
    dayName: 'Saturday',
    time: '7:00PM',
    venue: 'Miami, FL - Hard Rock Stadium',
    tour: 'The Romantic Tour',
    image: 'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
    alt: 'Bruno Mars performing The Romantic Tour live',
    accentColor: '#A855F7',
  },
];

const trendingEvents = [
  {
    id: 1,
    rank: '01',
    title: 'Bruno Mars',
    tour: "The Romantic Tour",
    genre: 'Pop/R&B',
    image: 'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
    alt: 'Bruno Mars performing The Romantic Tour',
    genreIcon: 'mic',
  },
  {
    id: 2,
    rank: '02',
    title: 'Rod Wave',
    tour: "Don't Look Down Tour",
    genre: 'Hip-Hop/Rap',
    image: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    alt: "Rod Wave performing Don't Look Down Tour",
    genreIcon: 'mic',
  },
  {
    id: 3,
    rank: '03',
    title: 'Zach John King',
    tour: "Get To Drinkin' Tour",
    genre: 'Rock',
    image: 'https://s1.ticketm.net/dam/a/551/e19efdce-e15d-436f-b66c-3aa8822a2551_RETINA_PORTRAIT_3_2.jpg',
    alt: 'Zach John King performing live',
    genreIcon: 'mic',
  },
  {
    id: 4,
    rank: '04',
    title: 'Harry Styles',
    tour: 'Love On Tour',
    genre: 'Pop',
    image: 'https://s1.ticketm.net/dam/a/2dd/442cd707-df65-4781-9aa8-eec39540d2dd_RETINA_PORTRAIT_3_2.jpg',
    alt: 'Harry Styles performing live on stage',
    genreIcon: 'mic',
  },
  {
    id: 5,
    rank: '05',
    title: 'Coldplay',
    tour: 'Music of the Spheres World Tour',
    genre: 'Rock/Pop',
    image: 'https://s1.ticketm.net/dam/a/60b/945abba9-7ebf-4862-a8a5-a622c8b0560b_RETINA_PORTRAIT_3_2.jpg',
    alt: 'Coldplay performing Music of the Spheres tour',
    genreIcon: 'mic',
  },
];

const recentlyBrowsed = [
  {
    id: 1,
    title: 'Bruno Mars',
    date: 'Sat Sep 19 - 7:00 PM',
    venue: 'Hard Rock Stadium, Miami',
    tour: 'The Romantic Tour',
    image: 'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
    alt: 'Bruno Mars performing The Romantic Tour live',
  },
  {
    id: 2,
    title: 'Rod Wave',
    date: 'Sat Sep 19 - 8:00 PM',
    venue: 'Smoothie King Center, New Orleans',
    tour: "Don't Look Down Tour",
    image: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    alt: "Rod Wave performing Don't Look Down Tour",
  },
];

const searchPlaceholders = ['Festivals', 'Concerts', 'Sports', 'Comedy Shows'];

export default function MobileHomePage() {
  const [searchIdx] = useState(0);

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Location pill */}
      <div className="px-4 pt-12 pb-3">
        <button className="flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span className="text-white font-semibold text-base">New York City, New York, US</span>
          <svg
            className="w-4 h-4 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-5">
        <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-full px-2 py-2">
          <div className="w-10 h-10 rounded-full bg-[#026CDF] flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <span className="text-white/40 text-sm">
            Search for{' '}
            <span className="text-white/70 font-semibold">{searchPlaceholders?.[searchIdx]}</span>
          </span>
        </div>
      </div>

      {/* For You section — horizontal scroll carousel */}
      <div className="pb-4">
        <h2 className="text-white font-bold text-lg px-4 mb-3">For You</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
          {forYouEvents?.map((event) => (
            <Link
              key={event?.id}
              href={`/event-detail?id=${event?.id}`}
              className="block flex-shrink-0 w-[calc(50%-6px)]"
            >
              <div className="rounded-xl overflow-hidden bg-black">
                {/* Cover image — top portion */}
                <div className="relative" style={{ height: '145px' }}>
                  <AppImage
                    src={event?.image}
                    alt={event?.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Bottom gradient for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  {/* Date pill — bottom-left of image */}
                  <div
                    className="absolute bottom-3 left-3 rounded-lg px-2.5 py-1.5"
                    style={{ backgroundColor: event?.accentColor || '#026CDF' }}
                  >
                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                      {event?.month}
                    </span>
                    <span className="text-white font-extrabold text-2xl leading-none ml-1">
                      {event?.day}
                    </span>
                  </div>
                </div>
                {/* Info panel — dark background below image */}
                <div className="px-3.5 pb-3.5 pt-3 bg-black flex items-start gap-3">
                  {/* Date/Tab small */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                    <span className="text-white/50 text-[9px] font-bold uppercase tracking-wider">
                      {event?.dayName?.slice(0, 3)}
                    </span>
                  </div>
                  {/* Artist name + details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-extrabold text-base leading-tight">
                        {event?.title}
                      </h3>
                      {/* Three-dot menu */}
                      <button className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </button>
                    </div>
                    {event?.tour && (
                      <p className="text-[#026CDF] text-[10px] font-semibold mt-0.5 uppercase tracking-wider">
                        {event?.tour}
                      </p>
                    )}
                    <p className="text-white/60 text-xs mt-1.5">
                      {event?.dayName} · {event?.time}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <svg
                        className="w-3.5 h-3.5 text-teal-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <p className="text-white/50 text-xs truncate">{event?.venue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending In The United States */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Trending In The United States</h2>
          <button className="text-white/50 text-sm">View All</button>
        </div>
        <div className="flex flex-col gap-0">
          {trendingEvents?.slice(0, 3)?.map((item, idx) => (
            <Link key={item?.id} href={`/event-detail?id=${item?.id}`} className="block">
              <div
                className={`flex items-center gap-3 py-3 ${idx < 2 ? 'border-b border-white/5' : ''}`}
              >
                <span className="text-[#F59E0B] font-extrabold text-2xl w-10 flex-shrink-0 leading-none">
                  {item?.rank}
                </span>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <AppImage
                    src={item?.image}
                    alt={item?.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-tight">{item?.title}</p>
                  {item?.tour && (
                    <p className="text-white/40 text-[10px] mt-0.5 truncate">{item?.tour}</p>
                  )}
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                    <p className="text-white/40 text-xs">{item?.genre}</p>
                  </div>
                </div>
                <button className="flex-shrink-0 p-1">
                  <svg
                    className="w-5 h-5 text-white/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Browsed Events */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">Recently Browsed Events</h2>
          <button className="text-white/50 text-sm">View All</button>
        </div>
        <div className="flex flex-col gap-3">
          {recentlyBrowsed?.map((event) => (
            <Link key={event?.id} href={`/event-detail?id=${event?.id}`} className="block">
              <div className="flex items-center gap-3 bg-[#111] rounded-xl p-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <AppImage
                    src={event?.image}
                    alt={event?.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{event?.title}</p>
                  {event?.tour && (
                    <p className="text-white/40 text-[10px] mt-0.5">{event?.tour}</p>
                  )}
                  <p className="text-white/50 text-xs mt-0.5">
                    {event?.date} · {event?.venue}
                  </p>
                </div>
                <button className="flex-shrink-0 p-1">
                  <svg
                    className="w-5 h-5 text-white/30"
                    fill="none"
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
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
