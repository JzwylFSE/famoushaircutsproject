"use server";

import { createClient } from '@/utils/supabase/server';

export async function verifyAndBookAppointment({ reference, serviceId, date, message, clientId }) {
  try {
    const supabase = await createClient();
    const secret = process.env.PAYSTACK_SECRET_KEY;
    
    if (!secret) {
      throw new Error("Paystack secret key is not configured.");
    }

    // 1. Verify the transaction with Paystack API securely on the backend
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    });

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
      throw new Error("Payment verification failed. The transaction may not have been successful.");
    }

    const amountPaid = data.data.amount / 100; // Convert from Kobo to Naira

    // 2. Check if this appointment already exists (in case of double click or webhook firing instantly)
    const { data: existing } = await supabase
      .from('tbl_appointments')
      .select('*')
      .eq('payment_reference', reference)
      .maybeSingle();

    if (existing) {
      return { success: true, message: "Appointment already recorded." };
    }

    // 3. Insert the new appointment into Supabase
    const { error: dbError } = await supabase.from('tbl_appointments').insert({
      client_id: clientId,
      service_id: parseInt(serviceId, 10),
      appointment_date: date,
      payment_reference: reference,
      amount_paid: amountPaid,
      status: 'Paid',
      client_message: message || null
    });

    if (dbError) {
      console.error("Database Insertion Error:", dbError);
      throw new Error(`DB Error: ${dbError.message} | Details: ${dbError.details || 'None'}`);
    }

    return { success: true, message: "Appointment booked successfully!" };
  } catch (error) {
    console.error("Booking Action Error:", error);
    return { success: false, error: error.message };
  }
}
