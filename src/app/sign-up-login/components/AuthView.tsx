'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { useAuth } from '@/contexts/AuthContext';

function mapAuthError(message: string): string {
  const msg = message?.toLowerCase() || '';
  if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
    return 'Incorrect email or password. Please try again.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Please verify your email before signing in. Check your inbox for a confirmation link.';
  }
  if (msg.includes('user already registered') || msg.includes('already exists')) {
    return 'An account with this email already exists. Please sign in instead.';
  }
  if (msg.includes('password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (msg.includes('unable to validate email address')) {
    return 'Please enter a valid email address.';
  }
  if (msg.includes('email rate limit') || msg.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  return message || 'An error occurred. Please try again.';
}

export default function AuthView() {
  const router = useRouter();
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        router.push('/my-account');
        router.refresh();
      } else {
        const data = await signUp(email, password, { fullName: name });
        // Check if email confirmation is needed
        if (data?.user && !data?.session) {
          // Email confirmation required
          setSignUpSuccess(true);
        } else if (data?.session) {
          // Auto-confirmed (email confirmation disabled in Supabase)
          router.push('/my-account');
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(mapAuthError(err?.message || ''));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#026CDF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <AppLogo size={40} />
            <span className="font-bold text-2xl text-primary">ticketmaster</span>
          </div>
          <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-[#026CDF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold text-sm mb-1">Signed in as</p>
            <p className="text-gray-900 font-bold text-base mb-6">{user.email}</p>
            <Link
              href="/my-account"
              className="block w-full py-3.5 bg-primary text-white font-bold rounded-full text-sm text-center mb-3"
            >
              Go to My Tickets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Sign-up success — email confirmation pending
  if (signUpSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <AppLogo size={40} />
            <span className="font-bold text-2xl text-primary">ticketmaster</span>
          </div>
          <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-gray-900 font-bold text-xl mb-2">Check your email</h2>
            <p className="text-gray-600 text-sm mb-2">We sent a confirmation link to</p>
            <p className="text-primary font-semibold text-sm mb-4">{email}</p>
            <p className="text-gray-500 text-xs mb-6">
              Click the link in the email to activate your account. Check your spam folder if you
              don&apos;t see it.
            </p>
            <button
              onClick={() => {
                setSignUpSuccess(false);
                setMode('signin');
                setPassword('');
              }}
              className="block w-full py-3.5 bg-primary text-white font-bold rounded-full text-sm text-center"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AppLogo size={40} />
            <span className="font-bold text-2xl text-primary">ticketmaster</span>
          </div>
          <p className="text-muted-foreground text-sm">Your tickets to every live experience</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
          {/* Tabs */}
          <div className="flex rounded-xl border border-border overflow-hidden mb-6">
            <button
              onClick={() => {
                setMode('signin');
                setError('');
              }}
              className={`flex-1 py-3 text-sm font-bold transition-all ${mode === 'signin' ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`flex-1 py-3 text-sm font-bold transition-all ${mode === 'signup' ? 'bg-primary text-white' : 'text-foreground hover:bg-secondary'}`}
            >
              Create Account
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
              <svg
                className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="relative flex items-center mb-6">
            <div className="flex-1 border-t border-border" />
            <span className="px-3 text-xs text-muted-foreground bg-card">continue with email</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Johnson"
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.com"
                required
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {mode === 'signin' && (
              <div className="text-right">
                <Link href="/" className="text-xs font-semibold text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            {mode === 'signup' && (
              <p className="text-xs text-muted-foreground">
                By creating an account, you agree to our{' '}
                <Link href="/" className="text-primary hover:underline">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link href="/" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {mode === 'signin' ? 'Sign In to Your Account' : 'Create My Account'}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-5">
            {mode === 'signin' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signin');
                    setError('');
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Protected by reCAPTCHA ·{' '}
          <Link href="/" className="hover:underline">
            Privacy
          </Link>{' '}
          ·{' '}
          <Link href="/" className="hover:underline">
            Terms
          </Link>
        </p>
      </div>
    </div>
  );
}
