import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const newEvents = [
  {
    id: 9,
    title: 'UFC 310',
    date: 'Sat, Apr 12, 2025',
    venue: 'T-Mobile Arena',
    city: 'Las Vegas, NV',
    price: 'From $175',
    image:
      'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop',
    category: 'Sports',
  },
  {
    id: 10,
    title: 'Cirque du Soleil — Alegría',
    date: 'Fri, Mar 21, 2025',
    venue: 'Staples Center',
    city: 'Los Angeles, CA',
    price: 'From $55',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_49ef876e7-1789742817441.png',
    category: 'Family',
  },
  {
    id: 11,
    title: 'Post Malone World Tour',
    date: 'Fri, Jun 6, 2025',
    venue: 'Barclays Center',
    city: 'Brooklyn, NY',
    price: 'From $95',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop',
    category: 'Concerts',
  },
  {
    id: 12,
    title: 'Billie Eilish — Hit Me Hard Tour',
    date: 'Tue, May 20, 2025',
    venue: 'Madison Square Garden',
    city: 'New York, NY',
    price: 'From $110',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_4c26da6d8-1789742817889.png',
    category: 'Concerts',
  },
];

export default function JustAnnounced() {
  return (
    <section className="py-12 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h2 className="text-2xl font-bold text-foreground">Just Announced</h2>
          </div>
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            See All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newEvents?.map((event) => (
            <Link key={event?.id} href="/event-detail" className="group block">
              <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="relative overflow-hidden" style={{ height: '140px' }}>
                  <AppImage
                    src={event?.image}
                    alt={`${event?.title} newly announced event at ${event?.venue}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                      New
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {event?.category}
                  </span>
                  <h3 className="font-bold text-sm text-foreground mt-0.5 leading-tight">
                    {event?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{event?.date}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {event?.venue} · {event?.city}
                  </p>
                  <p className="font-bold text-sm text-foreground mt-2">{event?.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
