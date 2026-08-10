"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaLock,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePaystackPayment } from "react-paystack";
import { createClient } from "@/utils/supabase/client";
import { verifyAndBookAppointment } from "@/app/actions/booking";

// Hardcoded for now to map prices to IDs. In production, fetch from tbl_services.
const SERVICES = [
  { id: 1, name: "Home Service", price: 7000 },
  { id: 2, name: "Classic Haircut", price: 5000 },
  { id: 3, name: "Clean Fade", price: 3000 },
  { id: 4, name: "Children's Cut", price: 2000 },
  { id: 5, name: "Lineup & Beard Trim", price: 1500 },
  { id: 6, name: "Hair Colouring", price: 1500 },
  { id: 7, name: "Hair Design", price: 2000 },
  { id: 8, name: "Hair Treatment", price: 1500 },
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const urlService = searchParams.get("service");
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const supabase = createClient();

  // Booking Flow States
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentRef, setPaymentRef] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase.from('tbl_clients').select('*').eq('client_id', session.user.id).single();
        if (data) setProfile(data);
      }
    };
    getSession();
  }, [supabase]);

  const [form, setForm] = useState({
    serviceId: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    if (urlService) {
      const found = SERVICES.find(s => s.name.toLowerCase().includes(urlService.toLowerCase()));
      if (found) {
        setForm((prev) => ({ ...prev, serviceId: found.id.toString() }));
      }
    }
  }, [urlService]);
  
  const selectedService = SERVICES.find(s => s.id.toString() === form.serviceId);
  const amountToPay = selectedService ? selectedService.price : 0;

  const paystackConfig = {
    reference: `FH_${new Date().getTime().toString()}`,
    email: user?.email || "",
    amount: amountToPay * 100, // Paystack expects Kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder",
    metadata: {
      service_id: form.serviceId,
      appointment_date: form.date,
      message: form.message,
      client_id: user?.id,
    }
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onSuccess = async (reference) => {
    setIsProcessing(true);
    try {
      // Pass the reference and details to our secure Server Action
      const result = await verifyAndBookAppointment({
        reference: reference.reference,
        serviceId: form.serviceId,
        date: form.date,
        message: form.message,
        clientId: user.id
      });

      if (result.success) {
        setPaymentRef(reference.reference);
        setShowSuccessModal(true);
      } else {
        alert(`Booking failed to record: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred while saving your appointment.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onClose = () => {
    // Fired when user closes the Paystack popup without completing payment
    alert("Payment cancelled. Your appointment was not booked.");
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    if (amountToPay === 0) return alert("Please select a valid service.");
    initializePayment({ onSuccess, onClose });
  }

  return (
    <div className="min-h-screen bg-background text-textmain pt-24 pb-16 relative">
      
      {/* --- SUCCESS MODAL OVERLAY --- */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface border border-gray-200 rounded-2xl p-8 md:p-10 max-w-lg w-full shadow-2xl text-center relative overflow-hidden"
            >
              {/* Decorative top accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
              
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-5xl text-primary" />
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-textmain mb-2">Booking Confirmed!</h2>
              <p className="text-textmuted mb-8">Your payment was successful and your slot is reserved.</p>
              
              <div className="bg-background border border-gray-100 rounded-lg p-5 mb-8 text-left space-y-3 shadow-inner">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-textmuted text-xs uppercase tracking-widest font-semibold">Service</span>
                  <span className="font-semibold text-textmain">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-textmuted text-xs uppercase tracking-widest font-semibold">Date & Time</span>
                  <span className="font-semibold text-textmain">{new Date(form.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textmuted text-xs uppercase tracking-widest font-semibold">Reference</span>
                  <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">{paymentRef}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-sm rounded-md shadow-md hover:bg-secondary transition-colors"
              >
                Go to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ----------------------------- */}

      <motion.section
        className="px-4 text-center relative mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-serif font-bold mb-4 text-textmain tracking-tight uppercase"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Book Appointment
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base max-w-2xl mx-auto text-textmuted uppercase tracking-widest font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Secure your slot with upfront financial commitment
        </motion.p>
      </motion.section>

      <motion.section
        className="px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div
            className="p-8 md:p-12 bg-surface border border-gray-200 shadow-sm rounded-xl relative"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {isProcessing && (
              <div className="absolute inset-0 z-50 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl border border-primary/20">
                <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
                <p className="text-textmain font-serif font-semibold animate-pulse">Verifying Payment...</p>
              </div>
            )}

            <h2 className="text-2xl font-serif font-bold mb-8 text-textmain uppercase tracking-widest">
              Session Details
            </h2>

            {!user ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-[300px] bg-background border border-gray-100 rounded-lg">
                <FaLock className="text-4xl text-textmuted mb-4" />
                <h3 className="text-xl font-serif mb-2">Authentication Required</h3>
                <p className="text-textmuted text-sm mb-6 max-w-xs">You must be securely authenticated to access the financial booking gateway.</p>
                <Link href="/login" className="px-6 py-3 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-md shadow-md hover:bg-secondary transition-colors">
                  Login to Book
                </Link>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <label htmlFor="serviceId" className="block mb-2 text-xs uppercase tracking-widest text-textmuted font-semibold">
                    Select Service
                  </label>
                  <select
                    id="serviceId"
                    className="w-full px-4 py-3 bg-background border border-gray-200 text-textmain rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none"
                    value={form.serviceId}
                    onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
                    required
                  >
                    <option value="" disabled>Choose a signature service</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} - ₦{s.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <label htmlFor="date" className="block mb-2 text-xs uppercase tracking-widest text-textmuted font-semibold">
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    className="w-full px-4 py-3 bg-background border border-gray-200 text-textmain rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block mb-2 text-xs uppercase tracking-widest text-textmuted font-semibold">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows="3"
                    className="w-full px-4 py-3 bg-background border border-gray-200 text-textmain rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    placeholder="E.g., specific fade instructions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    spellCheck={false}
                  />
                </div>

                <div className="pt-4 mt-8 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-textmuted uppercase tracking-widest font-semibold">Total Deposit</p>
                    <p className="text-3xl font-serif font-bold text-textmain">₦{amountToPay.toLocaleString()}</p>
                  </div>
                  <motion.button
                    type="submit"
                    className="px-8 py-4 bg-transparent border border-textmain text-textmain font-bold uppercase tracking-widest text-sm rounded-md shadow-sm hover:bg-primary hover:border-primary hover:text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.98 }}
                    disabled={amountToPay === 0 || isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Pay & Book"}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Info Side Panel */}
          <motion.div
            className="space-y-12 flex flex-col justify-center"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8 text-textmain tracking-widest uppercase">
                Studio Details
              </h2>
              <div className="space-y-8">
                
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-gray-200 bg-surface flex items-center justify-center group-hover:border-primary transition-colors shadow-sm">
                    <FaMapMarkerAlt className="text-xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-textmuted font-semibold mb-1">
                      Our Location
                    </h3>
                    <p className="text-textmain font-medium">
                      Elekahia Housing Estate, PH
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-gray-200 bg-surface flex items-center justify-center group-hover:border-primary transition-colors shadow-sm">
                    <FaPhone className="text-xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-textmuted font-semibold mb-1">
                      Concierge Line
                    </h3>
                    <a
                      href="tel:+2348149713412"
                      className="text-textmain font-medium hover:text-primary transition-colors block"
                    >
                      +234 814 971 3412
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-gray-200 bg-surface flex items-center justify-center group-hover:border-primary transition-colors shadow-sm">
                    <FaInstagram className="text-xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-textmuted font-semibold mb-1">
                      Portfolio
                    </h3>
                    <a
                      href="https://www.instagram.com/famous_haircut01/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-textmain font-medium hover:text-primary transition-colors"
                    >
                      @famous_haircut01
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-gray-200 bg-surface flex items-center justify-center group-hover:border-primary transition-colors shadow-sm">
                    <FaClock className="text-xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-textmuted font-semibold mb-1">
                      Operating Hours
                    </h3>
                    <p className="text-textmain font-medium leading-relaxed">
                      Mon - Fri: 9:00 AM - 7:00 PM <br />
                      Saturday: 10:00 AM - 5:00 PM <br />
                      <span className="text-primary font-bold text-xs uppercase mt-1 block tracking-wider">
                        Sunday: Closed
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
