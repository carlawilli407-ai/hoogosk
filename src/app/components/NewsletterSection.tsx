'use client';
import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16 bg-navy">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-3">Never Miss a Show</h2>
        <p className="text-white/60 mb-8 text-sm">
          Get personalized alerts for your favorite artists, teams, and venues. Be first in line
          when tickets drop.
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            You&apos;re on the list! We&apos;ll notify you of upcoming events.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary text-sm"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-colors text-sm shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
