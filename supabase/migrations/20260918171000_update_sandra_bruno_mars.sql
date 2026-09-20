-- ============================================================
-- Migration: update_sandra_bruno_mars
-- Replaces BTS ticket with Bruno Mars concert ticket for sandrawilli4042@gmail.com
-- ============================================================

DO $$
DECLARE
  sandra_uuid UUID;
  old_order_uuid UUID;
  new_order_uuid UUID := '00000000-0000-0000-0004-000000000002'::UUID;
BEGIN
  -- Get Sandra's user ID
  SELECT id INTO sandra_uuid
  FROM auth.users
  WHERE email = 'sandrawilli4042@gmail.com'
  LIMIT 1;

  IF sandra_uuid IS NULL THEN
    RAISE NOTICE 'User sandrawilli4042@gmail.com not found — skipping Bruno Mars ticket update.';
    RETURN;
  END IF;

  -- Find and remove the old BTS order (and its tickets via cascade or explicit delete)
  SELECT id INTO old_order_uuid
  FROM public.orders
  WHERE user_id = sandra_uuid AND order_number = '51-884201/CA'
  LIMIT 1;

  IF old_order_uuid IS NOT NULL THEN
    DELETE FROM public.tickets WHERE order_id = old_order_uuid;
    DELETE FROM public.orders WHERE id = old_order_uuid;
  END IF;

  -- Also remove the fixed-UUID BTS ticket/order if they exist
  DELETE FROM public.tickets WHERE id = '00000000-0000-0000-0005-000000000001'::UUID;
  DELETE FROM public.orders WHERE id = '00000000-0000-0000-0004-000000000001'::UUID;

  -- Remove any other BTS orders for this user
  DELETE FROM public.tickets
  WHERE order_id IN (
    SELECT id FROM public.orders
    WHERE user_id = sandra_uuid AND event_title ILIKE '%BTS%'
  );
  DELETE FROM public.orders
  WHERE user_id = sandra_uuid AND event_title ILIKE '%BTS%';

  -- Insert Bruno Mars order
  INSERT INTO public.orders (
    id, user_id, order_number, event_title, event_date, event_time,
    venue, city, event_image, ticket_count, total_amount, order_status
  ) VALUES (
    new_order_uuid,
    sandra_uuid,
    '51-992301/CA',
    'Bruno Mars: The Moonshine Jungle Tour Live',
    'Fri, Dec 05, 2026',
    '8:00 PM',
    'Crypto.com Arena',
    'Los Angeles, CA',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    1,
    210.00,
    'upcoming'::public.order_status
  ) ON CONFLICT (id) DO UPDATE
    SET event_title = EXCLUDED.event_title,
        event_date = EXCLUDED.event_date,
        event_time = EXCLUDED.event_time,
        venue = EXCLUDED.venue,
        city = EXCLUDED.city,
        event_image = EXCLUDED.event_image,
        total_amount = EXCLUDED.total_amount,
        order_status = EXCLUDED.order_status,
        updated_at = now();

  -- Insert Bruno Mars ticket with valid section, row, and seat
  INSERT INTO public.tickets (
    id, order_id, user_id, section, row_label, seat, barcode
  ) VALUES (
    '00000000-0000-0000-0005-000000000002'::UUID,
    new_order_uuid,
    sandra_uuid,
    'Section 108',
    'Row D',
    'Seat 7',
    'TM-BM-SW-108-D7'
  ) ON CONFLICT (id) DO NOTHING;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Bruno Mars ticket update failed: %', SQLERRM;
END $$;
