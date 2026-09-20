'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

type Tab = 'tickets' | 'orders' | 'payment' | 'settings';

interface Ticket {
  id: string;
  section: string;
  row_label: string;
  seat: string;
  barcode: string;
}

interface Order {
  id: string;
  order_number: string;
  event_title: string;
  event_date: string;
  event_time: string;
  venue: string;
  city: string;
  event_image: string;
  ticket_count: number;
  total_amount: number;
  order_status: 'upcoming' | 'past' | 'cancelled';
  tickets: Ticket[];
}

export default function AccountView() {
  const [activeTab, setActiveTab] = useState<Tab>('tickets');
  const { user, getUserProfile } = useAuth();
  const supabase = createClient();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'tickets', label: 'My Tickets', icon: '🎟️' },
    { id: 'orders', label: 'Order History', icon: '📋' },
    { id: 'payment', label: 'Payment Methods', icon: '💳' },
    { id: 'settings', label: 'Account Settings', icon: '⚙️' },
  ];

  useEffect(() => {
    if (!user) return;
    // Load profile data from auth user
    setProfileData({
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
      email: user.email || '',
      phone: user.user_metadata?.phone || '',
      city: user.user_metadata?.city || '',
      state: user.user_metadata?.state || '',
      zip: user.user_metadata?.zip || '',
    });
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        return;
      }

      const orderIds = ordersData.map((o: any) => o.id);
      const { data: ticketsData } = await supabase
        .from('tickets')
        .select('*')
        .in('order_id', orderIds);

      const enriched: Order[] = ordersData.map((o: any) => ({
        id: o.id,
        order_number: o.order_number,
        event_title: o.event_title,
        event_date: o.event_date,
        event_time: o.event_time,
        venue: o.venue,
        city: o.city,
        event_image: o.event_image,
        ticket_count: o.ticket_count,
        total_amount: o.total_amount,
        order_status: o.order_status,
        tickets: (ticketsData || []).filter((t: any) => t.order_id === o.id),
      }));

      setOrders(enriched);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const upcomingOrders = orders.filter((o) => o.order_status === 'upcoming');
  const pastOrders = orders.filter((o) => o.order_status !== 'upcoming');

  const displayName = profileData.name || user?.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Account Header */}
      <div className="bg-navy rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-extrabold shrink-0">
          {initials}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-white">{displayName}</h1>
          <p className="text-white/60 text-sm mt-0.5">{profileData.email}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3">
            <div className="text-center">
              <p className="text-white font-bold text-lg">{pastOrders.length}</p>
              <p className="text-white/50 text-xs">Events Attended</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold text-lg">{upcomingOrders.length}</p>
              <p className="text-white/50 text-xs">Upcoming</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold text-lg">${totalSpent.toFixed(0)}</p>
              <p className="text-white/50 text-xs">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border mb-6 bg-card rounded-t-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* My Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-foreground">
              Upcoming Events ({upcomingOrders.length})
            </h2>
          </div>
          {loadingOrders && (
            <div className="flex flex-col gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border overflow-hidden animate-pulse"
                >
                  <div className="bg-secondary" style={{ height: '120px' }} />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-secondary rounded w-3/4" />
                    <div className="h-3 bg-secondary rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loadingOrders && upcomingOrders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No upcoming events found.
            </div>
          )}
          {!loadingOrders &&
            upcomingOrders.map((order) => (
              <Link
                key={order.id}
                href={`/order-detail?id=${order.id}`}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow block"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative sm:w-40 shrink-0" style={{ height: '120px' }}>
                    <AppImage
                      src={order.event_image}
                      alt={`${order.event_title} event image`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          ✓ Upcoming
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground">{order.event_title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.event_date} · {order.event_time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.venue} · {order.city}
                      </p>
                      {order.tickets.length > 0 && (
                        <p className="text-sm font-semibold text-foreground mt-1">
                          {order.tickets[0].section} · {order.tickets[0].row_label} ·{' '}
                          {order.tickets[0].seat}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {order.ticket_count} ticket{order.ticket_count !== 1 ? 's' : ''} · $
                        {Number(order.total_amount).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-3 sm:items-end">
                      <div className="w-20 h-20 bg-foreground rounded-lg flex items-center justify-center p-2">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                          <rect
                            x="5"
                            y="5"
                            width="35"
                            height="35"
                            fill="none"
                            stroke="white"
                            strokeWidth="6"
                          />
                          <rect x="15" y="15" width="15" height="15" fill="white" />
                          <rect
                            x="60"
                            y="5"
                            width="35"
                            height="35"
                            fill="none"
                            stroke="white"
                            strokeWidth="6"
                          />
                          <rect x="70" y="15" width="15" height="15" fill="white" />
                          <rect
                            x="5"
                            y="60"
                            width="35"
                            height="35"
                            fill="none"
                            stroke="white"
                            strokeWidth="6"
                          />
                          <rect x="15" y="70" width="15" height="15" fill="white" />
                          <rect x="60" y="60" width="10" height="10" fill="white" />
                          <rect x="75" y="60" width="10" height="10" fill="white" />
                          <rect x="60" y="75" width="10" height="10" fill="white" />
                          <rect x="75" y="75" width="10" height="10" fill="white" />
                        </svg>
                      </div>
                      <p className="text-xs text-muted-foreground">Order #{order.order_number}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}

      {/* Order History Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Order History</h2>
          {loadingOrders && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-secondary rounded-xl animate-pulse" />
              ))}
            </div>
          )}
          {!loadingOrders && orders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No orders found.</div>
          )}
          {!loadingOrders && orders.length > 0 && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-5 gap-4 px-5 py-3 bg-secondary text-xs font-bold text-muted-foreground uppercase tracking-wide border-b border-border">
                <span className="col-span-2">Event</span>
                <span>Date</span>
                <span>Qty</span>
                <span className="text-right">Total</span>
              </div>
              {orders.map((order, i) => (
                <div
                  key={order.id}
                  className={`flex flex-col sm:grid sm:grid-cols-5 sm:gap-4 px-5 py-4 ${
                    i < orders.length - 1 ? 'border-b border-border' : ''
                  } hover:bg-secondary/50 transition-colors`}
                >
                  <div className="col-span-2">
                    <p className="font-semibold text-foreground text-sm">{order.event_title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {order.venue}, {order.city}
                    </p>
                    <p className="text-xs text-muted-foreground sm:hidden mt-0.5">
                      {order.event_date} · {order.ticket_count} tickets · $
                      {Number(order.total_amount).toFixed(2)}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
                        order.order_status === 'upcoming'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {order.order_status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>
                  <p className="hidden sm:block text-sm text-muted-foreground self-center">
                    {order.event_date}
                  </p>
                  <p className="hidden sm:block text-sm text-muted-foreground self-center">
                    {order.ticket_count}
                  </p>
                  <p className="hidden sm:block text-sm font-bold text-foreground self-center text-right">
                    ${Number(order.total_amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Payment Methods</h2>
            <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors">
              + Add Card
            </button>
          </div>
          <div className="text-center py-12 text-muted-foreground text-sm">
            No payment methods saved yet.
          </div>
          <div className="mt-6 bg-blue-50 border border-primary/20 rounded-2xl p-5">
            <h3 className="font-bold text-foreground text-sm mb-3">Other Payment Options</h3>
            <div className="flex flex-wrap gap-3">
              {['PayPal', 'Venmo', 'Klarna', 'Apple Pay'].map((method) => (
                <div
                  key={method}
                  className="px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-foreground"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Account Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <h2 className="text-lg font-bold text-foreground mb-5">Account Settings</h2>
          <form
            onSubmit={handleSaveProfile}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h3 className="font-bold text-foreground mb-4 pb-3 border-b border-border">
              Profile Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name' },
                {
                  label: 'Email Address',
                  key: 'email',
                  type: 'email',
                  placeholder: 'your@email.com',
                },
                {
                  label: 'Phone Number',
                  key: 'phone',
                  type: 'tel',
                  placeholder: '+1 (555) 000-0000',
                },
                { label: 'City', key: 'city', type: 'text', placeholder: 'City' },
                { label: 'State', key: 'state', type: 'text', placeholder: 'State' },
                { label: 'ZIP Code', key: 'zip', type: 'text', placeholder: 'ZIP' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={profileData[field.key as keyof typeof profileData]}
                    onChange={(e) =>
                      setProfileData({ ...profileData, [field.key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-background text-foreground"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-blue-700 transition-colors text-sm"
              >
                Save Changes
              </button>
              {profileSaved && (
                <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Changes saved!
                </span>
              )}
            </div>
          </form>

          {/* Danger Zone */}
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="font-bold text-danger mb-2">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button className="px-6 py-2.5 border border-danger text-danger font-semibold rounded-full hover:bg-red-100 transition-colors text-sm">
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
