'use client';
import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const events = [
  {
    id: 1,
    title: 'Taylor Swift — The Eras Tour',
    date: 'Sat, Mar 15, 2025',
    time: '7:00 PM',
    venue: 'SoFi Stadium',
    city: 'Los Angeles, CA',
    price: 'From $189',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_412827fdf-1789742818127.png',
    badge: 'Selling Fast',
    badgeType: 'danger',
    category: 'Concerts',
  },
  {
    id: 2,
    title: 'Beyoncé — Renaissance World Tour',
    date: 'Fri, Apr 4, 2025',
    time: '8:00 PM',
    venue: 'MetLife Stadium',
    city: 'East Rutherford, NJ',
    price: 'From $245',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_4e23d5649-1789742817482.png',
    badge: 'VIP Available',
    badgeType: 'gold',
    category: 'Concerts',
  },
  {
    id: 3,
    title: 'Lakers vs Golden State Warriors',
    date: 'Sun, Mar 23, 2025',
    time: '6:30 PM',
    venue: 'Crypto.com Arena',
    city: 'Los Angeles, CA',
    price: 'From $89',
    image: 'https://images.unsplash.com/photo-1640862101983-9f7ef7fd7cc9',
    badge: null,
    badgeType: null,
    category: 'Sports',
  },
  {
    id: 4,
    title: 'Hamilton — The Musical',
    date: 'Various Dates',
    time: '7:30 PM',
    venue: 'Pantages Theatre',
    city: 'Los Angeles, CA',
    price: 'From $79',
    image:
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop',
    badge: null,
    badgeType: null,
    category: 'Arts & Theater',
  },
  {
    id: 5,
    title: 'Super Bowl LIX',
    date: 'Sun, Feb 9, 2025',
    time: '6:30 PM',
    venue: 'Caesars Superdome',
    city: 'New Orleans, LA',
    price: 'From $4,500',
    image:
      'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=800&auto=format&fit=crop',
    badge: 'Low Inventory',
    badgeType: 'danger',
    category: 'Sports',
  },
  {
    id: 6,
    title: 'Coldplay — Music of the Spheres',
    date: 'Thu, May 1, 2025',
    time: '7:00 PM',
    venue: 'Rose Bowl',
    city: 'Pasadena, CA',
    price: 'From $125',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1846ed5d5-1784913399764.png',
    badge: 'Just Announced',
    badgeType: 'primary',
    category: 'Concerts',
  },
  {
    id: 7,
    title: 'Dave Chappelle Stand-Up',
    date: 'Sat, Mar 8, 2025',
    time: '9:00 PM',
    venue: 'The Forum',
    city: 'Inglewood, CA',
    price: 'From $65',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop',
    badge: null,
    badgeType: null,
    category: 'Comedy',
  },
  {
    id: 8,
    title: 'Kendrick Lamar & SZA — Grand National',
    date: 'Wed, Apr 23, 2025',
    time: '7:30 PM',
    venue: 'Allegiant Stadium',
    city: 'Las Vegas, NV',
    price: 'From $149',
    image: 'https://images.unsplash.com/photo-1696791018753-ac8e10533e49',
    badge: 'Selling Fast',
    badgeType: 'danger',
    category: 'Concerts',
  },
];

const badgeClasses: Record<string, string> = {
  danger: 'bg-red-600 text-white',
  gold: 'bg-amber-500 text-white',
  primary: 'bg-primary text-white',
};

export default function FeaturedEvents() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Events</h2>
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((event) => (
            <Link key={event.id} href="/event-detail" className="group block">
              <div className="event-card-hover rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '180px' }}>
                  <AppImage
                    src={event.image}
                    alt={`${event.title} event promotional image at ${event.venue}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {event.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${badgeClasses[event.badgeType!]}`}
                    >
                      {event.badge}
                    </span>
                  )}
                  <div className="event-card-overlay absolute inset-0 bg-navy/60 flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-primary text-white font-bold rounded-full text-sm">
                      Find Tickets
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {event.category}
                  </span>
                  <h3 className="font-bold text-foreground text-sm mt-1 leading-tight line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {event.date} · {event.time}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {event.venue} · {event.city}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground">{event.price}</span>
                    <span className="text-xs text-muted-foreground">+fees</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
