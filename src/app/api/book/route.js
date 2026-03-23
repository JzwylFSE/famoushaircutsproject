import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    // 1. Receive payload from Frontend
    const body = await request.json();
    const { name, phone, service, date, message } = body;

    if (!name || !phone || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Clean up the service string (e.g., "Classic Haircut (₦5000)" -> "Classic Haircut")
    const serviceName = service.split(' (')[0];

    // 2. Find the Service ID from the database
    const { data: serviceData, error: serviceError } = await supabase
      .from('tbl_services')
      .select('service_id')
      .eq('service_name', serviceName)
      .single();

    if (serviceError || !serviceData) {
      return NextResponse.json({ error: 'Invalid service selected' }, { status: 400 });
    }

    // 3. Upsert Client Logic (Check if exists, if not, create)
    let current_client_id;

    // Check for existing client by phone number
    const { data: existingClient } = await supabase
      .from('tbl_clients')
      .select('client_id')
      .eq('phone_number', phone)
      .single();

    if (existingClient) {
      current_client_id = existingClient.client_id;
    } else {
      // Insert new client
      const { data: newClient, error: clientError } = await supabase
        .from('tbl_clients')
        .insert([{ full_name: name, phone_number: phone }])
        .select()
        .single();

      if (clientError) throw clientError;
      current_client_id = newClient.client_id;
    }

    // 4. Create the Appointment
    const { error: appointmentError } = await supabase
      .from('tbl_appointments')
      .insert([{
        client_id: current_client_id,
        service_id: serviceData.service_id,
        appointment_date: date || new Date().toISOString(), // Use provided date or fallback to now
        client_message: message,
        status: 'Pending'
      }]);

    if (appointmentError) throw appointmentError;

    // 5. Return Success
    return NextResponse.json({ success: true, message: 'Appointment booked successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}