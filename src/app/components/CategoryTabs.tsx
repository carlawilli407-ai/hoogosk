'use client';
import React, { useState } from 'react';

const categories = [
  { label: 'All Events', icon: '🎫' },
  { label: 'Concerts', icon: '🎵' },
  { label: 'Sports', icon: '🏆' },
  { label: 'Arts & Theater', icon: '🎭' },
  { label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { label: 'Comedy', icon: '😂' },
  { label: 'Festivals', icon: '🎪' },
  { label: 'Other', icon: '✨' },
];

export default function CategoryTabs() {
  const [active, setActive] = useState('All Events');

  return (
    <section className="bg-white border-b border-border sticky top-[104px] z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {categories?.map((cat) => (
            <button
              key={cat?.label}
              onClick={() => setActive(cat?.label)}
              className={`category-tab flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition-all ${
                active === cat?.label
                  ? 'border-primary text-primary'
                  : 'border-transparent text-foreground/60 hover:text-foreground hover:border-border'
              }`}
            >
              <span>{cat?.icon}</span>
              <span>{cat?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
