'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyTicketsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/my-account');
  }, [router]);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#026CDF] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
