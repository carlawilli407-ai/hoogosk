import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const footerLinks = [
  {
    group: [
      { label: 'Help Center', href: '/' },
      { label: 'Contact Us', href: '/' },
      { label: 'COVID-19 Policy', href: '/' },
    ],
  },
  {
    group: [
      { label: 'About', href: '/' },
      { label: 'Press', href: '/' },
      { label: 'Careers', href: '/' },
    ],
  },
  {
    group: [
      { label: 'Privacy Policy', href: '/' },
      { label: 'Terms of Use', href: '/' },
      { label: 'Accessibility', href: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 pt-12 pb-8">
      {/* Top row */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-x-12 gap-y-6 justify-between">
          <div className="flex items-center gap-2">
            <AppLogo size={28} />
            <span className="font-bold text-lg text-primary">ticketmaster</span>
          </div>
          {footerLinks?.map((section, i) => (
            <div key={i} className="flex gap-8">
              {section?.group?.map((link) => (
                <Link
                  key={link?.label}
                  href={link?.href}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Bottom row */}
      <div className="max-w-7xl mx-auto px-4 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-white/40">
          © {new Date()?.getFullYear()} TicketMaster. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            Do Not Sell My Info
          </Link>
          <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            Advertise
          </Link>
        </div>
      </div>
    </footer>
  );
}
