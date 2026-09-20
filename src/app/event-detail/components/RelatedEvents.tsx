import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const related = [
  {
    title: 'Beyoncé — Renaissance World Tour',
    date: 'Fri, Apr 4, 2025',
    venue: 'MetLife Stadium · NJ',
    price: 'From $245',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_4e23d5649-1789742817482.png',
  },
  {
    title: 'Coldplay — Music of the Spheres',
    date: 'Thu, May 1, 2025',
    venue: 'Rose Bowl · Pasadena, CA',
    price: 'From $125',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1846ed5d5-1784913399764.png',
  },
  {
    title: 'Kendrick Lamar & SZA',
    date: 'Wed, Apr 23, 2025',
    venue: 'Allegiant Stadium · Las Vegas',
    price: 'From $149',
    image: 'https://images.unsplash.com/photo-1602866658306-2135b8704492',
  },
];

export default function RelatedEvents() {
  return (
    <section className="py-10 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-foreground mb-5">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related?.map((event, i) => (
            <Link key={i} href="/event-detail" className="group block">
              <div className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-all">
                <div className="relative overflow-hidden" style={{ height: '150px' }}>
                  <AppImage
                    src={event?.image}
                    alt={`${event?.title} related concert event promotional image`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-foreground leading-tight">
                    {event?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{event?.date}</p>
                  <p className="text-xs text-muted-foreground">{event?.venue}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-sm text-foreground">{event?.price}</span>
                    <span className="text-xs font-semibold text-primary group-hover:underline">
                      Find Tickets →
                    </span>
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
