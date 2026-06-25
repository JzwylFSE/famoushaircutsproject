"use client";

import { motion } from "framer-motion";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaInstagram,
  FaExpand,
  FaCompress,
  FaDirections,
} from "react-icons/fa";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Button2 from "@/components/Button2";

const MotionButton2 = motion(Button2);
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const urlService = searchParams.get("service");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    if (urlService) {
      setForm((prev) => ({ ...prev, service: urlService }));
    }
  }, [urlService]);

  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.error(
        "Background logging failed, proceeding to WhatsApp anyway:",
        error,
      );
    }

    const text = `Hello, my name is ${form.name}%0AService: ${form.service}%0ADate: ${form.date}%0APhone: ${form.phone}%0AMessage: ${form.message}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");

    setForm({ name: "", phone: "", service: "", date: "", message: "" });
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* --- Hero Section --- */}
      <motion.section
        className="pt-32 pb-16 px-4 text-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-serif font-bold mb-6 text-[#d4af37] tracking-wider uppercase"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Book Appointment
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-zinc-400 uppercase tracking-[0.2em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Secure your slot or reach out for inquiries
        </motion.p>
      </motion.section>

      {/* --- Contact Grid --- */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form - Luxury Glassmorphism */}
          <motion.div
            className="p-8 md:p-12 bg-zinc-900/30 border border-zinc-800"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif font-bold mb-8 text-white tracking-widest uppercase">
              Client Details
            </h2>
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-700 text-white focus:ring-0 focus:border-[#d4af37] transition-colors peer placeholder-transparent"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 -top-4 text-xs uppercase tracking-widest text-zinc-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#d4af37]"
                >
                  Full Name
                </label>
              </div>

              {/* Phone Input */}
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-700 text-white focus:ring-0 focus:border-[#d4af37] transition-colors peer placeholder-transparent"
                  placeholder="Phone Number"
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
                <label
                  htmlFor="phone"
                  className="absolute left-0 -top-4 text-xs uppercase tracking-widest text-zinc-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#d4af37]"
                >
                  Phone Number
                </label>
              </div>

              {/* Service Dropdown */}
              <div className="relative">
                <label
                  htmlFor="service"
                  className="block mb-2 text-xs uppercase tracking-widest text-zinc-500"
                >
                  Service Needed
                </label>
                <select
                  id="service"
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-700 text-white focus:ring-0 focus:border-[#d4af37] transition-colors appearance-none"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="" className="bg-[#0a0a0a] text-zinc-500">
                    Select a service
                  </option>
                  <option className="bg-[#0a0a0a] text-white">
                    Home Service (₦7000)
                  </option>
                  <option className="bg-[#0a0a0a] text-white">
                    Classic Haircut (₦5000)
                  </option>
                  <option className="bg-[#0a0a0a] text-white">
                    Clean Fade (₦3000)
                  </option>
                  <option className="bg-[#0a0a0a] text-white">
                    Children's Cut (₦2000)
                  </option>
                  <option className="bg-[#0a0a0a] text-white">
                    Lineup & Beard Trim (₦1500)
                  </option>
                  <option className="bg-[#0a0a0a] text-white">
                    Hair Colouring (₦1500)
                  </option>
                  <option className="bg-[#0a0a0a] text-white">
                    Hair Design (₦2000)
                  </option>
                  <option className="bg-[#0a0a0a] text-white">
                    Hair Treatment (₦1500)
                  </option>
                </select>
              </div>

              {/* Date Input */}
              <div className="relative">
                <label
                  htmlFor="date"
                  className="block mb-2 text-xs uppercase tracking-widest text-zinc-500"
                >
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-700 text-white focus:ring-0 focus:border-[#d4af37] transition-colors"
                  required
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              {/* Message Textarea */}
              <div className="relative">
                <textarea
                  id="message"
                  rows="3"
                  className="w-full px-0 py-2 bg-transparent border-0 border-b border-zinc-700 text-white focus:ring-0 focus:border-[#d4af37] transition-colors peer placeholder-transparent resize-none"
                  placeholder="Additional Notes"
                  value={form.message}
                  onChange={handleChange}
                  spellCheck={false}
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 -top-4 text-xs uppercase tracking-widest text-zinc-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#d4af37]"
                >
                  Additional Notes (Optional)
                </label>
              </div>

              {/* Submit Button */}

              <MotionButton2
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8"
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Processing..." : "Book via WhatsApp"}
              </MotionButton2>
            </form>
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
              <h2 className="text-2xl font-serif font-bold mb-8 text-white tracking-widest uppercase">
                Contact Details
              </h2>
              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-[#d4af37] transition-colors">
                    <FaMapMarkerAlt className="text-xl text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-1">
                      Our Location
                    </h3>
                    <p className="text-zinc-300 font-light group-hover:text-white transition-colors">
                      Elekahia Housing Estate, PH
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-[#d4af37] transition-colors">
                    <FaPhone className="text-xl text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-1">
                      Direct Line
                    </h3>
                    <a
                      href="tel:+2348149713412"
                      className="text-zinc-300 font-light hover:text-[#d4af37] transition-colors block"
                    >
                      +234 814 971 3412
                    </a>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d4af37] text-xs uppercase tracking-widest font-bold mt-2 flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <FaWhatsapp className="text-green-500 text-lg" /> Message
                      on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-[#d4af37] transition-colors">
                    <FaInstagram className="text-xl text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-1">
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/famous_haircut01/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 font-light hover:text-[#d4af37] transition-colors"
                    >
                      @famous_haircut01
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-[#d4af37] transition-colors">
                    <FaClock className="text-xl text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-1">
                      Working Hours
                    </h3>
                    <p className="text-zinc-300 font-light leading-relaxed">
                      Mon - Fri: 9:00 AM - 7:00 PM <br />
                      Saturday: 10:00 AM - 5:00 PM <br />
                      <span className="text-[#d4af37] font-semibold text-xs uppercase">
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

      {/* Enhanced Map Section */}
      <motion.section
        className={`w-full ${
          isMapExpanded
            ? "fixed inset-0 z-50 bg-black/90 p-0"
            : "relative py-12 px-4"
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className={`w-full ${isMapExpanded ? "h-full" : ""}`}>
          <div
            className={`relative w-full ${
              isMapExpanded ? "h-full" : "h-64 sm:h-80 md:h-96 lg:h-[500px]"
            } rounded-xl overflow-hidden shadow-xl`}
          >
            {/* Map Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1751297670936!6m8!1m7!1sjWekXspCg2W8szRpQoJ_yw!2m2!1d4.823071742629652!2d7.026558577574137!3f313.0157594936708!4f1.803797468354432!5f0.4000000000000002"
              width="100%"
              height="100%"
              style={{
                border: 0,
                borderRadius: "1rem",
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
                display: "block",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Famous Haircuts Street View"
            />

            {/* Map Controls */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex gap-2 sm:gap-3">
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=4.8230717,7.0265586"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 rounded-full flex items-center justify-center text-sm sm:text-base"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--background)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Get Directions"
              >
                <FaDirections />
              </motion.a>

              <motion.button
                onClick={() => setIsMapExpanded(!isMapExpanded)}
                className="p-2 sm:p-3 rounded-full flex items-center justify-center text-sm sm:text-base"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--background)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={isMapExpanded ? "Minimize Map" : "Expand Map"}
              >
                {isMapExpanded ? <FaCompress /> : <FaExpand />}
              </motion.button>
            </div>

            {/* Location Card */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white p-3 sm:p-4 rounded-lg shadow-md max-w-xs">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <FaMapMarkerAlt style={{ color: "var(--secondary)" }} />
                Famous Haircuts
              </h3>
              <p className="text-xs sm:text-sm mt-1">
                Elekahia Housing Estate, Port Harcourt
              </p>
              <a
                href="https://www.google.com/maps?q=4.8230717,7.0265586"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm mt-2 inline-block"
                style={{ color: "var(--secondary)" }}
              >
                View on Google Maps →
              </a>
            </div>
          </div>

          {isMapExpanded && (
            <motion.button
              onClick={() => setIsMapExpanded(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--background)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FaCompress className="text-sm sm:text-base" />
            </motion.button>
          )}
        </div>
      </motion.section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]"></div>}>
      <ContactPageContent />
    </Suspense>
  );
}
