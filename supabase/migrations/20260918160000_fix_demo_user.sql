-- ============================================================
-- Migration: fix_demo_user
-- Ensures the demo user exists in auth.users AND auth.identities
-- so that signInWithPassword works correctly
-- ============================================================

DO $$
DECLARE
  demo_uuid UUID;
  existing_uuid UUID;
  order1_uuid UUID;
  order2_uuid UUID;
  order3_uuid UUID;
BEGIN
  -- Check if demo user already exists in auth.users
  SELECT id INTO existing_uuid
  FROM auth.users
  WHERE email = 'demo@ticketmaster.com'
  LIMIT 1;

  IF existing_uuid IS NULL THEN
    -- Create a stable UUID for the demo user
    demo_uuid := '00000000-0000-0000-0000-000000000001'::UUID;

    -- Insert into auth.users
    INSERT INTO auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_user_meta_data, raw_app_meta_data,
      is_sso_user, is_anonymous,
      confirmation_token, recovery_token,
      email_change_token_new, email_change,
      email_change_token_current, email_change_confirm_status,
      reauthentication_token, phone, phone_change, phone_change_token
    ) VALUES (
      demo_uuid,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'demo@ticketmaster.com',
      crypt('demo1234', gen_salt('bf', 10)),
      now(),
      now(),
      now(),
      jsonb_build_object('full_name', 'Demo User'),
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
      false,
      false,
      '', '', '', '', '', 0, '', null, '', ''
    ) ON CONFLICT (id) DO UPDATE
      SET encrypted_password = crypt('demo1234', gen_salt('bf', 10)),
          email_confirmed_at = COALESCE(auth.users.email_confirmed_at, now()),
          updated_at = now();

    -- Insert identity record (required for signInWithPassword to work)
    INSERT INTO auth.identities (
      id, user_id, provider_id, provider, identity_data,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      demo_uuid::TEXT,
      demo_uuid,
      'demo@ticketmaster.com',
      'email',
      jsonb_build_object(
        'sub', demo_uuid::TEXT,
        'email', 'demo@ticketmaster.com',
        'email_verified', true,
        'provider', 'email'
      ),
      now(),
      now(),
      now()
    ) ON CONFLICT (provider, provider_id) DO NOTHING;

    -- Ensure user_profile exists
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (demo_uuid, 'demo@ticketmaster.com', 'Demo User')
    ON CONFLICT (id) DO NOTHING;

    -- Seed orders
    order1_uuid := '00000000-0000-0000-0001-000000000001'::UUID;
    order2_uuid := '00000000-0000-0000-0001-000000000002'::UUID;
    order3_uuid := '00000000-0000-0000-0001-000000000003'::UUID;

    INSERT INTO public.orders (id, user_id, order_number, event_title, event_date, event_time, venue, city, event_image, ticket_count, total_amount, order_status)
    VALUES
      (order1_uuid, demo_uuid, '51-123160/CA',
       'BTS World Tour ''ARIRANG'' in Los Angeles',
       'Sun, Sep 06, 2026', '8:00 PM',
       'SoFi Stadium', 'Inglewood, CA',
       'https://img.rocket.new/generatedImages/rocket_gen_img_4751de4d4-1789743264516.png',
       3, 450.00, 'upcoming'::public.order_status),
      (order2_uuid, demo_uuid, '51-098432/CA',
       'Taylor Swift — The Eras Tour',
       'Sat, Oct 18, 2026', '7:00 PM',
       'Rose Bowl', 'Pasadena, CA',
       'https://images.unsplash.com/photo-1734454308735-996e312ccb9c',
       2, 320.00, 'upcoming'::public.order_status),
      (order3_uuid, demo_uuid, '51-076210/NV',
       'Coldplay — Music of the Spheres',
       'Thu, Dec 4, 2026', '7:00 PM',
       'Allegiant Stadium', 'Las Vegas, NV',
       'https://images.unsplash.com/photo-1600835044077-d6d68aef2ef1',
       1, 150.00, 'past'::public.order_status)
    ON CONFLICT (id) DO NOTHING;

    -- Tickets for order 1
    INSERT INTO public.tickets (id, order_id, user_id, section, row_label, seat, barcode)
    VALUES
      ('00000000-0000-0000-0002-000000000001'::UUID, order1_uuid, demo_uuid, 'Floor A', 'Row 3', 'Seat 5', 'TM-BTS-001-A'),
      ('00000000-0000-0000-0002-000000000002'::UUID, order1_uuid, demo_uuid, 'Floor A', 'Row 3', 'Seat 6', 'TM-BTS-001-B'),
      ('00000000-0000-0000-0002-000000000003'::UUID, order1_uuid, demo_uuid, 'Floor A', 'Row 3', 'Seat 7', 'TM-BTS-001-C')
    ON CONFLICT (id) DO NOTHING;

    -- Tickets for order 2
    INSERT INTO public.tickets (id, order_id, user_id, section, row_label, seat, barcode)
    VALUES
      ('00000000-0000-0000-0002-000000000004'::UUID, order2_uuid, demo_uuid, 'Section 112', 'Row G', 'Seat 4', 'TM-TS-002-A'),
      ('00000000-0000-0000-0002-000000000005'::UUID, order2_uuid, demo_uuid, 'Section 112', 'Row G', 'Seat 5', 'TM-TS-002-B')
    ON CONFLICT (id) DO NOTHING;

    -- Transfer history
    INSERT INTO public.transfer_history (ticket_id, order_id, sender_id, recipient_email, recipient_name, transfer_status, note)
    VALUES
      ('00000000-0000-0000-0002-000000000001'::UUID, order1_uuid, demo_uuid, 'friend@example.com', 'Alex Kim', 'accepted', 'Enjoy the show!'),
      ('00000000-0000-0000-0002-000000000002'::UUID, order1_uuid, demo_uuid, 'jane@example.com', 'Jane Doe', 'pending', 'Transferring to you')
    ON CONFLICT (id) DO NOTHING;

  ELSE
    -- User exists — just fix the password and ensure email is confirmed
    UPDATE auth.users
    SET
      encrypted_password = crypt('demo1234', gen_salt('bf', 10)),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      updated_at = now()
    WHERE email = 'demo@ticketmaster.com';

    -- Ensure identity record exists
    INSERT INTO auth.identities (
      id, user_id, provider_id, provider, identity_data,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      existing_uuid::TEXT,
      existing_uuid,
      'demo@ticketmaster.com',
      'email',
      jsonb_build_object(
        'sub', existing_uuid::TEXT,
        'email', 'demo@ticketmaster.com',
        'email_verified', true,
        'provider', 'email'
      ),
      now(),
      now(),
      now()
    ) ON CONFLICT (provider, provider_id) DO NOTHING;

    -- Ensure user_profile exists
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (existing_uuid, 'demo@ticketmaster.com', 'Demo User')
    ON CONFLICT (id) DO NOTHING;

  END IF;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Demo user fix failed: %', SQLERRM;
END $$;
