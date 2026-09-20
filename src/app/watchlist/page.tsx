'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import MobileBottomNav from '@/components/MobileBottomNav';

type WatchlistTab = 'Events' | 'Favorites';

const watchlistEvents = [
  {
    id: 1,
    title: 'Bruno Mars - The Ro...',
    time: '7:00PM',
    city: 'Miami, FL',
    day: '19',
    dayName: 'Sat',
    month: 'September',
    year: '2026',
    urgency: 'Event in 1 Day',
    urgencyDays: '1 Day',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_445ad6fdf-1789750498967.png',
    alt: 'Bruno Mars performing live on stage with energetic crowd',
    accentColor: '#F59E0B',
  },
  {
    id: 2,
    title: 'Taylor Swift - Eras Tour',
    time: '7:30PM',
    city: 'Los Angeles, CA',
    day: '03',
    dayName: 'Sat',
    month: 'November',
    year: '2026',
    urgency: 'Event in 45 Days',
    urgencyDays: '45 Days',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e17ee83c-1768897270048.png',
    alt: 'Taylor Swift performing The Eras Tour with colorful stage production',
    accentColor: '#A855F7',
  },
];

const recentlyBrowsed = [
  {
    id: 1,
    title: 'Bruno Mars',
    date: 'Wed 30 Sep - 7:00 PM',
    venue: 'Inglewood...',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_445ad6fdf-1789750498967.png',
    alt: 'Bruno Mars performing live on stage with energetic crowd',
  },
  {
    id: 2,
    title: 'Harry Styles',
    date: 'Fri Oct 16 - 6:00 PM',
    venue: 'New York, US...',
    image: 'https://images.unsplash.com/photo-1579031689105-6b0e71537e0e',
    alt: 'Harry Styles performing live on stage with guitar',
  },
];

const favoriteArtists = [
  {
    id: 1,
    title: 'Harry Styles',
    genre: 'Pop',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11b355208-1772435022154.png',
    alt: 'Harry Styles performing live on stage',
  },
  {
    id: 2,
    title: 'Taylor Swift',
    genre: 'Pop/Country',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_164899f2b-1785049144946.png',
    alt: 'Taylor Swift performing on stage',
  },
  {
    id: 3,
    title: 'Bruno Mars',
    genre: 'Pop/R&B',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19fcdd863-1772706258552.png',
    alt: 'Bruno Mars performing live',
  },
];

export default function WatchlistPage() {
  const [activeTab, setActiveTab] = useState<WatchlistTab>('Events');

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-6 text-center">
        <h1 className="text-white font-extrabold text-2xl tracking-widest uppercase">Watchlist</h1>
        <p className="text-white/40 text-sm mt-1">Keep track of what&apos;s important</p>
      </div>

      {/* Tab toggle */}
      <div className="px-4 mb-6">
        <div className="flex items-center bg-[#111] rounded-full p-1">
          <button
            onClick={() => setActiveTab('Events')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === 'Events' ? 'bg-[#A855F7] text-white' : 'text-white/50'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill={activeTab === 'Events' ? 'currentColor' : 'none'}
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
            Events
          </button>
          <button
            onClick={() => setActiveTab('Favorites')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === 'Favorites' ? 'bg-[#A855F7] text-white' : 'text-white/50'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill={activeTab === 'Favorites' ? 'currentColor' : 'none'}
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
            Favorites
          </button>
        </div>
      </div>

      {activeTab === 'Events' && (
        <>
          {/* Month/Year header */}
          {watchlistEvents.length > 0 && (
            <div className="px-4 mb-3 flex items-center justify-between">
              <span className="text-white font-bold text-base">{watchlistEvents[0].month}</span>
              <span className="text-white/50 text-base">{watchlistEvents[0].year}</span>
            </div>
          )}

          {/* Event cards */}
          <div className="px-4 flex flex-col gap-3 mb-6">
            {watchlistEvents.map((event) => (
              <div key={event.id} className="flex gap-3">
                {/* Left accent bar + date */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-1 rounded-full flex-1"
                    style={{ backgroundColor: event.accentColor, minHeight: '80px' }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-10 flex-shrink-0">
                  <span className="text-white font-extrabold text-2xl leading-none">
                    {event.day}
                  </span>
                  <span className="text-white/50 text-xs">{event.dayName}</span>
                </div>
                {/* Card */}
                <div className="flex-1 bg-[#1a1a1a] rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 p-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <AppImage src={event.image} alt={event.alt} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm leading-tight">{event.title}</p>
                      <p className="text-white/50 text-xs mt-0.5">
                        {event.time} · {event.city}
                      </p>
                    </div>
                    <button className="flex-shrink-0 p-1">
                      <svg
                        className="w-4 h-4 text-white/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                  {/* Urgency + CTA */}
                  <div className="flex items-center justify-between px-3 pb-3">
                    <p className="text-[#F59E0B] text-xs">
                      {event.urgency.replace(event.urgencyDays, '')}
                      <span className="font-bold">{event.urgencyDays}</span>
                    </p>
                    <Link
                      href="/event-detail"
                      className="flex items-center gap-1.5 bg-[#F59E0B] text-black text-xs font-bold px-4 py-2 rounded-full"
                    >
                      Find Tickets
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-4 border-t border-white/5 mb-6" />

          {/* Recently Browsed Events */}
          <div className="px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-base">Recently Browsed Events</h2>
              <button className="text-white/50 text-sm">Clear</button>
            </div>
            <div className="flex flex-col gap-3">
              {recentlyBrowsed.map((event) => (
                <Link key={event.id} href="/event-detail">
                  <div className="flex items-center gap-3 bg-[#111] rounded-xl p-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <AppImage src={event.image} alt={event.alt} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm">{event.title}</p>
                      <p className="text-white/50 text-xs mt-0.5">
                        {event.date} · {event.venue}
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
        </>
      )}

      {activeTab === 'Favorites' && (
        <div className="px-4">
          <div className="flex flex-col gap-3">
            {favoriteArtists.map((artist) => (
              <Link key={artist.id} href="/event-detail">
                <div className="flex items-center gap-3 bg-[#111] rounded-xl p-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage src={artist.image} alt={artist.alt} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">{artist.title}</p>
                    <p className="text-white/50 text-xs mt-0.5">{artist.genre}</p>
                  </div>
                  <button className="flex-shrink-0 p-1">
                    <svg className="w-5 h-5 text-[#A855F7]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
}
