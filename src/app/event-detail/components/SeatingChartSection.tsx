'use client';
import React, { useState } from 'react';
import Link from 'next/link';

type SeatType = 'available' | 'sold' | 'resale' | 'vip' | 'selected';

interface Section {
  id: string;
  label: string;
  type: SeatType;
  price: string;
  seats: number;
}

const sections: Section[] = [
  { id: 'floor', label: 'Floor', type: 'available', price: '$189', seats: 42 },
  { id: 'a1', label: 'A1', type: 'available', price: '$225', seats: 18 },
  { id: 'a2', label: 'A2', type: 'available', price: '$225', seats: 24 },
  { id: 'a3', label: 'A3', type: 'resale', price: '$310', seats: 8 },
  { id: 'a4', label: 'A4', type: 'sold', price: '-', seats: 0 },
  { id: 'b1', label: 'B1', type: 'vip', price: '$450', seats: 12 },
  { id: 'b2', label: 'B2', type: 'available', price: '$175', seats: 35 },
  { id: 'b3', label: 'B3', type: 'sold', price: '-', seats: 0 },
  { id: 'b4', label: 'B4', type: 'available', price: '$165', seats: 28 },
  { id: 'c1', label: 'C1', type: 'available', price: '$149', seats: 52 },
  { id: 'c2', label: 'C2', type: 'resale', price: '$280', seats: 6 },
  { id: 'c3', label: 'C3', type: 'available', price: '$149', seats: 44 },
  { id: 'c4', label: 'C4', type: 'sold', price: '-', seats: 0 },
];

const fillMap: Record<SeatType, string> = {
  available: '#026CDF',
  sold: '#9ca3af',
  resale: '#ec4899',
  vip: '#f59e0b',
  selected: '#16a34a',
};

const typeLabel: Record<SeatType, string> = {
  available: 'Available',
  sold: 'Sold Out',
  resale: 'Resale',
  vip: 'VIP',
  selected: 'Selected',
};

export default function SeatingChartSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(2);
  const [activeTab, setActiveTab] = useState<'standard' | 'resale' | 'vip'>('standard');

  const selectedSection = sections.find((s) => s.id === selected);

  const ticketOptions = sections
    .filter((s) => {
      if (activeTab === 'resale') return s.type === 'resale';
      if (activeTab === 'vip') return s.type === 'vip';
      return s.type === 'available';
    })
    .sort((a, b) => parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', '')));

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-foreground mb-6">Select Your Seats</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Seating Chart */}
          <div className="lg:col-span-3">
            <div className="bg-secondary rounded-2xl p-6 border border-border">
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mb-5 text-xs">
                {(['available', 'sold', 'resale', 'vip'] as SeatType[]).map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: fillMap[t] }} />
                    <span className="text-muted-foreground font-medium">{typeLabel[t]}</span>
                  </div>
                ))}
              </div>

              {/* SVG Stadium */}
              <div className="flex items-center justify-center">
                <svg
                  viewBox="0 0 400 360"
                  className="w-full max-w-md"
                  style={{ maxHeight: '360px' }}
                >
                  {/* Stage */}
                  <rect
                    x="150"
                    y="20"
                    width="100"
                    height="40"
                    rx="6"
                    fill="#1a2035"
                    stroke="#026CDF"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="45"
                    textAnchor="middle"
                    fill="#026CDF"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    STAGE
                  </text>

                  {/* Floor */}
                  <rect
                    x="130"
                    y="75"
                    width="140"
                    height="60"
                    rx="4"
                    fill={
                      selected === 'floor'
                        ? fillMap.selected
                        : fillMap[sections.find((s) => s.id === 'floor')!.type]
                    }
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setSelected(selected === 'floor' ? null : 'floor')}
                    stroke={selected === 'floor' ? '#16a34a' : 'transparent'}
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="108"
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    FLOOR
                  </text>

                  {/* A sections */}
                  {[
                    { id: 'a1', x: 60, y: 75, w: 60, h: 35 },
                    { id: 'a2', x: 280, y: 75, w: 60, h: 35 },
                    { id: 'a3', x: 60, y: 120, w: 60, h: 35 },
                    { id: 'a4', x: 280, y: 120, w: 60, h: 35 },
                  ].map((sec) => {
                    const s = sections.find((x) => x.id === sec.id)!;
                    return (
                      <g key={sec.id}>
                        <rect
                          x={sec.x}
                          y={sec.y}
                          width={sec.w}
                          height={sec.h}
                          rx="4"
                          fill={selected === sec.id ? fillMap.selected : fillMap[s.type]}
                          className={s.type !== 'sold' ? 'cursor-pointer' : ''}
                          onClick={() =>
                            s.type !== 'sold' && setSelected(selected === sec.id ? null : sec.id)
                          }
                          stroke={selected === sec.id ? '#16a34a' : 'transparent'}
                          strokeWidth="2"
                          opacity={s.type === 'sold' ? 0.6 : 1}
                        />
                        <text
                          x={sec.x + sec.w / 2}
                          y={sec.y + sec.h / 2 + 4}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                          fontWeight="bold"
                          pointerEvents="none"
                        >
                          {s.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* B sections */}
                  {[
                    { id: 'b1', x: 20, y: 160, w: 70, h: 35 },
                    { id: 'b2', x: 100, y: 160, w: 80, h: 35 },
                    { id: 'b3', x: 220, y: 160, w: 80, h: 35 },
                    { id: 'b4', x: 310, y: 160, w: 70, h: 35 },
                  ].map((sec) => {
                    const s = sections.find((x) => x.id === sec.id)!;
                    return (
                      <g key={sec.id}>
                        <rect
                          x={sec.x}
                          y={sec.y}
                          width={sec.w}
                          height={sec.h}
                          rx="4"
                          fill={selected === sec.id ? fillMap.selected : fillMap[s.type]}
                          className={s.type !== 'sold' ? 'cursor-pointer' : ''}
                          onClick={() =>
                            s.type !== 'sold' && setSelected(selected === sec.id ? null : sec.id)
                          }
                          stroke={selected === sec.id ? '#16a34a' : 'transparent'}
                          strokeWidth="2"
                          opacity={s.type === 'sold' ? 0.6 : 1}
                        />
                        <text
                          x={sec.x + sec.w / 2}
                          y={sec.y + sec.h / 2 + 4}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                          fontWeight="bold"
                          pointerEvents="none"
                        >
                          {s.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* C sections */}
                  {[
                    { id: 'c1', x: 20, y: 205, w: 80, h: 35 },
                    { id: 'c2', x: 110, y: 205, w: 80, h: 35 },
                    { id: 'c3', x: 210, y: 205, w: 80, h: 35 },
                    { id: 'c4', x: 300, y: 205, w: 80, h: 35 },
                  ].map((sec) => {
                    const s = sections.find((x) => x.id === sec.id)!;
                    return (
                      <g key={sec.id}>
                        <rect
                          x={sec.x}
                          y={sec.y}
                          width={sec.w}
                          height={sec.h}
                          rx="4"
                          fill={selected === sec.id ? fillMap.selected : fillMap[s.type]}
                          className={s.type !== 'sold' ? 'cursor-pointer' : ''}
                          onClick={() =>
                            s.type !== 'sold' && setSelected(selected === sec.id ? null : sec.id)
                          }
                          stroke={selected === sec.id ? '#16a34a' : 'transparent'}
                          strokeWidth="2"
                          opacity={s.type === 'sold' ? 0.6 : 1}
                        />
                        <text
                          x={sec.x + sec.w / 2}
                          y={sec.y + sec.h / 2 + 4}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                          fontWeight="bold"
                          pointerEvents="none"
                        >
                          {s.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Upper sections arc */}
                  <path
                    d="M 20 250 Q 200 310 380 250"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                  />
                  {[
                    { x: 20, y: 255, w: 55, label: 'U1' },
                    { x: 85, y: 265, w: 55, label: 'U2' },
                    { x: 150, y: 270, w: 60, label: 'U3' },
                    { x: 220, y: 265, w: 55, label: 'U4' },
                    { x: 285, y: 255, w: 55, label: 'U5' },
                  ].map((sec) => (
                    <g key={sec.label}>
                      <rect
                        x={sec.x}
                        y={sec.y}
                        width={sec.w}
                        height={28}
                        rx="4"
                        fill="#9ca3af"
                        opacity="0.5"
                      />
                      <text
                        x={sec.x + sec.w / 2}
                        y={sec.y + 18}
                        textAnchor="middle"
                        fill="white"
                        fontSize="9"
                        pointerEvents="none"
                      >
                        {sec.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Selected info */}
              {selectedSection && (
                <div className="mt-4 p-4 bg-blue-50 border border-primary/30 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-primary">
                      Section {selectedSection.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedSection.seats} tickets available
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{selectedSection.price}</p>
                    <p className="text-xs text-muted-foreground">per ticket</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ticket Panel */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-32">
              <h3 className="font-bold text-foreground mb-4">Ticket Options</h3>

              {/* Quantity */}
              <div className="flex items-center justify-between mb-4 p-3 bg-secondary rounded-xl">
                <span className="text-sm font-medium text-foreground">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground font-bold"
                  >
                    −
                  </button>
                  <span className="font-bold text-foreground w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(8, quantity + 1))}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border mb-4">
                {(['standard', 'resale', 'vip'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-xs font-semibold capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === 'resale' ? '🔄 Resale' : tab === 'vip' ? '⭐ VIP' : 'Standard'}
                  </button>
                ))}
              </div>

              {/* Ticket list */}
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {ticketOptions.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelected(ticket.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selected === ticket.id
                        ? 'ticket-card-selected border-primary'
                        : 'border-border hover:border-primary/40 hover:bg-secondary'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          Section {ticket.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Row C · Seats {Math.floor(Math.random() * 20) + 1}-
                          {Math.floor(Math.random() * 20) + 21}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{ticket.price}</p>
                        <p className="text-xs text-muted-foreground">each</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Add to cart */}
              {selected && selectedSection && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      {quantity}x Section {selectedSection.label}
                    </span>
                    <span className="font-semibold text-foreground">
                      $
                      {(
                        parseInt(selectedSection.price.replace('$', '')) * quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href="/ticket-selection"
                    className="block w-full mt-3 py-3.5 bg-primary text-white font-bold rounded-full text-center hover:bg-blue-700 transition-colors text-sm"
                  >
                    Add to Cart
                  </Link>
                </div>
              )}
              {!selected && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Click a section on the map or select from the list above
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
