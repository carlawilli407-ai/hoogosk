import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TicketSelectionView from '@/app/ticket-selection/components/TicketSelectionView';

export default function TicketSelectionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[104px]">
        <TicketSelectionView />
      </main>
      <Footer />
    </div>
  );
}
