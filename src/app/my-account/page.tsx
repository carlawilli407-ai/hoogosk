'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';
import MobileBottomNav from '@/components/MobileBottomNav';
import { useAuth } from '@/contexts/AuthContext';

interface Ticket {
  id: string;
  section: string;
  row_label: string;
  seat: string;
  barcode: string;
}

interface TransferRecord {
  id: string;
  ticket_id: string;
  recipient_email: string;
  recipient_name: string;
  transfer_status: string;
  note: string;
  transferred_at: string;
}

interface Order {
  id: string;
  order_number: string;
  event_title: string;
  event_date: string;
  event_time: string;
  venue: string;
  city: string;
  event_image: string;
  ticket_count: number;
  total_amount: number;
  order_status: 'upcoming' | 'past' | 'cancelled';
  tickets: Ticket[];
  transfers: TransferRecord[];
}

const MOCK_ORDERS: Order[] = [
  // 1. Bruno Mars — Sep 23 — Alamodome, San Antonio TX — Section 111 Row 22 Seats 7-10 — 4 tickets
  {
    id: 'bruno-sept23',
    order_number: '51-884210/CA',
    event_title: 'Bruno Mars — The Romantic Tour',
    event_date: 'WED, SEP 23, 2026',
    event_time: '7:30 PM',
    venue: 'Alamodome',
    city: 'San Antonio, TX',
    event_image:
      'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
    ticket_count: 4,
    total_amount: 840,
    order_status: 'upcoming' as const,
    tickets: [
      { id: 't4', section: '111', row_label: 'Row 22', seat: '7', barcode: '012345678904' },
      { id: 't5', section: '111', row_label: 'Row 22', seat: '8', barcode: '012345678905' },
      { id: 't6', section: '111', row_label: 'Row 22', seat: '9', barcode: '012345678906' },
      { id: 't7', section: '111', row_label: 'Row 22', seat: '10', barcode: '012345678907' },
    ],
    transfers: [],
  },
  // 2. Rod Wave — Sep 26 — American Airlines Center, Dallas TX — Section 106 Row U Seats 11-14 — 4 tickets — 8:00 PM
  {
    id: 'rod-sept26',
    order_number: '51-774502/CA',
    event_title: "Rod Wave — Don't Look Down Tour",
    event_date: 'SAT, SEP 26, 2026',
    event_time: '8:00 PM',
    venue: 'American Airlines Center',
    city: 'Dallas, TX',
    event_image:
      'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    ticket_count: 4,
    total_amount: 640,
    order_status: 'upcoming' as const,
    tickets: [
      { id: 't8', section: '106', row_label: 'Row U', seat: '11', barcode: '012345678908' },
      { id: 't9', section: '106', row_label: 'Row U', seat: '12', barcode: '012345678909' },
      { id: 't10', section: '106', row_label: 'Row U', seat: '13', barcode: '012345678910' },
      { id: 't11', section: '106', row_label: 'Row U', seat: '14', barcode: '012345678911' },
    ],
    transfers: [],
  },
];

export default function MyAccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');
  const { user } = useAuth();

  // Always show mock orders — no Supabase, no auth gate
  const orders = MOCK_ORDERS;
  const loading = false;

  const upcomingOrders = orders.filter((o) => o.order_status === 'upcoming');
  const pastOrders = orders.filter(
    (o) => o.order_status === 'past' || o.order_status === 'cancelled'
  );
  const displayedOrders = activeTab === 'Upcoming' ? upcomingOrders : pastOrders;

  return (
    <div className="bg-black min-h-screen pb-24">
      <div className="px-4 pt-12 pb-6">
        <h1 className="text-white font-extrabold text-xl">My Tickets</h1>
        {user ? (
          <p className="text-white/50 text-xs mt-0.5">{user.email}</p>
        ) : (
          <Link href="/sign-up-login" className="text-white/50 text-xs">
            Sign In to view your tickets →
          </Link>
        )}
      </div>

      <div className="flex border-b border-white/10 px-4">
        {(['Upcoming', 'Past'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
              activeTab === tab ? 'text-white border-b-2 border-white' : 'text-white/40'
            }`}
          >
            {tab}
            {tab === 'Upcoming' && upcomingOrders.length > 0 && (
              <span className="ml-1.5 bg-[#026CDF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {upcomingOrders.length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-4">
        {displayedOrders.length > 0 &&
          displayedOrders.map((order) => (
            <div key={order.id} className="rounded-xl border border-white/10 overflow-hidden">
              <button
                className="w-full text-left"
                onClick={() => router.push(`/order-detail?event=${order.id}`)}
              >
                <div className="relative" style={{ height: '120px' }}>
                  <AppImage
                    src={order.event_image}
                    alt={`${order.event_title} event promotional image`}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${order.order_status === 'upcoming' ? 'bg-green-600' : 'bg-white/20'}`}
                    >
                      {order.order_status === 'upcoming' ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-sm leading-tight">
                      {order.event_title}
                    </p>
                  </div>
                </div>
                <div className="p-3.5 bg-[#111]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/40 text-xs">Order #{order.order_number}</p>
                    <p className="text-white/40 text-xs">
                      {order.ticket_count} Ticket{order.ticket_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs">
                    <svg
                      className="w-3.5 h-3.5 text-[#026CDF]"
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
                    {order.event_date} · {order.event_time}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs mt-1">
                    <svg
                      className="w-3.5 h-3.5 text-[#026CDF]"
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
                    {order.venue} — {order.city}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[#026CDF] font-bold text-xs">View Tickets →</span>
                    {order.order_status === 'upcoming' && (
                      <Link
                        href={`/ticket-transfer?event=${order.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5"
                      >
                        <svg
                          className="w-4 h-4 text-white/30"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        <span className="text-white/30 text-xs">Transfer</span>
                      </Link>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}

        {displayedOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="w-16 h-16 text-white/10 mb-4"
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
            <p className="text-white/40 text-sm">
              {activeTab === 'Upcoming' ? 'No upcoming events found.' : 'No past events found.'}
            </p>
          </div>
        )}
      </div>

      <MobileBottomNav />
    </div>
  );
}
