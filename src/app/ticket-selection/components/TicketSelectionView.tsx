'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface TicketOption {
  id: string;
  section: string;
  row: string;
  seats: string;
  price: number;
  type: 'standard' | 'resale' | 'vip';
  available: number;
}

const allTickets: TicketOption[] = [
  {
    id: 't1',
    section: 'Floor A',
    row: 'Row 3',
    seats: '15-16',
    price: 189,
    type: 'standard',
    available: 4,
  },
  {
    id: 't2',
    section: 'Floor B',
    row: 'Row 7',
    seats: '22-23',
    price: 189,
    type: 'standard',
    available: 6,
  },
  {
    id: 't3',
    section: 'Section A1',
    row: 'Row C',
    seats: '1-2',
    price: 225,
    type: 'standard',
    available: 8,
  },
  {
    id: 't4',
    section: 'Section A2',
    row: 'Row D',
    seats: '11-12',
    price: 225,
    type: 'standard',
    available: 4,
  },
  {
    id: 't5',
    section: 'Section B2',
    row: 'Row B',
    seats: '5-6',
    price: 175,
    type: 'standard',
    available: 10,
  },
  {
    id: 't6',
    section: 'Section B4',
    row: 'Row A',
    seats: '8-9',
    price: 165,
    type: 'standard',
    available: 6,
  },
  {
    id: 't7',
    section: 'Section C1',
    row: 'Row F',
    seats: '20-21',
    price: 149,
    type: 'standard',
    available: 12,
  },
  {
    id: 't8',
    section: 'Section C3',
    row: 'Row E',
    seats: '3-4',
    price: 149,
    type: 'standard',
    available: 8,
  },
  {
    id: 't9',
    section: 'Section A3',
    row: 'Row B',
    seats: '7-8',
    price: 310,
    type: 'resale',
    available: 2,
  },
  {
    id: 't10',
    section: 'Section C2',
    row: 'Row D',
    seats: '14-15',
    price: 280,
    type: 'resale',
    available: 4,
  },
  {
    id: 't11',
    section: 'VIP Suite 1',
    row: 'Suite',
    seats: '1-2',
    price: 450,
    type: 'vip',
    available: 4,
  },
  {
    id: 't12',
    section: 'VIP Suite 2',
    row: 'Suite',
    seats: '3-4',
    price: 495,
    type: 'vip',
    available: 2,
  },
];

export default function TicketSelectionView() {
  const [quantity, setQuantity] = useState(2);
  const [priceMax, setPriceMax] = useState(500);
  const [activeType, setActiveType] = useState<'all' | 'standard' | 'resale' | 'vip'>('all');
  const [selectedTicket, setSelectedTicket] = useState<TicketOption | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc'>('price-asc');

  const filtered = allTickets
    .filter((t) => t.price <= priceMax && (activeType === 'all' || t.type === activeType))
    .sort((a, b) => (sortBy === 'price-asc' ? a.price - b.price : b.price - a.price));

  const serviceFee = selectedTicket ? Math.round(selectedTicket.price * 0.27 * quantity) : 0;
  const orderFee = 4.95;
  const subtotal = selectedTicket ? selectedTicket.price * quantity : 0;
  const total = subtotal + serviceFee + orderFee;

  return (
    <div className="min-h-screen bg-background">
      {/* Event banner */}
      <div className="bg-navy py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-white font-bold text-lg">Taylor Swift — The Eras Tour</h1>
            <p className="text-white/60 text-sm">
              Sat, Mar 15, 2025 · 7:00 PM · SoFi Stadium, Los Angeles, CA
            </p>
          </div>
          <Link href="/event-detail" className="text-sm text-primary hover:underline font-medium">
            ← Back to Event
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-32">
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
                Filters
              </h3>

              {/* Quantity */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                  Quantity
                </label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuantity(q)}
                      className={`w-9 h-9 rounded-lg text-sm font-bold border transition-all ${
                        quantity === q
                          ? 'bg-primary text-white border-primary'
                          : 'border-border text-foreground hover:border-primary/50'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                  Max Price: <span className="text-foreground font-bold">${priceMax}</span>
                </label>
                <input
                  type="range"
                  min={50}
                  max={500}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$50</span>
                  <span>$500+</span>
                </div>
              </div>

              {/* Ticket Type */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                  Ticket Type
                </label>
                <div className="space-y-2">
                  {(['all', 'standard', 'resale', 'vip'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                        activeType === type
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'border-border text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          type === 'standard'
                            ? 'bg-primary'
                            : type === 'resale'
                              ? 'bg-pink-500'
                              : type === 'vip'
                                ? 'bg-amber-500'
                                : 'bg-foreground/40'
                        }`}
                      />
                      {type === 'all'
                        ? 'All Types'
                        : type === 'resale'
                          ? 'Verified Resale'
                          : type === 'vip'
                            ? 'VIP Packages'
                            : 'Standard'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc')}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ticket list */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground font-medium">
                <span className="font-bold text-foreground">{filtered.length}</span> ticket options
                available
              </p>
            </div>

            <div className="space-y-3">
              {filtered.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() =>
                    setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)
                  }
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedTicket?.id === ticket.id
                      ? 'border-primary bg-blue-50'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 ${
                          ticket.type === 'resale'
                            ? 'bg-pink-500'
                            : ticket.type === 'vip'
                              ? 'bg-amber-500'
                              : 'bg-primary'
                        }`}
                      />
                      <div>
                        <p className="font-bold text-foreground text-sm">{ticket.section}</p>
                        <p className="text-xs text-muted-foreground">
                          {ticket.row} · Seats {ticket.seats}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {ticket.type === 'resale' && (
                            <span className="px-1.5 py-0.5 bg-pink-100 text-pink-700 text-xs font-semibold rounded">
                              🔄 Verified Resale
                            </span>
                          )}
                          {ticket.type === 'vip' && (
                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                              ⭐ VIP Package
                            </span>
                          )}
                          {ticket.available <= 4 && (
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                              Only {ticket.available} left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-extrabold text-foreground text-lg">${ticket.price}</p>
                      <p className="text-xs text-muted-foreground">per ticket</p>
                      <p className="text-xs text-muted-foreground">+fees</p>
                    </div>
                  </div>
                </button>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="font-semibold">No tickets match your filters</p>
                  <p className="text-sm mt-1">Try adjusting your price range or ticket type</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-32">
              <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
                Order Summary
              </h3>

              {selectedTicket ? (
                <>
                  <div className="bg-secondary rounded-xl p-4 mb-4">
                    <p className="font-bold text-foreground text-sm">{selectedTicket.section}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTicket.row} · Seats {selectedTicket.seats}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {quantity} ticket{quantity > 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm border-b border-border pb-3 mb-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{quantity}x Ticket(s)</span>
                      <span className="font-medium text-foreground">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium text-foreground">${serviceFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Processing</span>
                      <span className="font-medium text-foreground">${orderFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-extrabold text-foreground text-base mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full py-3.5 bg-primary text-white font-bold rounded-full text-center hover:bg-blue-700 transition-colors text-sm"
                  >
                    Checkout →
                  </Link>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Tickets held for 8:00 minutes
                  </p>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <svg
                    className="w-10 h-10 mx-auto mb-3 opacity-30"
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
                  <p className="text-sm font-medium">Select tickets to see your order summary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
