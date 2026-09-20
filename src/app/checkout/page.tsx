'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MobileBottomNav from '@/components/MobileBottomNav';

const steps = ['Delivery', 'Payment', 'Review'];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ email: '', cardNumber: '', expiry: '', cvv: '', name: '' });
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (confirmed) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 text-center pb-24">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
          <svg
            className="w-10 h-10 text-green-600"
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
        <h2 className="text-gray-900 font-extrabold text-2xl mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-1">Order #51-123160/CA</p>
        <p className="text-gray-500 text-sm mb-6">
          BTS World Tour &apos;ARIRANG&apos; · Sep 06, 2026
        </p>
        <button
          onClick={() => router.push('/my-account')}
          className="bg-[#026CDF] text-white font-bold px-8 py-4 rounded-xl text-sm w-full"
        >
          View My Tickets
        </button>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#026CDF] px-4 pt-10 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-white font-extrabold text-lg">Checkout</h1>
        </div>
        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? 'bg-white text-[#026CDF]' : 'bg-white/30 text-white'}`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span
                  className={`text-xs font-medium ${i <= step ? 'text-white' : 'text-white/50'}`}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-white/30" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="mx-4 mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-900 font-bold text-sm">BTS World Tour &apos;ARIRANG&apos;</p>
        <p className="text-gray-500 text-xs mt-0.5">Sun, Sep 06, 2026 · SoFi Stadium</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <span className="text-gray-600 text-xs">3 × General Sale (Sec 119, Row 12)</span>
          <span className="text-gray-900 font-bold text-sm">$567.00</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-500 text-xs">Service fees</span>
          <span className="text-gray-600 text-xs">$84.00</span>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
          <span className="text-gray-900 font-bold text-sm">Total</span>
          <span className="text-gray-900 font-extrabold text-base">$651.00</span>
        </div>
      </div>

      <div className="px-4 pt-5">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-900 font-bold text-base">Delivery Method</h2>
            <div className="border-2 border-[#026CDF] bg-blue-50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#026CDF] rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-sm">Mobile Ticket</p>
                <p className="text-gray-500 text-xs">Delivered to your Ticketmaster app</p>
              </div>
              <div className="ml-auto w-5 h-5 bg-[#026CDF] rounded-full flex items-center justify-center">
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
              </div>
            </div>
            <div>
              <label className="block text-gray-900 font-semibold text-sm mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF]"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-900 font-bold text-base">Payment</h2>
            <div>
              <label className="block text-gray-900 font-semibold text-sm mb-1.5">
                Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF]"
              />
            </div>
            <div>
              <label className="block text-gray-900 font-semibold text-sm mb-1.5">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF]"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-gray-900 font-semibold text-sm mb-1.5">Expiry</label>
                <input
                  type="text"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-900 font-semibold text-sm mb-1.5">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-3 text-gray-900 text-sm focus:outline-none focus:border-[#026CDF]"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-gray-900 font-bold text-base">Review Order</h2>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700 font-semibold text-sm mb-3">Order Summary</p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Event</span>
                  <span className="text-gray-900 font-medium text-right max-w-[180px]">
                    BTS World Tour &apos;ARIRANG&apos;
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-900 font-medium">Sep 06, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tickets</span>
                  <span className="text-gray-900 font-medium">3 × Sec 119, Row 12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-gray-900 font-medium">Mobile Ticket</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-gray-900 font-extrabold">$651.00</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-xs text-center">
              By placing your order you agree to our Terms of Use and Privacy Policy.
            </p>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-gray-300 text-gray-700 font-bold py-4 rounded-xl text-sm"
            >
              Back
            </button>
          )}
          <button
            onClick={() => (step < 2 ? setStep(step + 1) : setConfirmed(true))}
            className="flex-1 bg-[#026CDF] text-white font-bold py-4 rounded-xl text-sm"
          >
            {step < 2 ? 'Continue' : 'Place Order'}
          </button>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
