'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Concerts', href: '/' },
  { label: 'Sports', href: '/' },
  { label: 'Arts & Theater', href: '/' },
  { label: 'Family', href: '/' },
  { label: 'More', href: '/' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';
  const initials =
    displayName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
    router.push('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'header-scrolled' : ''
      }`}
      style={{ backgroundColor: '#0a0e1a' }}
    >
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <AppLogo size={32} />
          <span className="font-bold text-xl text-primary hidden sm:block tracking-tight">
            ticketmaster
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Search events, artists, teams, venues..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-all"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {user ? (
            /* Logged-in state */
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/my-account"
                className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <Icon name="TicketIcon" size={18} />
                <span>My Tickets</span>
              </Link>
              {/* User avatar dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full pl-1 pr-3 py-1"
                >
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-white text-sm font-medium max-w-[100px] truncate">
                    {displayName}
                  </span>
                  <Icon name="ChevronDownIcon" size={14} className="text-white/60" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1f2e] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white text-sm font-semibold truncate">{displayName}</p>
                      <p className="text-white/40 text-xs truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/my-account"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 text-sm transition-colors"
                    >
                      <Icon name="TicketIcon" size={16} />
                      My Tickets
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 text-sm transition-colors"
                    >
                      <Icon name="UserIcon" size={16} />
                      Account Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-red-400 hover:bg-white/5 text-sm transition-colors border-t border-white/10"
                    >
                      <Icon name="ArrowRightOnRectangleIcon" size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Logged-out state */
            <Link
              href="/sign-up-login"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-white hover:text-primary transition-colors"
            >
              <Icon name="UserIcon" size={18} />
              <span>Sign In</span>
            </Link>
          )}

          <Link
            href="/checkout"
            className="relative p-2 text-white hover:text-primary transition-colors"
          >
            <Icon name="ShoppingCartIcon" size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </Link>
          {/* Mobile menu */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      {/* Nav links */}
      <div className="border-t border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link?.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-light border-t border-white/10 px-4 py-4">
          <div className="mb-4">
            <div className="relative">
              <Icon
                name="MagnifyingGlassIcon"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-9 pr-4 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none"
              />
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link?.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{displayName}</p>
                      <p className="text-white/40 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/my-account"
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon name="TicketIcon" size={16} />
                    My Tickets
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon name="UserIcon" size={16} />
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-red-400 rounded-lg hover:bg-white/5"
                  >
                    <Icon name="ArrowRightOnRectangleIcon" size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-up-login"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon name="UserIcon" size={16} />
                  Sign In / Register
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
