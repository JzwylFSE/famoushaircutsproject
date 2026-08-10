"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCut, FaCheckCircle, FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      name: "Classic Fade",
      desc: "Precision taper with smooth gradients",
      icon: <FaCut className="text-4xl text-primary" />,
      image: "/images/22.jpg",
    },
    {
      name: "Executive Trim",
      desc: "Detailed scissor work for the modern professional",
      icon: <FaCheckCircle className="text-4xl text-primary" />,
      image: "/images/twentyone.2.jpg",
    },
  ];

  const testimonials = [
    {
      name: "gigisbizhive",
      text: "No one does it like famous 😍",
      role: "Loyal Client",
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
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000); 
    return () => clearInterval(intervalRef.current);
  }, [currentTestimonial, testimonials.length]);

  return (
    <div className="flex flex-col bg-background min-h-screen text-textmain font-sans selection:bg-primary/20">
      
      {/* --- Section 1: Hero --- */}
      <motion.section
        className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden bg-surface"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/heropic.jpg"
            alt="Luxury Barbershop"
            fill
            className="object-cover opacity-20"
            priority
          />
          {/* Light gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-background/90 to-background z-10" />
        </div>

        <div className="relative z-20 flex flex-col items-center w-full mt-16 max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium tracking-widest uppercase"
          >
            Premium Grooming Experience
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold mb-6 text-textmain tracking-tight leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Famous Haircuts
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl mb-10 max-w-2xl text-textmuted font-light leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Discover iconic styles and experience the famous touch. Uncompromising quality for the modern gentleman.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/contact" 
              className="bg-primary text-white font-medium px-8 py-4 rounded-md hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
            >
              Book Appointment
            </Link>
            <Link 
              href="/gallery" 
              className="border-2 border-primary text-primary font-medium px-8 py-4 rounded-md hover:bg-primary hover:text-white transition-all duration-300"
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Section 2: Bento Grid Showcase --- */}
      <motion.section
        className="w-full py-24 px-4 bg-background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-textmain mb-4">
              Signature Services
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-textmuted text-lg font-light max-w-2xl mx-auto">
              Precision cuts tailored to your unique structure and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="group relative overflow-hidden rounded-2xl bg-surface border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(184,134,11,0.15)] transition-all duration-500 flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full md:w-1/2 h-64 md:h-full min-h-[250px] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="p-10 md:w-1/2 flex flex-col justify-center h-full">
                  <div className="mb-4 bg-white p-3 rounded-full shadow-sm w-fit">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold mb-3 text-textmain">
                    {service.name}
                  </h3>
                  <p className="text-textmuted font-light leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <Link href="/services" className="text-primary font-medium hover:text-secondary inline-flex items-center gap-2 transition-colors">
                    View Details
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Section 3: Social Proof / Testimonials --- */}
      <motion.section
        className="w-full py-24 px-4 bg-surface border-y border-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className="text-primary text-xl" />
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-textmain mb-12">
            Client Experiences
          </h2>

          <div className="relative h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <p className="text-2xl md:text-3xl italic text-textmain mb-8 font-serif leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div>
                  <p className="font-semibold text-textmain uppercase tracking-wider text-sm">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-primary text-xs mt-2 uppercase tracking-widest">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-12 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "w-10 bg-primary"
                    : "w-4 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Section 4: Final CTA --- */}
      <motion.section
        className="w-full py-32 px-4 bg-background text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif text-textmain mb-6">
            Ready for a Change?
          </h2>
          <p className="text-textmuted text-lg mb-10 font-light">
            Secure your appointment today and step into confidence.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-primary text-white font-medium px-10 py-5 rounded-md hover:bg-secondary transition-all duration-300 shadow-xl hover:shadow-primary/30 hover:-translate-y-1 text-lg"
          >
            Book Your Session
          </Link>
        </div>
      </motion.section>
      
    </div>
  );
}