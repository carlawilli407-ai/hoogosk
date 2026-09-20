'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import MobileBottomNav from '@/components/MobileBottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface SettingItem {
  label: string;
  icon: React.ReactNode;
  type: 'link' | 'toggle';
  value?: boolean;
  onToggle?: () => void;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [locationContent, setLocationContent] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/sign-up-login');
  };

  const sections: SettingSection[] = [
    {
      title: 'Personalization',
      items: [
        {
          label: 'My Inbox',
          type: 'link',
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          ),
        },
        {
          label: 'Favorites',
          type: 'link',
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          ),
        },
        {
          label: 'Location',
          type: 'link',
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Permissions',
      items: [
        {
          label: 'Location Content',
          type: 'toggle',
          value: locationContent,
          onToggle: () => setLocationContent((v) => !v),
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          ),
        },
        {
          label: 'Notifications',
          type: 'toggle',
          value: notifications,
          onToggle: () => setNotifications((v) => !v),
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          label: 'Edit Details',
          type: 'link',
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ),
        },
        {
          label: 'Security',
          type: 'link',
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ),
        },
        {
          label: 'Saved Payment Methods',
          type: 'link',
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Help & Guidance',
      items: [
        {
          label: 'Need Help?',
          type: 'link',
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        },
        {
          label: 'Give Us Feedback',
          type: 'link',
          icon: (
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  if (!user) {
    return (
      <div className="bg-black min-h-screen pb-24 flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full border-2 border-[#026CDF] bg-[#1a1a1a] flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <p className="text-white font-bold text-lg mb-1">Sign in to your account</p>
        <p className="text-white/40 text-sm mb-6 text-center">
          Access your tickets, watchlist, and settings
        </p>
        <Link
          href="/sign-up-login"
          className="bg-[#026CDF] text-white font-bold px-8 py-3 rounded-full text-sm"
        >
          Sign In
        </Link>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* User header */}
      <div className="px-4 pt-12 pb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-[#026CDF] bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-extrabold text-xl">{initials}</span>
        </div>
        <div>
          <h1 className="text-white font-extrabold text-xl leading-tight">{displayName}</h1>
          <p className="text-white/50 text-sm mt-0.5">{user.email}</p>
        </div>
      </div>

      {/* Settings sections */}
      <div className="px-4 flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-white font-bold text-base mb-3">{section.title}</h2>
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
              {section.items.map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-4 py-4 ${idx < section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <span className="flex-1 text-white text-sm font-medium">{item.label}</span>
                  {item.type === 'toggle' ? (
                    <button
                      onClick={item.onToggle}
                      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                        item.value ? 'bg-[#026CDF]' : 'bg-[#333]'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          item.value ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  ) : (
                    <svg
                      className="w-4 h-4 text-white/30 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full py-4 bg-[#1a1a1a] rounded-xl text-red-400 font-semibold text-sm"
        >
          Sign Out
        </button>
      </div>

      <MobileBottomNav />
    </div>
  );
}
