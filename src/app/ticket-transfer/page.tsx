'use client';
import React, { Suspense } from 'react';
import TicketTransferContent from './TicketTransferContent';

export default function TicketTransferPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#026CDF] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TicketTransferContent />
    </Suspense>
  );
}
