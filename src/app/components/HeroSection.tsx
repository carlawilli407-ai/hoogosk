'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const heroEvents = [
  {
    id: 1,
    title: 'Taylor Swift',
    subtitle: 'The Eras Tour',
    date: 'Sat, Mar 15, 2025',
    venue: 'SoFi Stadium',
    city: 'Los Angeles, CA',
    price: 'From $189',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop',
    badge: 'Selling Fast',
    badgeColor: 'selling-fast-badge',
  },
  {
    id: 2,
    title: 'Beyoncé',
    subtitle: 'Renaissance World Tour',
    date: 'Fri, Apr 4, 2025',
    venue: 'MetLife Stadium',
    city: 'East Rutherford, NJ',
    price: 'From $245',
    image:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop',
    badge: 'Hot',
    badgeColor: 'selling-fast-badge',
  },
  {
    id: 3,
    title: 'Coldplay',
    subtitle: 'Music of the Spheres Tour',
    date: 'Thu, May 1, 2025',
    venue: 'Rose Bowl',
    city: 'Pasadena, CA',
    price: 'From $125',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10d29f3cb-1779015401678.png',
    badge: 'Just Announced',
    badgeColor: 'bg-primary',
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroEvents?.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = heroEvents?.[active];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: '520px' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <AppImage
          src={current?.image}
          alt={`${current?.title} ${current?.subtitle} concert performance in dark atmospheric venue`}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(10,14,26,0.95) 40%, rgba(10,14,26,0.6) 70%, rgba(10,14,26,0.3) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,14,26,0.8) 0%, transparent 50%)' }}
        />
      </div>

      {/* Atmospheric blobs */}
      <div className="hero-blob-1 absolute top-10 left-1/4 pointer-events-none" />
      <div className="hero-blob-2 absolute bottom-0 right-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-xl">
          {/* Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white mb-4 ${current?.badgeColor}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            {current?.badge}
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-2">
            {current?.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-white/70 mb-6">{current?.subtitle}</p>

          <div className="flex flex-col gap-1.5 mb-8">
            <div className="flex items-center gap-2 text-white/80 text-sm">
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
              {current?.date}
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {current?.venue} · {current?.city}
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="price-highlight">{current?.price}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/event-detail"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              Find Tickets
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/event-detail"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all text-sm"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-10">
          {heroEvents?.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-full ${i === active ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/30'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
