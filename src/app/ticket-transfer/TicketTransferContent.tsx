'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppImage from '@/components/ui/AppImage';

type TransferStep =
  'select-tickets' | 'transfer-to' | 'recipient-details' | 'authenticate' | 'success';

interface SeatInfo {
  id: string;
  label: string;
  seat: string;
  section: string;
  row: string;
}

interface EventInfo {
  id: string;
  title: string;
  artist: string;
  tour: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  email: string;
  image: string;
  tickets: { id: string; section: string; row: string; seat: string }[];
}

const TICKET_STUB_BADGE = (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2 12h18M4 12v-4a2 2 0 012-2h10a2 2 0 012 2v4M4 12v4a2 2 0 002 2h10a2 2 0 002-2v-4m0 0V7m0 5H6m10 0h2m-6 0h2m-4 0h2"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 8.5v7m0 0v7m0-7h16v7m0-3a2 2 0 01-2 2H6a2 2 0 01-2-2v-2"
    />
  </svg>
);

const EVENT_DATA: Record<string, EventInfo> = {
  'bruno-sept23': {
    id: 'bruno-sept23',
    artist: 'BRUNO MARS',
    tour: 'THE ROMANTIC TOUR',
    title: 'BRUNO MARS — THE ROMANTIC TOUR',
    date: 'WED, SEP 23, 2026',
    time: '7:30 PM',
    venue: 'Alamodome',
    city: 'San Antonio, TX',
    email: 'sandrawilli4042@gmail.com',
    image:
      'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
    tickets: [
      { id: '1', section: '111', row: '22', seat: '7' },
      { id: '2', section: '111', row: '22', seat: '8' },
      { id: '3', section: '111', row: '22', seat: '9' },
      { id: '4', section: '111', row: '22', seat: '10' },
    ],
  },
  'rod-sept26': {
    id: 'rod-sept26',
    artist: 'ROD WAVE',
    tour: "DON'T LOOK DOWN TOUR",
    title: "ROD WAVE — DON'T LOOK DOWN TOUR",
    date: 'SAT, SEP 26, 2026',
    time: '8:00 PM',
    venue: 'American Airlines Center',
    city: 'Dallas, TX',
    email: 'sandrawilli4042@gmail.com',
    image:
      'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    tickets: [
      { id: '1', section: '106', row: 'U', seat: '11' },
      { id: '2', section: '106', row: 'U', seat: '12' },
      { id: '3', section: '106', row: 'U', seat: '13' },
      { id: '4', section: '106', row: 'U', seat: '14' },
    ],
  },
};

function TicketTransferContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<TransferStep>('select-tickets');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', note: '' });
  const [useMobile, setUseMobile] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  // Derive the active event directly from the URL so the very first render
  // (and therefore the background image + seat list) matches the requested
  // event instead of flashing a default.
  const initialEventKey = searchParams.get('event');
  const eventKey =
    initialEventKey && EVENT_DATA[initialEventKey] ? initialEventKey : 'bruno-sept23';
  const event = EVENT_DATA[eventKey] || EVENT_DATA['bruno-sept23'];
  const accountEmail = event.email;
  const SEATS: SeatInfo[] = event.tickets.map((t, i) => ({
    id: `seat-${i}-${t.seat}`,
    label: `SEAT ${t.seat}`,
    seat: t.seat,
    section: t.section,
    row: t.row,
  }));

  const totalTickets = SEATS.length;

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirmCode = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep('success');
  };

  // When entering the authentication step, show a 5-second "authenticating"
  // loader before revealing the one-time-code input.
  useEffect(() => {
    if (step === 'authenticate') {
      setAuthReady(false);
      const timer = setTimeout(() => setAuthReady(true), 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [step]);

  // ── SUCCESS ──
  if (step === 'success') {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-gray-900 font-extrabold text-xl mb-2">Transfer Sent!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Your ticket{selectedSeats.length > 1 ? 's have' : ' has'} been sent to{' '}
          {form.email || mobileNumber}. They&apos;ll receive a notification to accept the transfer.
        </p>
        <button
          onClick={() => router.push(`/order-detail?event=${eventKey}`)}
          className="bg-black text-white font-bold px-8 py-3.5 rounded-xl text-sm"
        >
          Back to My Tickets
        </button>
      </div>
    );
  }

  // ── AUTHENTICATE ──
  if (step === 'authenticate') {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <div className="bg-[#026CDF] px-5 py-4 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setStep('recipient-details')}
            className="text-white font-semibold text-sm"
          >
            Cancel
          </button>
          <span className="text-white font-bold text-base">Authentication</span>
          <div className="w-14" />
        </div>
        <div className="flex-1 px-5 pt-8 pb-6 flex flex-col items-center">
          {!authReady ? (
            <>
              <h1 className="text-gray-900 font-extrabold text-2xl leading-tight mb-4">
                Authenticating Your Account
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                A one-time code has been sent to{' '}
                <span className="font-bold text-gray-900">{`*****${accountEmail.split('@')[0].slice(-4)}`}</span>
                .
              </p>
              <div className="w-10 h-10 border-3 border-[#026CDF] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-xs mt-4">Please wait 5 seconds...</p>
            </>
          ) : (
            <>
              <h1 className="text-gray-900 font-extrabold text-2xl leading-tight mb-4">
                Authenticate Your Account
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                A one-time code has been sent to{' '}
                <span className="font-bold text-gray-900">{`*****${accountEmail.split('@')[0].slice(-4)}`}</span>
                . Please enter your code below to continue.
              </p>
              <div className="mb-2 w-full">
                <label className="block text-gray-500 text-sm mb-2">One-Time Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-gray-900 text-lg tracking-widest focus:outline-none focus:border-[#026CDF] focus:ring-1 focus:ring-[#026CDF]"
                />
              </div>
              <p className="text-gray-400 text-xs mb-10">
                It may take a minute to receive your code.
              </p>
              <button
                onClick={handleConfirmCode}
                disabled={loading || otpCode.length < 4}
                className="w-full bg-[#026CDF] text-white font-bold py-4 rounded-xl text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Confirm Code
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── RECIPIENT DETAILS ──
  if (step === 'recipient-details') {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <div className="relative flex-shrink-0" style={{ height: '220px' }}>
          <AppImage
            src={event.image}
            alt={`${event.title} concert`}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
            <p className="text-white/70 text-xs font-medium uppercase tracking-wide mb-1">
              {event.date} • {event.time}
            </p>
            <h1 className="text-white font-extrabold text-xl leading-tight uppercase">
              {event.artist} — {event.tour}
            </h1>
            <p className="text-white/50 text-xs mt-0.5">
              {event.venue} — {event.city}
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="flex-1 px-5 pt-4 pb-6 overflow-y-auto">
          <h2 className="text-gray-900 font-extrabold text-base uppercase tracking-wide mb-5">
            RECIPIENT DETAILS
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-900 font-semibold text-sm mb-1.5">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF] focus:ring-1 focus:ring-[#026CDF]"
              />
            </div>
            <div>
              <label className="block text-gray-900 font-semibold text-sm mb-1.5">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF] focus:ring-1 focus:ring-[#026CDF]"
              />
            </div>
            {!useMobile ? (
              <div>
                <label className="block text-gray-900 font-semibold text-sm mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF] focus:ring-1 focus:ring-[#026CDF]"
                />
                <button
                  onClick={() => setUseMobile(true)}
                  className="mt-2 text-[#026CDF] text-sm font-semibold"
                >
                  Use Mobile Number Instead
                </button>
              </div>
            ) : (
              <div>
                <label className="block text-gray-900 font-semibold text-sm mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF] focus:ring-1 focus:ring-[#026CDF]"
                />
                <button
                  onClick={() => setUseMobile(false)}
                  className="mt-2 text-[#026CDF] text-sm font-semibold"
                >
                  Use Email Instead
                </button>
              </div>
            )}
            <div>
              <label className="block text-gray-900 font-semibold text-sm mb-1.5">Note</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF] focus:ring-1 focus:ring-[#026CDF] resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-white">
          <button
            onClick={() => setStep('transfer-to')}
            className="flex items-center gap-1.5 text-gray-900 font-bold text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            BACK
          </button>
          <button
            onClick={() => setStep('authenticate')}
            disabled={!form.firstName}
            className="bg-black text-white font-bold text-sm px-7 py-3.5 rounded-xl disabled:opacity-50"
          >
            Transfer {selectedSeats.length || 1} Ticket{selectedSeats.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    );
  }

  // ── TRANSFER TO ──
  if (step === 'transfer-to') {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <div className="relative flex-shrink-0" style={{ height: '380px' }}>
          <AppImage
            src={event.image}
            alt={`${event.title} concert`}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gray-800/60" />
          <button
            onClick={() => setStep('select-tickets')}
            className="absolute top-4 left-4 flex items-center gap-1.5 text-white font-semibold text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="absolute inset-x-0 top-12 px-4 space-y-2 opacity-60">
            {SEATS.map((s) => (
              <div key={s.id} className="bg-gray-600/80 rounded-lg px-4 py-3">
                <p className="text-gray-300 text-xs font-bold uppercase mb-1">GENERAL SALE</p>
                <div className="grid grid-cols-3">
                  <div>
                    <p className="text-gray-400 text-[9px] uppercase">SECTION</p>
                    <p className="text-white font-bold text-lg">{s.section}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[9px] uppercase">ROW</p>
                    <p className="text-white font-bold text-lg">{s.row}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[9px] uppercase">SEAT</p>
                    <p className="text-white font-bold text-lg">{s.seat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-t-3xl -mt-8 relative z-10 flex flex-col">
          <div className="flex justify-center pt-3 pb-4">
            <div className="w-10 h-1 bg-gray-900 rounded-full" />
          </div>
          <div className="px-5 pb-6 flex-1">
            <h2 className="text-gray-900 font-extrabold text-lg uppercase tracking-wide text-center mb-5">
              SELECT TICKETS TO TRANSFER
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-900 font-semibold text-sm">
                Sec {SEATS[0].section}, Row {SEATS[0].row}
              </span>
              <div className="flex items-center gap-1.5">
                {TICKET_STUB_BADGE}
                <span className="text-gray-900 font-semibold text-sm">{totalTickets} Tickets</span>
              </div>
            </div>

            {/* Seat buttons with radios directly beneath each */}
            <div className="flex gap-3">
              {SEATS.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => toggleSeat(s.id)}
                    className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all w-full ${
                      selectedSeats.includes(s.id)
                        ? 'bg-[#026CDF] text-white ring-2 ring-[#026CDF] ring-offset-1'
                        : 'bg-[#026CDF] text-white opacity-80'
                    }`}
                  >
                    {s.label}
                  </button>
                  <button
                    onClick={() => toggleSeat(s.id)}
                    className="w-10 h-10 flex items-center justify-center"
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedSeats.includes(s.id)
                          ? 'border-[#026CDF] bg-[#026CDF]'
                          : 'border-gray-400 bg-white'
                      }`}
                    >
                      {selectedSeats.includes(s.id) && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-white">
            <span className="text-gray-600 text-sm font-medium">
              {selectedSeats.length} Selected
            </span>
            <button
              onClick={() => setStep('recipient-details')}
              disabled={selectedSeats.length === 0}
              className="bg-[#026CDF] text-white font-bold text-sm px-7 py-3.5 rounded-xl disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── SELECT TICKETS (initial) ──
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="relative flex-shrink-0" style={{ height: '380px' }}>
        <AppImage
          src={event.image}
          alt={`${event.title} concert`}
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gray-800/60" />
        <button
          onClick={() => setStep('transfer-to')}
          className="absolute top-4 left-4 flex items-center gap-1.5 text-white font-semibold text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="absolute inset-x-0 top-12 px-4 space-y-2 opacity-60">
          {SEATS.map((s) => (
            <div key={s.id} className="bg-gray-600/80 rounded-lg px-4 py-3">
              <p className="text-gray-300 text-xs font-bold uppercase mb-1">GENERAL SALE</p>
              <div className="grid grid-cols-3">
                <div>
                  <p className="text-gray-400 text-[9px] uppercase">SECTION</p>
                  <p className="text-white font-bold text-lg">{s.section}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[9px] uppercase">ROW</p>
                  <p className="text-white font-bold text-lg">{s.row}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[9px] uppercase">SEAT</p>
                  <p className="text-white font-bold text-lg">{s.seat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-white rounded-t-3xl -mt-8 relative z-10 flex flex-col">
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 bg-gray-900 rounded-full" />
        </div>
        <div className="px-5 pb-6 flex-1">
          <h2 className="text-gray-900 font-extrabold text-lg uppercase tracking-wide text-center mb-5">
            SELECT TICKETS TO TRANSFER
          </h2>

          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-900 font-semibold text-sm">
              Sec {SEATS[0].section}, Row {SEATS[0].row}
            </span>
            <div className="flex items-center gap-1.5">
              {TICKET_STUB_BADGE}
              <span className="text-gray-900 font-semibold text-sm">{totalTickets} Tickets</span>
            </div>
          </div>

          {/* Seat buttons with radios directly beneath each */}
          <div className="flex gap-3">
            {SEATS.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => toggleSeat(s.id)}
                  className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all w-full ${
                    selectedSeats.includes(s.id)
                      ? 'bg-[#026CDF] text-white ring-2 ring-[#026CDF] ring-offset-1'
                      : 'bg-[#026CDF] text-white opacity-80'
                  }`}
                >
                  {s.label}
                </button>
                <button
                  onClick={() => toggleSeat(s.id)}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedSeats.includes(s.id)
                        ? 'border-[#026CDF] bg-[#026CDF]'
                        : 'border-gray-400 bg-white'
                    }`}
                  >
                    {selectedSeats.includes(s.id) && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-white">
          <span className="text-gray-600 text-sm font-medium">{selectedSeats.length} Selected</span>
          <button
            onClick={() => setStep('recipient-details')}
            disabled={selectedSeats.length === 0}
            className="bg-[#026CDF] text-white font-bold text-sm px-7 py-3.5 rounded-xl disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TicketTransferContentWrapper() {
  return (
    <React.Suspense
      fallback={
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#026CDF] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TicketTransferContent />
    </React.Suspense>
  );
}
