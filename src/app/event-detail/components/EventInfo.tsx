import React from 'react';

export default function EventInfo() {
  return (
    <section className="py-8 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* About */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-foreground mb-4">About This Event</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <p>
              Taylor Swift&apos;s record-breaking Eras Tour returns to Los Angeles for an
              unforgettable night at SoFi Stadium. Journey through every era of Taylor's musical
              career — from her country roots to her pop domination — in a spectacular 3+ hour show
              packed with 44 songs, stunning visuals, and surprise guests.
            </p>
            <p className="mt-3">
              This tour has already broken multiple records including the highest-grossing concert
              tour of all time. Don't miss your chance to be part of music history. Friendship
              bracelets encouraged!
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Duration', value: '3+ Hours' },
              { label: 'Age Limit', value: 'All Ages' },
              { label: 'Doors Open', value: '5:00 PM' },
              { label: 'Show Start', value: '7:00 PM' },
            ]?.map((item) => (
              <div key={item?.label} className="text-center p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {item?.label}
                </p>
                <p className="font-bold text-foreground text-sm mt-1">{item?.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Venue */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Venue</h2>
          <div className="bg-secondary rounded-xl p-5">
            <h3 className="font-bold text-foreground">SoFi Stadium</h3>
            <p className="text-sm text-muted-foreground mt-1">1001 Stadium Dr</p>
            <p className="text-sm text-muted-foreground">Inglewood, CA 90301</p>
            <div className="mt-4 bg-muted rounded-lg overflow-hidden" style={{ height: '140px' }}>
              <div className="w-full h-full flex items-center justify-center bg-blue-50 text-muted-foreground text-sm">
                <div className="text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 text-primary/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <span className="text-xs">Map View</span>
                </div>
              </div>
            </div>
            <a href="/" className="block mt-3 text-sm font-semibold text-primary hover:underline">
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
