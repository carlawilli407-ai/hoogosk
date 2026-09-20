import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ormhfqmkufzpmwicycqj.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbG...ljKQ';

async function seed() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Find user by email
  const { data: userData, error: userError } = await supabase
    .from('auth.users')
    .select('id, email')
    .eq('email', 'sandrawilli4042@gmail.com')
    .single();

  if (userError) {
    console.error('Error looking up user:', userError.message);
    process.exit(1);
  }
  if (!userData) {
    console.error('User sandrawilli4042@gmail.com not found in auth.users');
    process.exit(1);
  }

  console.log('Found user:', userData.id, userData.email);

  const userId = userData.id;

  // 2. Get existing orders for this user
  const { data: existingOrders } = await supabase
    .from('orders')
    .select('id, order_number, event_title')
    .eq('user_id', userId);

  const existingTitles = (existingOrders || []).map((o) => o.event_title);
  console.log('Existing orders:', existingOrders?.length || 0);
  existingTitles.forEach((t) => console.log('  -', t));

  // 3. Define all 4 orders
  const allOrders = [
    {
      user_id: userId,
      order_number: '51-992301/CA',
      event_title: 'Bruno Mars — The Romantic Tour',
      event_date: 'SUN, SEP 20, 2026',
      event_time: '7:00 PM',
      venue: 'Hard Rock Stadium',
      city: 'Miami, FL',
      event_image: 'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
      ticket_count: 3,
      total_amount: 630,
      order_status: 'upcoming',
      tickets: [
        { section: '102', row_label: 'Row G', seat: '12', barcode: '012345678901' },
        { section: '102', row_label: 'Row G', seat: '13', barcode: '012345678902' },
        { section: '102', row_label: 'Row G', seat: '14', barcode: '012345678903' },
      ],
    },
    {
      user_id: userId,
      order_number: '51-884210/CA',
      event_title: 'Bruno Mars — The Romantic Tour',
      event_date: 'WED, SEP 23, 2026',
      event_time: '7:30 PM',
      venue: 'Alamodome',
      city: 'San Antonio, TX',
      event_image: 'https://s1.ticketm.net/dam/a/386/bdd143e5-4726-49af-9523-7927682c9386_RETINA_PORTRAIT_3_2.jpg',
      ticket_count: 4,
      total_amount: 840,
      order_status: 'upcoming',
      tickets: [
        { section: '113', row_label: 'Row 26', seat: '16', barcode: '012345678904' },
        { section: '113', row_label: 'Row 26', seat: '17', barcode: '012345678905' },
        { section: '113', row_label: 'Row 26', seat: '18', barcode: '012345678906' },
        { section: '113', row_label: 'Row 26', seat: '19', barcode: '012345678907' },
      ],
    },
    {
      user_id: userId,
      order_number: '51-774502/CA',
      event_title: "Rod Wave — Don't Look Down Tour",
      event_date: 'SAT, SEP 26, 2026',
      event_time: '8:00 PM',
      venue: 'American Airlines Center',
      city: 'Dallas, TX',
      event_image: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
      ticket_count: 3,
      total_amount: 480,
      order_status: 'upcoming',
      tickets: [
        { section: '119', row_label: 'Row 12', seat: '5', barcode: '012345678908' },
        { section: '119', row_label: 'Row 12', seat: '6', barcode: '012345678909' },
        { section: '119', row_label: 'Row 12', seat: '7', barcode: '012345678910' },
      ],
    },
    {
      user_id: userId,
      order_number: '51-665109/CA',
      event_title: "Rod Wave — Don't Look Down Tour",
      event_date: 'THU, OCT 31, 2026',
      event_time: '8:30 PM',
      venue: 'United Center',
      city: 'Chicago, IL',
      event_image: 'https://s1.ticketm.net/dam/a/f72/4c583e8a-6739-4fb2-9861-e73978841f72_RETINA_PORTRAIT_3_2.jpg',
      ticket_count: 3,
      total_amount: 510,
      order_status: 'upcoming',
      tickets: [
        { section: '108', row_label: 'Row D', seat: '10', barcode: '012345678911' },
        { section: '108', row_label: 'Row D', seat: '11', barcode: '012345678912' },
        { section: '108', row_label: 'Row D', seat: '12', barcode: '012345678913' },
      ],
    },
  ];

  // 4. Insert missing orders
  let insertedCount = 0;
  for (const order of allOrders) {
    if (existingTitles.includes(order.event_title)) {
      console.log(`Skipping (exists): ${order.event_title} (${order.order_number})`);
      continue;
    }

    // Insert order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: order.user_id,
        order_number: order.order_number,
        event_title: order.event_title,
        event_date: order.event_date,
        event_time: order.event_time,
        venue: order.venue,
        city: order.city,
        event_image: order.event_image,
        ticket_count: order.ticket_count,
        total_amount: order.total_amount,
        order_status: order.order_status,
      })
      .select('id')
      .single();

    if (orderError) {
      console.error(`Error inserting ${order.event_title}:`, orderError.message);
      continue;
    }

    console.log(`Inserted order: ${order.event_title} (id=${orderData.id})`);
    insertedCount++;

    // Insert tickets for this order
    let ticketSeq = 1;

    for (const ticket of order.tickets) {
      const ticketId = `manual-${Date.now()}-${ticketSeq}`;
      const { error: ticketError } = await supabase
        .from('tickets')
        .insert({
          id: ticketId,
          order_id: orderData.id,
          section: ticket.section,
          row_label: ticket.row_label,
          seat: ticket.seat,
          barcode: ticket.barcode,
          ticket_type: 'GENERAL APT',
          status: 'active',
        });

      if (ticketError) {
        console.error(`  Error inserting ticket ${ticket.seat}:`, ticketError.message);
      } else {
        console.log(`  - Ticket: ${ticket.section}/${ticket.row_label}/${ticket.seat} (${ticket.barcode})`);
      }
      ticketSeq++;
    }
  }

  console.log(`\nDone. Inserted ${insertedCount} new order(s).`);
  console.log(`Total orders for user now: ${(existingOrders || []).length + insertedCount}`);
}

seed().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
