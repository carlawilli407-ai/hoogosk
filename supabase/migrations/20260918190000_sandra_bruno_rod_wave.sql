DO $$
DECLARE
  sandra_uuid UUID;
  bruno_order_uuid UUID := '00000000-0000-0000-0010-000000000001'::UUID;
  rod_order_uuid   UUID := '00000000-0000-0000-0010-000000000002'::UUID;
BEGIN
  -- Get Sandra's user ID
  SELECT id INTO sandra_uuid
  FROM auth.users
  WHERE email = 'sandrawilli4042@gmail.com'
  LIMIT 1;

  IF sandra_uuid IS NULL THEN
    RAISE NOTICE 'User sandrawilli4042@gmail.com not found — skipping.';
    RETURN;
  END IF;

  -- Remove ALL existing tickets and orders for Sandra
  DELETE FROM public.tickets
  WHERE order_id IN (SELECT id FROM public.orders WHERE user_id = sandra_uuid);
  DELETE FROM public.orders WHERE user_id = sandra_uuid;

  -- ── Bruno Mars Order ─────────────────────────────────────────────────────
  INSERT INTO public.orders (
  id, user_id, order_number, event_title, event_date, event_time,
  venue, city, event_image, ticket_count, total_amount, order_status
  ) VALUES (
  bruno_order_uuid,
  sandra_uuid,
  '51-992301/CA',
  'Bruno Mars - The Romantic Tour',
  'Sat, Sep 19, 2026',
  '7:00 PM',
  'Hard Rock Stadium',
  'Miami, FL',
  'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
  3,
  630.00,
  'upcoming'::public.order_status
  ) ON CONFLICT (id) DO UPDATE
  SET event_title   = EXCLUDED.event_title,
      event_date    = EXCLUDED.event_date,
      event_time    = EXCLUDED.event_time,
      venue         = EXCLUDED.venue,
      city          = EXCLUDED.city,
      event_image   = EXCLUDED.event_image,
      ticket_count  = EXCLUDED.ticket_count,
      total_amount  = EXCLUDED.total_amount,
      order_status  = EXCLUDED.order_status,
      updated_at    = now();

  -- Bruno Mars – 3 tickets (Section 108, Row D, Seats 5-7)
  INSERT INTO public.tickets (id, order_id, user_id, section, row_label, seat, barcode)
  VALUES
    ('00000000-0000-0000-0011-000000000001'::UUID, bruno_order_uuid, sandra_uuid, '108', 'D', '5', 'TM-BM-108-D5'),
    ('00000000-0000-0000-0011-000000000002'::UUID, bruno_order_uuid, sandra_uuid, '108', 'D', '6', 'TM-BM-108-D6'),
    ('00000000-0000-0000-0011-000000000003'::UUID, bruno_order_uuid, sandra_uuid, '108', 'D', '7', 'TM-BM-108-D7')
  ON CONFLICT (id) DO NOTHING;

  -- ── Rod Wave Order ────────────────────────────────────────────────────────
  INSERT INTO public.orders (
    id, user_id, order_number, event_title, event_date, event_time,
    venue, city, event_image, ticket_count, total_amount, order_status
  ) VALUES (
    rod_order_uuid,
    sandra_uuid,
    '51-774502/CA',
    'Rod Wave: Don\'t Look Down Tour',
    'Sat, Sep 19, 2026',
    '8:00 PM',
    'Smoothie King Center',
    'New Orleans, LA',
    'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
    3,
    480.00,
    'upcoming'::public.order_status
  ) ON CONFLICT (id) DO UPDATE
    SET event_title   = EXCLUDED.event_title,
        event_date    = EXCLUDED.event_date,
        event_time    = EXCLUDED.event_time,
        venue         = EXCLUDED.venue,
        city          = EXCLUDED.city,
        event_image   = EXCLUDED.event_image,
        ticket_count  = EXCLUDED.ticket_count,
        total_amount  = EXCLUDED.total_amount,
        order_status  = EXCLUDED.order_status,
        updated_at    = now();

  -- Rod Wave – 3 tickets (Section 119, Row 12, Seats 5-7)
  INSERT INTO public.tickets (id, order_id, user_id, section, row_label, seat, barcode)
  VALUES
    ('00000000-0000-0000-0012-000000000001'::UUID, rod_order_uuid, sandra_uuid, '119', '12', '5', 'TM-RW-119-12-5'),
    ('00000000-0000-0000-0012-000000000002'::UUID, rod_order_uuid, sandra_uuid, '119', '12', '6', 'TM-RW-119-12-6'),
    ('00000000-0000-0000-0012-000000000003'::UUID, rod_order_uuid, sandra_uuid, '119', '12', '7', 'TM-RW-119-12-7')
  ON CONFLICT (id) DO NOTHING;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Sandra ticket migration failed: %', SQLERRM;
END $$;
