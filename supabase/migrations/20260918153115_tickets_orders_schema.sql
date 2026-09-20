-- ============================================================
-- Migration: tickets_orders_schema
-- Tables: user_profiles, orders, tickets, transfer_history
-- ============================================================

-- 1. TYPES
DROP TYPE IF EXISTS public.order_status CASCADE;
CREATE TYPE public.order_status AS ENUM ('upcoming', 'past', 'cancelled');

DROP TYPE IF EXISTS public.transfer_status CASCADE;
CREATE TYPE public.transfer_status AS ENUM ('pending', 'accepted', 'declined', 'cancelled');

-- 2. CORE TABLES

-- user_profiles (intermediary for auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  event_title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_time TEXT NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '',
  event_image TEXT DEFAULT '',
  ticket_count INTEGER NOT NULL DEFAULT 1,
  total_amount NUMERIC(10,2) DEFAULT 0,
  order_status public.order_status DEFAULT 'upcoming'::public.order_status,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- tickets (individual seats per order)
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  section TEXT NOT NULL DEFAULT '',
  row_label TEXT NOT NULL DEFAULT '',
  seat TEXT NOT NULL DEFAULT '',
  barcode TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- transfer_history
CREATE TABLE IF NOT EXISTS public.transfer_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT NOT NULL DEFAULT '',
  transfer_status public.transfer_status DEFAULT 'pending'::public.transfer_status,
  note TEXT DEFAULT '',
  transferred_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_tickets_order_id ON public.tickets(order_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON public.tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_transfer_history_ticket_id ON public.transfer_history(ticket_id);
CREATE INDEX IF NOT EXISTS idx_transfer_history_sender_id ON public.transfer_history(sender_id);

-- 4. FUNCTIONS (before RLS policies)

-- Auto-create user_profiles on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 5. ENABLE RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfer_history ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES

-- user_profiles
DROP POLICY IF EXISTS "users_manage_own_user_profiles" ON public.user_profiles;
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles FOR ALL TO authenticated
USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- orders
DROP POLICY IF EXISTS "users_manage_own_orders" ON public.orders;
CREATE POLICY "users_manage_own_orders"
ON public.orders FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- tickets
DROP POLICY IF EXISTS "users_manage_own_tickets" ON public.tickets;
CREATE POLICY "users_manage_own_tickets"
ON public.tickets FOR ALL TO authenticated
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- transfer_history
DROP POLICY IF EXISTS "users_view_own_transfers" ON public.transfer_history;
CREATE POLICY "users_view_own_transfers"
ON public.transfer_history FOR SELECT TO authenticated
USING (sender_id = auth.uid());

DROP POLICY IF EXISTS "users_insert_own_transfers" ON public.transfer_history;
CREATE POLICY "users_insert_own_transfers"
ON public.transfer_history FOR INSERT TO authenticated
WITH CHECK (sender_id = auth.uid());

-- 7. TRIGGERS
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. MOCK DATA
DO $$
DECLARE
  demo_user_uuid UUID := gen_random_uuid();
  order1_uuid UUID := gen_random_uuid();
  order2_uuid UUID := gen_random_uuid();
  order3_uuid UUID := gen_random_uuid();
  ticket1_uuid UUID := gen_random_uuid();
  ticket2_uuid UUID := gen_random_uuid();
  ticket3_uuid UUID := gen_random_uuid();
  ticket4_uuid UUID := gen_random_uuid();
  ticket5_uuid UUID := gen_random_uuid();
BEGIN
  -- Create demo auth user
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
    is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
    recovery_token, recovery_sent_at, email_change_token_new, email_change,
    email_change_sent_at, email_change_token_current, email_change_confirm_status,
    reauthentication_token, reauthentication_sent_at, phone, phone_change,
    phone_change_token, phone_change_sent_at
  ) VALUES (
    demo_user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    'demo@ticketmaster.com', crypt('demo1234', gen_salt('bf', 10)), now(), now(), now(),
    jsonb_build_object('full_name', 'Demo User'),
    jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
    false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
  ) ON CONFLICT (id) DO NOTHING;

  -- Orders
  INSERT INTO public.orders (id, user_id, order_number, event_title, event_date, event_time, venue, city, event_image, ticket_count, total_amount, order_status)
  VALUES
    (order1_uuid, demo_user_uuid, '51-123160/CA',
     'BTS World Tour ''ARIRANG'' in Los Angeles',
     'Sun, Sep 06, 2026', '8:00 PM',
     'SoFi Stadium', 'Inglewood, CA',
     'https://img.rocket.new/generatedImages/rocket_gen_img_4751de4d4-1789743264516.png',
     3, 450.00, 'upcoming'::public.order_status),
    (order2_uuid, demo_user_uuid, '51-098432/CA',
     'Taylor Swift — The Eras Tour',
     'Sat, Oct 18, 2026', '7:00 PM',
     'Rose Bowl', 'Pasadena, CA',
     'https://images.unsplash.com/photo-1734454308735-996e312ccb9c',
     2, 320.00, 'upcoming'::public.order_status),
    (order3_uuid, demo_user_uuid, '51-076210/NV',
     'Coldplay — Music of the Spheres',
     'Thu, Dec 4, 2026', '7:00 PM',
     'Allegiant Stadium', 'Las Vegas, NV',
     'https://images.unsplash.com/photo-1600835044077-d6d68aef2ef1',
     1, 150.00, 'past'::public.order_status)
  ON CONFLICT (id) DO NOTHING;

  -- Tickets for order 1 (3 tickets)
  INSERT INTO public.tickets (id, order_id, user_id, section, row_label, seat, barcode)
  VALUES
    (ticket1_uuid, order1_uuid, demo_user_uuid, 'Floor A', 'Row 3', 'Seat 5', 'TM-BTS-001-A'),
    (ticket2_uuid, order1_uuid, demo_user_uuid, 'Floor A', 'Row 3', 'Seat 6', 'TM-BTS-001-B'),
    (ticket3_uuid, order1_uuid, demo_user_uuid, 'Floor A', 'Row 3', 'Seat 7', 'TM-BTS-001-C')
  ON CONFLICT (id) DO NOTHING;

  -- Tickets for order 2 (2 tickets)
  INSERT INTO public.tickets (id, order_id, user_id, section, row_label, seat, barcode)
  VALUES
    (ticket4_uuid, order2_uuid, demo_user_uuid, 'Section 112', 'Row G', 'Seat 4', 'TM-TS-002-A'),
    (ticket5_uuid, order2_uuid, demo_user_uuid, 'Section 112', 'Row G', 'Seat 5', 'TM-TS-002-B')
  ON CONFLICT (id) DO NOTHING;

  -- Transfer history for ticket1 (transferred, then returned)
  INSERT INTO public.transfer_history (ticket_id, order_id, sender_id, recipient_email, recipient_name, transfer_status, note)
  VALUES
    (ticket1_uuid, order1_uuid, demo_user_uuid, 'friend@example.com', 'Alex Kim', 'accepted', 'Enjoy the show!'),
    (ticket2_uuid, order1_uuid, demo_user_uuid, 'jane@example.com', 'Jane Doe', 'pending', 'Transferring to you')
  ON CONFLICT (id) DO NOTHING;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Mock data insertion failed: %', SQLERRM;
END $$;
