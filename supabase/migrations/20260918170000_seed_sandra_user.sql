-- ============================================================
-- Migration: seed_sandra_user
-- Creates user sandrawilli4042@gmail.com with a BTS ticket
-- ============================================================

DO $$
DECLARE
  sandra_uuid UUID;
  existing_uuid UUID;
  bts_order_uuid UUID;
BEGIN
  -- Check if user already exists
  SELECT id INTO existing_uuid
  FROM auth.users
  WHERE email = 'sandrawilli4042@gmail.com'
  LIMIT 1;

  IF existing_uuid IS NULL THEN
    -- Generate stable UUIDs
    sandra_uuid := '00000000-0000-0000-0003-000000000001'::UUID;
    bts_order_uuid := '00000000-0000-0000-0004-000000000001'::UUID;

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
      sandra_uuid,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'sandrawilli4042@gmail.com',
      crypt('tope0112', gen_salt('bf', 10)),
      now(),
      now(),
      now(),
      jsonb_build_object('full_name', 'Sandra Williams'),
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']::TEXT[]),
      false,
      false,
      '', '', '', '', '', 0, '', null, '', ''
    ) ON CONFLICT (id) DO UPDATE
      SET encrypted_password = crypt('tope0112', gen_salt('bf', 10)),
          email_confirmed_at = COALESCE(auth.users.email_confirmed_at, now()),
          updated_at = now();

    -- Insert identity record (required for signInWithPassword)
    INSERT INTO auth.identities (
      id, user_id, provider_id, provider, identity_data,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      sandra_uuid,
      sandra_uuid,
      'sandrawilli4042@gmail.com',
      'email',
      jsonb_build_object(
        'sub', sandra_uuid::TEXT,
        'email', 'sandrawilli4042@gmail.com',
        'email_verified', true,
        'provider', 'email'
      ),
      now(),
      now(),
      now()
    ) ON CONFLICT (provider, provider_id) DO NOTHING;

    -- Ensure user_profile exists
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (sandra_uuid, 'sandrawilli4042@gmail.com', 'Sandra Williams')
    ON CONFLICT (id) DO NOTHING;

    -- Create BTS order
    INSERT INTO public.orders (
      id, user_id, order_number, event_title, event_date, event_time,
      venue, city, event_image, ticket_count, total_amount, order_status
    ) VALUES (
      bts_order_uuid,
      sandra_uuid,
      '51-884201/CA',
      'BTS World Tour ''MOTS: ON Stage'' in Los Angeles',
      'Sat, Nov 15, 2026',
      '7:30 PM',
      'SoFi Stadium',
      'Inglewood, CA',
      'https://img.rocket.new/generatedImages/rocket_gen_img_4751de4d4-1789743264516.png',
      1,
      185.00,
      'upcoming'::public.order_status
    ) ON CONFLICT (id) DO NOTHING;

    -- Create BTS ticket with valid section, row, and seat
    INSERT INTO public.tickets (
      id, order_id, user_id, section, row_label, seat, barcode
    ) VALUES (
      '00000000-0000-0000-0005-000000000001'::UUID,
      bts_order_uuid,
      sandra_uuid,
      'Section 214',
      'Row C',
      'Seat 12',
      'TM-BTS-SW-214-C12'
    ) ON CONFLICT (id) DO NOTHING;

  ELSE
    -- User already exists — update password and ensure email confirmed
    UPDATE auth.users
    SET
      encrypted_password = crypt('tope0112', gen_salt('bf', 10)),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      updated_at = now()
    WHERE email = 'sandrawilli4042@gmail.com';

    -- Ensure identity record exists
    INSERT INTO auth.identities (
      id, user_id, provider_id, provider, identity_data,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      existing_uuid,
      existing_uuid,
      'sandrawilli4042@gmail.com',
      'email',
      jsonb_build_object(
        'sub', existing_uuid::TEXT,
        'email', 'sandrawilli4042@gmail.com',
        'email_verified', true,
        'provider', 'email'
      ),
      now(),
      now(),
      now()
    ) ON CONFLICT (provider, provider_id) DO NOTHING;

    -- Ensure user_profile exists
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (existing_uuid, 'sandrawilli4042@gmail.com', 'Sandra Williams')
    ON CONFLICT (id) DO NOTHING;

    -- Create BTS order if it doesn't exist for this user
    bts_order_uuid := gen_random_uuid();

    IF NOT EXISTS (
      SELECT 1 FROM public.orders
      WHERE user_id = existing_uuid AND order_number = '51-884201/CA'
    ) THEN
      INSERT INTO public.orders (
        id, user_id, order_number, event_title, event_date, event_time,
        venue, city, event_image, ticket_count, total_amount, order_status
      ) VALUES (
        bts_order_uuid,
        existing_uuid,
        '51-884201/CA',
        'BTS World Tour ''MOTS: ON Stage'' in Los Angeles',
        'Sat, Nov 15, 2026',
        '7:30 PM',
        'SoFi Stadium',
        'Inglewood, CA',
        'https://img.rocket.new/generatedImages/rocket_gen_img_4751de4d4-1789743264516.png',
        1,
        185.00,
        'upcoming'::public.order_status
      ) ON CONFLICT (order_number) DO NOTHING;

      -- Create BTS ticket
      INSERT INTO public.tickets (
        order_id, user_id, section, row_label, seat, barcode
      ) VALUES (
        bts_order_uuid,
        existing_uuid,
        'Section 214',
        'Row C',
        'Seat 12',
        'TM-BTS-SW-214-C12'
      );
    END IF;

  END IF;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Sandra user seed failed: %', SQLERRM;
END $$;
