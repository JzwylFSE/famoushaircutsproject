"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the contact form with SSR disabled.
// This is strictly required because react-paystack uses 'window' during initialization
// which crashes the Next.js server-side rendering process.
const ContactForm = dynamic(() => import('./ContactForm'), { ssr: false });

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 pb-16 flex justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <ContactForm />
    </Suspense>
  );
}
