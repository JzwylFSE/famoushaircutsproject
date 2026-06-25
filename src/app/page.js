"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaCamera, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Button1 from "@/components/Button1";
import Button2 from "@/components/Button2";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function Home() {
  const services = [
    {
      name: "Taper Cut",
      desc: "Sharp, clean lines with gradual fading",
      icon: (
        <Image
          src="/images/22.jpg"
          alt="Taper Cut"
          width={140}
          height={140}
          className="rounded-full object-cover border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)] aspect-square"
        />
      ),
    },
    {
      name: "Low Fade",
      desc: "Classic rounded fade for a timeless style",
      icon: (
        <Image
          src="/images/twentyone.2.jpg"
          alt="Low Fade"
          width={140}
          height={140}
          className="rounded-full object-cover border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)] aspect-square"
        />
      ),
    },
    {
      name: "Home Service",
      desc: "Premium cuts at your convenience",
      icon: (
        <div className="w-[140px] h-[140px] rounded-full border-2 border-[#d4af37]/30 group-hover:border-[#d4af37] bg-zinc-900/80 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
          <FaHome className="text-6xl text-[#d4af37]" />
        </div>
      ),
    },
  ];

  const testimonials = [
    {
      name: "gigisbizhive",
      text: "No one does it like famous 😍",
      role: "Loyal Client",
    },
    {
      name: "kaseh_akobe",
      text: "Only one Famous haircuts",
      role: "Returning Client",
    },
    {
      name: "thatdanieldon",
      text: "Number 1 barber! 🙌🔥",
      role: "VIP Client",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const intervalRef = useRef();

  // Auto-slide logic
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 4000); 
    return () => clearInterval(intervalRef.current);
  }, [currentTestimonial, testimonials.length]);

  const galleryImages = ["/images/transform1.jpg", "/images/transform2.jpg"];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <div className="flex flex-col bg-[#0a0a0a] min-h-screen">
      {/* --- Section 1: Hero --- */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/heropic.jpg"
          alt="Luxury Barbershop Background"
          fill
          className="object-cover z-0"
          priority
        />
        {/* Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/60 to-[#0a0a0a] z-10" />

        <div className="relative z-20 flex flex-col items-center w-full mt-16">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-6 text-center text-[#d4af37] tracking-wider uppercase"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            Famous Haircuts
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg mb-10 text-center max-w-xl text-zinc-300 uppercase tracking-[0.2em]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            Discover iconic styles and experience the famous touch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button2 href="/contact">Book Now</Button2>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Section 2: Passion --- */}
      <motion.section
        className="w-full py-24 px-4 bg-[#0a0a0a]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[#d4af37] mb-8 tracking-wide">
            My Craft, My Passion
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-zinc-400 font-light">
            <span className="text-white font-normal block mb-4 text-2xl font-serif italic">
              "Hair is my canvas, scissors are my brush."
            </span>
            Every cut is a chance to transform not just appearances, but
            confidence. That moment when the cape comes off and the client
            smiles—that is why I do this.
          </p>
        </div>
      </motion.section>

      {/* --- Section 3: Services --- */}
      <motion.section
        className="w-full py-24 px-4 bg-zinc-950 border-y border-zinc-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-wider">
              Signature Services
            </h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">
              Precision cuts tailored to your style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="p-10 text-center bg-zinc-900/40 border border-zinc-800 hover:border-[#d4af37]/50 transition-colors duration-500 flex flex-col items-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Removed the fixed h/w and grayscale classes here so the 140px image fits perfectly */}
                <div className="mb-8 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white uppercase tracking-wider">
                  {service.name}
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button1 href="/services">View All Services</Button1>
          </div>
        </div>
      </motion.section>

      {/* --- Section 4: Gallery CTA --- */}
      <motion.section
        className="w-full py-32 px-4 relative overflow-hidden bg-[#0a0a0a]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={galleryImages[bgIndex]}
            alt="Gallery background"
            fill
            className="object-cover opacity-20 transition-opacity duration-1000 ease-in-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FaCamera className="text-4xl mx-auto mb-8 text-[#d4af37]" />
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
            Feel the Famous Experience
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto font-light">
            See the transformations that keep clients coming back.
          </p>
          <Button2 href="/gallery" className="inline-flex items-center gap-3">
            View Gallery
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button2>
        </div>
      </motion.section>

      {/* --- Section 5: Testimonials --- */}
      <motion.section
        className="w-full py-24 px-4 bg-[#0a0a0a] border-t border-zinc-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#d4af37] mb-4 tracking-wider">
              Client Stories
            </h2>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">
              Don't just take our word for it
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="w-full text-center"
              >
                <FaQuoteLeft className="text-3xl mx-auto mb-6 text-zinc-800" />
                <p className="text-xl md:text-2xl italic text-white mb-8 font-serif leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div>
                  <p className="font-bold text-[#d4af37] uppercase tracking-widest text-sm">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wider">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-1 transition-all duration-300 ${
                  index === currentTestimonial
                    ? "w-8 bg-[#d4af37]"
                    : "w-4 bg-zinc-800"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Button1 href="/testimonials">Read All Reviews</Button1>
          </div>
        </div>
      </motion.section>
    </div>
  );
}