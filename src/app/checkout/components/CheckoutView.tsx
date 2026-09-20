'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const STEPS = ['Delivery', 'Payment', 'Review'];

export default function CheckoutView() {
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState<'mobile' | 'print' | 'willcall'>('mobile');
  const [agreed, setAgreed] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const mins = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  const isUrgent = timeLeft < 120;

  const orderData = {
    event: 'Taylor Swift — The Eras Tour',
    date: 'Sat, Mar 15, 2025 · 7:00 PM',
    venue: 'SoFi Stadium, Los Angeles, CA',
    section: 'Floor A',
    row: 'Row 3',
    seats: '15-16',
    quantity: 2,
    ticketPrice: 189,
    serviceFee: 102,
    orderFee: 4.95,
  };

  const subtotal = orderData.ticketPrice * orderData.quantity;
  const discount = promoApplied ? 20 : 0;
  const total = subtotal + orderData.serviceFee + orderData.orderFee - discount;

  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="bg-card rounded-2xl border border-border p-10 max-w-lg w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-foreground mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Order #TM-2025-847293 · Confirmation sent to your email
          </p>
          <div className="bg-secondary rounded-xl p-5 text-left space-y-2 mb-6">
            <p className="font-bold text-foreground">{orderData.event}</p>
            <p className="text-sm text-muted-foreground">{orderData.date}</p>
            <p className="text-sm text-muted-foreground">{orderData.venue}</p>
            <p className="text-sm text-muted-foreground">
              {orderData.section} · {orderData.row} · Seats {orderData.seats}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/my-account"
              className="px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-colors text-sm"
            >
              View My Tickets
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 border border-border text-foreground font-medium rounded-full hover:bg-secondary transition-colors text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Timer */}
      <div
        className={`flex items-center justify-center gap-2 mb-6 px-4 py-2.5 rounded-full text-sm font-bold max-w-xs mx-auto ${isUrgent ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-primary'}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className={isUrgent ? 'countdown-urgent' : ''}>
          Tickets held for {mins}:{secs}
        </span>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i + 1 < step
                    ? 'bg-green-500 text-white'
                    : i + 1 === step
                      ? 'bg-primary text-white'
                      : 'bg-border text-muted-foreground'
                }`}
              >
                {i + 1 < step ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${i + 1 === step ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-12 sm:w-20 mx-2 transition-all ${i + 1 < step ? 'bg-green-500' : 'bg-border'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main form */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-2xl p-6">
            {/* Step 1: Delivery */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Choose Delivery Method</h2>
                <div className="space-y-3">
                  {[
                    {
                      id: 'mobile',
                      icon: '📱',
                      title: 'Mobile Ticket',
                      desc: 'Access tickets on your phone via the TicketMaster app',
                      badge: 'Recommended',
                    },
                    {
                      id: 'print',
                      icon: '🖨️',
                      title: 'Print at Home',
                      desc: 'Print your tickets at home on any printer',
                      badge: null,
                    },
                    {
                      id: 'willcall',
                      icon: '🎟️',
                      title: 'Will Call',
                      desc: 'Pick up tickets at the venue box office on event day',
                      badge: null,
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDelivery(opt.id as typeof delivery)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                        delivery === opt.id
                          ? 'border-primary bg-blue-50'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground text-sm">{opt.title}</span>
                          {opt.badge && (
                            <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${delivery === opt.id ? 'border-primary' : 'border-border'}`}
                      >
                        {delivery === opt.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Promo code */}
                <div className="mt-6 pt-6 border-t border-border">
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                    />
                    <button
                      onClick={() => {
                        if (promoCode) setPromoApplied(true);
                      }}
                      className="px-5 py-2.5 bg-secondary border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-600 text-xs font-semibold mt-2">
                      ✓ Promo code applied — $20 off!
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full py-3.5 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Payment Information</h2>

                {/* Payment method tabs */}
                <div className="flex gap-2 mb-6">
                  {['Credit Card', 'PayPal', 'Venmo'].map((method, i) => (
                    <button
                      key={method}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        i === 0
                          ? 'bg-primary text-white border-primary'
                          : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      placeholder="Full name on card"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        placeholder="MM / YY"
                        className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <svg
                    className="w-4 h-4 text-green-600 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Your payment is secured with 256-bit SSL encryption
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 border border-border text-foreground font-semibold rounded-full hover:bg-secondary transition-colors text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-colors text-sm"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Review Your Order</h2>

                <div className="bg-secondary rounded-xl p-5 mb-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Event</span>
                    <span className="font-semibold text-foreground text-right max-w-[60%]">
                      {orderData.event}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-semibold text-foreground">{orderData.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Venue</span>
                    <span className="font-semibold text-foreground text-right max-w-[60%]">
                      {orderData.venue}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Seats</span>
                    <span className="font-semibold text-foreground">
                      {orderData.section} · {orderData.row}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold text-foreground capitalize">
                      {delivery === 'willcall'
                        ? 'Will Call'
                        : delivery === 'print'
                          ? 'Print at Home'
                          : 'Mobile Ticket'}
                    </span>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer mb-6">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${agreed ? 'bg-primary border-primary' : 'border-border'}`}
                  >
                    {agreed && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I agree to the{' '}
                    <Link href="/" className="text-primary hover:underline">
                      Terms of Use
                    </Link>{' '}
                    and{' '}
                    <Link href="/" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    . I understand all sales are final and tickets are non-refundable.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3.5 border border-border text-foreground font-semibold rounded-full hover:bg-secondary transition-colors text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => agreed && setOrderPlaced(true)}
                    disabled={!agreed}
                    className={`flex-1 py-3.5 font-bold rounded-full transition-all text-sm ${
                      agreed
                        ? 'bg-primary text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    Place Order · ${total.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-32">
            <h3 className="font-bold text-foreground mb-4 pb-3 border-b border-border">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold text-foreground">{orderData.event}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{orderData.date}</p>
                <p className="text-muted-foreground text-xs">{orderData.venue}</p>
              </div>
              <div className="bg-secondary rounded-lg p-3 text-xs">
                <p className="font-semibold text-foreground">
                  {orderData.section} · {orderData.row}
                </p>
                <p className="text-muted-foreground">
                  Seats {orderData.seats} · {orderData.quantity} tickets
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{orderData.quantity}x Tickets</span>
                <span className="font-medium text-foreground">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="font-medium text-foreground">${orderData.serviceFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Processing</span>
                <span className="font-medium text-foreground">
                  ${orderData.orderFee.toFixed(2)}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span className="font-semibold">Promo Discount</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-foreground text-base pt-2 border-t border-border">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3">
              <svg
                className="w-4 h-4 text-green-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure checkout · All transactions are encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
