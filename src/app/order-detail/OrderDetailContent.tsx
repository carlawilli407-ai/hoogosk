'use client';
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import MobileBottomNav from '@/components/MobileBottomNav';

interface Ticket {
  id: string;
  section: string;
  row: string;
  seat: string;
}

interface EventData {
  id: string;
  order_number: string;
  artist: string;
  tour: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  email: string;
  image: string;
  accentColor: string;
  ticket_count: number;
  total_amount: number;
  tickets: Ticket[];
}

const EVENT_CATALOG: Record<string, EventData> = {
  'bruno-sept20': {
    id: 'bruno-sept20',
    order_number: '51-992301/CA',
    artist: 'BRUNO MARS',
    tour: 'THE ROMANTIC TOUR',
    date: 'SUN, SEP 20, 2026',
    time: '7:00 PM',
    venue: 'Hard Rock Stadium',
    city: 'Miami, FL',
    email: 'sandrawilli4042@gmail.com',
    image: 'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
    accentColor: '#A855F7',
    ticket_count: 3,
    total_amount: 630,
    tickets: [
      { id: '1', section: '102', row: 'G', seat: '12' },
      { id: '2', section: '102', row: 'G', seat: '13' },
      { id: '3', section: '102', row: 'G', seat: '14' },
    ],
  },
  'bruno-sept23': {
    id: 'bruno-sept23',
    order_number: '51-884210/CA',
    artist: 'BRUNO MARS',
    tour: 'THE ROMANTIC TOUR',
    date: 'WED, SEP 23, 2026',
    time: '7:30 PM',
    venue: 'Alamodome',
    city: 'San Antonio, TX',
    email: 'sandrawilli4042@gmail.com',
    image: 'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
    accentColor: '#A855F7',
    ticket_count: 4,
    total_amount: 840,
    tickets: [
      { id: '1', section: '113', row: '26', seat: '16' },
      { id: '2', section: '113', row: '26', seat: '17' },
      { id: '3', section: '113', row: '26', seat: '18' },
      { id: '4', section: '113', row: '26', seat: '19' },
    ],
  },
  'rod-sept26': {
    id: 'rod-sept26',
    order_number: '51-774502/CA',
    artist: 'ROD WAVE',
    tour: "DON'T LOOK DOWN TOUR",
    date: 'SAT, SEP 26, 2026',
    time: '8:00 PM',
    venue: 'American Airlines Center',
    city: 'Dallas, TX',
    email: 'sandrawilli4042@gmail.com',
    image: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    accentColor: '#F59E0B',
    ticket_count: 3,
    total_amount: 480,
    tickets: [
      { id: '1', section: '119', row: '12', seat: '5' },
      { id: '2', section: '119', row: '12', seat: '6' },
      { id: '3', section: '119', row: '12', seat: '7' },
    ],
  },
  'rod-oct31': {
    id: 'rod-oct31',
    order_number: '51-665109/CA',
    artist: 'ROD WAVE',
    tour: "DON'T LOOK DOWN TOUR",
    date: 'THU, OCT 31, 2026',
    time: '8:30 PM',
    venue: 'United Center',
    city: 'Chicago, IL',
    email: 'sandrawilli4042@gmail.com',
    image: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    accentColor: '#F59E0B',
    ticket_count: 3,
    total_amount: 510,
    tickets: [
      { id: '1', section: '108', row: 'D', seat: '10' },
      { id: '2', section: '108', row: 'D', seat: '11' },
      { id: '3', section: '108', row: 'D', seat: '12' },
    ],
  },
};

const TICKET_STUB_BADGE = (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12h18M4 12v-4a2 2 0 012-2h10a2 2 0 012 2v4M4 12v4a2 2 0 002 2h10a2 2 0 002-2v-4m0 0V7m0 5H6m10 0h2m-6 0h2m-4 0h2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8.5v7m0 0v7m0-7h16v7m0-3a2 2 0 01-2 2H6a2 2 0 01-2-2v-2" />
  </svg>
);

function TicketDetailView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventKey = searchParams.get('event') || 'bruno-sept20';
  const order = EVENT_CATALOG[eventKey] || EVENT_CATALOG['bruno-sept20'];

  const [activeTab, setActiveTab] = useState<'Tickets' | 'Extras'>('Tickets');

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Black header */}
      <div className="bg-black px-4 py-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <h1 className="text-white font-extrabold text-xl leading-tight uppercase">
              {order.artist} — {order.tour}
            </h1>
            <p className="text-white/70 text-sm mt-1">
              {order.venue} — {order.city}
            </p>
            <p className="text-white/40 text-xs mt-0.5 truncate">
              {order.email}
            </p>
          </div>
          {/* Ticket count badge */}
          <div className="flex items-center gap-1 flex-shrink-0 bg-white/10 rounded-lg px-2.5 py-1.5">
            {TICKET_STUB_BADGE}
            <span className="text-white font-bold text-sm">x{order.ticket_count}</span>
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="relative" style={{ height: '180px' }}>
        <AppImage
          src={order.image}
          alt={`${order.artist} concert`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Blue View Tickets bar */}
      <div className="bg-[#026CDF] px-4 py-3.5">
        <button className="w-full flex items-center justify-center gap-2 text-white font-bold text-base">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 7h-4.5L15 5h-2L7 5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10.5l-2.5-2H20c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-8 10c-1.1 0-2-.9-2-2V6c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2h-2z" />
          </svg>
          View Tickets
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('Tickets')}
          className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
            activeTab === 'Tickets'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-400'
          }`}
        >
          Tickets
        </button>
        <button
          onClick={() => setActiveTab('Extras')}
          className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
            activeTab === 'Extras'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-400'
          }`}
        >
          Extras
        </button>
      </div>

      {/* Tickets tab */}
      {activeTab === 'Tickets' && (
        <div className="px-4 pt-4">
          {/* Order summary */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-900 font-bold text-sm">Order #{order.order_number}</p>
              <p className="text-gray-500 text-xs mt-0.5">
                x{order.ticket_count} Tickets
              </p>
            </div>
            <button className="p-1">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              </svg>
            </button>
          </div>

          {/* Ticket cards */}
          <div className="flex flex-col gap-3 mb-6">
            {order.tickets.map((ticket) => (
              <div key={ticket.id} className="rounded-xl border border-gray-200 overflow-hidden">
                {/* GENERAL SALE label bar */}
                <div className="bg-gray-100 px-4 py-2.5">
                  <p className="text-gray-700 font-bold text-xs uppercase tracking-wide">
                    GENERAL SALE
                  </p>
                </div>
                {/* Section / Row / Seat grid */}
                <div className="px-4 py-3 grid grid-cols-3">
                  <div>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
                      SECTION
                    </p>
                    <p className="text-gray-900 font-bold text-2xl mt-0.5">{ticket.section}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
                      ROW
                    </p>
                    <p className="text-gray-900 font-bold text-2xl mt-0.5">{ticket.row}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest">
                      SEAT
                    </p>
                    <p className="text-gray-900 font-bold text-2xl mt-0.5">{ticket.seat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MORE OPTIONS with map */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wide mb-3">
              MORE OPTIONS
            </h3>
            <div
              className="relative rounded-xl overflow-hidden border border-gray-200"
              style={{ height: '180px' }}
            >
              {/* Map background */}
              <div className="absolute inset-0 bg-[#e8e0d8]">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute border-t border-gray-500"
                      style={{ top: `${i * 12.5}%`, left: 0, right: 0 }}
                    />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute border-l border-gray-500"
                      style={{ left: `${i * 20}%`, top: 0, bottom: 0 }}
                    />
                  ))}
                </div>
                {/* Venue label */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2">
                  <div className="bg-white rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="text-gray-900 font-bold text-xs">{order.venue}</span>
                  </div>
                </div>
                {/* Surrounding labels */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/80 text-gray-600 text-[9px] px-1.5 py-0.5 rounded font-medium">
                    Santa Monica
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-white/80 text-gray-600 text-[9px] px-1.5 py-0.5 rounded font-medium">
                    Culver City
                  </span>
                </div>
                <div className="absolute top-6 left-4">
                  <span className="bg-white/80 text-gray-600 text-[9px] px-1.5 py-0.5 rounded font-medium">
                    Municipal
                  </span>
                </div>
              </div>
              {/* Zoom controls */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10">
                <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-gray-700 font-bold text-lg">
                  +
                </button>
                <button className="w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-gray-700 font-bold text-lg">
                  −
                </button>
              </div>
              {/* Bottom action bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 px-4 py-2 flex items-center justify-around z-10">
                <button className="flex flex-col items-center gap-0.5">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-[9px] text-gray-500">Directions</span>
                </button>
                <div className="w-px h-6 bg-gray-300" />
                <button className="flex flex-col items-center gap-0.5">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-[9px] text-gray-500">Open Maps</span>
                </button>
                <div className="w-px h-6 bg-gray-300" />
                <button className="flex flex-col items-center gap-0.5">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-[9px] text-gray-500">Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transfer button */}
          <button
            onClick={() => router.push(`/ticket-transfer?event=${eventKey}`)}
            className="block w-full text-center bg-black text-white font-bold py-4 rounded-xl text-sm mb-4 mt-2"
          >
            Transfer Tickets
          </button>
        </div>
      )}

      {/* Extras tab */}
      {activeTab === 'Extras' && (
        <div className="px-4 pt-8 flex flex-col items-center text-center">
          <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-gray-500 text-sm">No extras available for this order.</p>
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#026CDF] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TicketDetailView />
    </Suspense>
  );
}
