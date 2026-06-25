"use client";

import { motion } from "framer-motion";
import { FaQuoteLeft, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Button2 from "./../../Components/Button2";

const testimonials = [
  {
    name: "@gigisbizhive",
    comment: "No one does it like famous 😍",
    role: "Verified Client",
  },
  {
    name: "@kaseh_akobe",
    comment: "Only one Famous haircuts",
    role: "Verified Client",
  },
  {
    name: "@thatdanieldon",
    comment: "Number 1 barber! 🙌🔥",
    role: "Verified Client",
  },
  {
    name: "@ericzii",
    comment: "The flyest barber around 🙌",
    role: "Verified Client",
  },
  {
    name: "@ericzii",
    comment: "My plug",
    role: "Verified Client",
  },
  {
    name: "@kordeeishim",
    comment: "Always on point with the cuts!",
    role: "Verified Client",
  },
];

export default function TestimonialsPage() {
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
          Client Stories
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-zinc-400 uppercase tracking-[0.2em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Real words from those who have experienced the standard
        </motion.p>
      </motion.section>

      {/* --- Testimonials Grid --- */}
      <motion.section
        className="pb-24 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-[#d4af37]/50 transition-all duration-500 group flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -15px rgba(212, 175, 55, 0.1)",
                }}
              >
                {/* Background Quote Icon */}
                <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-[#d4af37] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />

                {/* Quote Content */}
                <div className="mb-8 relative z-10">
                  <p className="text-zinc-300 font-light text-lg md:text-xl leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex items-center border-t border-zinc-800/50 pt-5 mt-auto relative z-10">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mr-4">
                    <FaInstagram className="text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-[#d4af37] font-bold tracking-widest text-sm uppercase">
                      {t.name}
                    </p>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Conviction CTA Section --- */}
      <motion.section
        className="py-24 px-4 text-center bg-zinc-950 border-t border-zinc-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl md:text-5xl font-serif text-white mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Experience It Yourself
          </motion.h2>
          <p className="text-zinc-400 mb-10 uppercase tracking-widest text-sm">
            Don't just read about it. Secure your appointment today.
          </p>
          <Button2 href="/contact">Book Appointment</Button2>
        </div>
      </motion.section>
    </div>
  );
}
