import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Use a Service Role Key here to bypass RLS since this is a backend webhook
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');
    const secret = process.env.PAYSTACK_SECRET_KEY || 'sk_test_placeholder';

    // Verify Paystack Signature (HMAC SHA512)
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
    
    if (hash !== signature) {
      console.error("Invalid Paystack signature");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Only process successful charges
    if (event.event === 'charge.success') {
      const { reference, customer, metadata, amount } = event.data;
      const { service_id, appointment_date, message, client_id } = metadata;

      // 1. Insert into Supabase tbl_appointments
      const { error: dbError } = await supabase.from('tbl_appointments').insert({
        client_id: client_id,
        service_id: parseInt(service_id, 10),
        appointment_date: appointment_date,
        payment_reference: reference,
        amount_paid: amount / 100, // Convert Kobo back to Naira
        status: 'Paid',
        notes: message || null
      });

      if (dbError) {
        console.error("Database Insertion Error:", dbError);
        return NextResponse.json({ message: "Database error" }, { status: 500 });
      }

      // 2. Trigger Resend Email Microservice
      try {
        await resend.emails.send({
          from: 'Famous Haircuts <onboarding@resend.dev>', // Should use verified domain in production
          to: customer.email,
          subject: 'Appointment Confirmed - Famous Haircuts',
          html: `
            <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
              <h1 style="color: #B8860B; text-align: center;">FAMOUS HAIRCUTS</h1>
              <h2 style="color: #333;">Booking Confirmed</h2>
              <p>Hello,</p>
              <p>Your payment of <strong>₦${amount / 100}</strong> was successful. Your appointment has been confirmed!</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Reference:</strong> ${reference}</p>
                <p><strong>Date & Time:</strong> ${new Date(appointment_date).toLocaleString()}</p>
                <p><strong>Location:</strong> Elekahia Housing Estate, Port Harcourt</p>
              </div>
              <p>If you have any questions, please contact us on WhatsApp: +234 814 971 3412.</p>
              <p>We look forward to seeing you!</p>
            </div>
          `
        });
      } catch (emailError) {
        console.error("Resend Email Error:", emailError);
        // We still return 200 to Paystack so it doesn't retry
      }

      return NextResponse.json({ status: "success" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
