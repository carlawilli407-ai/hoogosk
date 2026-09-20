import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const trending = [
  {
    id: 1,
    title: 'Kendrick Lamar & SZA — Grand National Tour',
    date: 'Wed, Apr 23, 2025',
    venue: 'Allegiant Stadium · Las Vegas, NV',
    price: 'From $149',
    image: 'https://images.unsplash.com/photo-1600835044077-d6d68aef2ef1',
    rank: 1,
  },
  {
    id: 2,
    title: 'Taylor Swift — The Eras Tour',
    date: 'Sat, Mar 15, 2025',
    venue: 'SoFi Stadium · Los Angeles, CA',
    price: 'From $189',
    image: 'https://images.unsplash.com/photo-1644291833042-1361b57de761',
    rank: 2,
  },
  {
    id: 3,
    title: 'Super Bowl LIX',
    date: 'Sun, Feb 9, 2025',
    venue: 'Caesars Superdome · New Orleans, LA',
    price: 'From $4,500',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_4c084fe9f-1789742817680.png',
    rank: 3,
  },
  {
    id: 4,
    title: 'Beyoncé — Renaissance World Tour',
    date: 'Fri, Apr 4, 2025',
    venue: 'MetLife Stadium · East Rutherford, NJ',
    price: 'From $245',
    image: 'https://images.unsplash.com/photo-1617496184656-c4b52e30205b',
    rank: 4,
  },
];

export default function TrendingSection() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-2xl font-bold text-foreground">Trending Near You</h2>
          </div>
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            View All →
          </Link>
        </div>

        <div className="space-y-3">
          {trending?.map((event) => (
            <Link key={event?.id} href="/event-detail" className="group block">
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition-all">
                <span className="text-3xl font-extrabold text-muted-foreground/30 w-8 text-center shrink-0">
                  {event?.rank}
                </span>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <AppImage
                    src={event?.image}
                    alt={`${event?.title} trending event thumbnail`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {event?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{event?.date}</p>
                  <p className="text-xs text-muted-foreground truncate">{event?.venue}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-bold text-sm text-foreground">{event?.price}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Tickets
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
