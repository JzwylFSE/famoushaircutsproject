"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaHome, FaCamera, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

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
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      ),
    },
    {
      name: "Low Fade",
      desc: "Classic rounded fade for a timeless style",
      icon: (
        <Image
          src="/images/twentyone.2.jpg"
          alt="Taper Cut"
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      ),
    },
    {
      name: "Home Service",
      icon: <FaHome />,
      desc: "Premium cuts at your convenience",
    },
  ];

  const testimonials = [
    {
      name: "gigisbizhive",
      text: "No one does like like famous 😍",
      role: "",
    },
    {
      name: "kaseh_akobe",
      text: "only one Famous haircuts",
      role: "",
    },
    {
      name: "thatdanieldon",
      text: "Number 1 barber! 🙌🔥",
      role: "",
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
    }, 3000);

    // Cleanup on unmount or when currentTestimonial changes
    return () => clearInterval(intervalRef.current);
  }, [currentTestimonial, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const galleryImages = ["/images/transform1.jpg", "/images/transform2.jpg"];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 relative"
        style={{
          backgroundColor: "var(--background)",
          overflow: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <Image
          src="/images/heropic.jpg"
          alt="Hero background"
          fill
          style={{
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.5,
          }}
          priority
        />
        {/* Overlay for content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-center"
            style={{ color: "var(--secondary)" }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
          >
            Welcome to Famous Haircut
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl mb-6 text-center max-w-xl"
            style={{ color: "var(--primary)" }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
          >
            Discover iconic styles and trends.
          </motion.p>
          {/* Book Now button */}
          <motion.a
            href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I&apos;d%20like%20to%20book%20a%20haircut`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 sm:px-6 sm:py-3 rounded text-base sm:text-lg font-semibold inline-block"
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--white)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 16px 0 var(--secondary)",
            }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Book Now
          </motion.a>
        </div>
      </motion.section>

      {/* Section 2: Passion */}
      <motion.section
        className="w-full py-20 px-4"
        style={{ backgroundColor: "var(--accent)" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "var(--primary)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              My Craft, My Passion
            </motion.h2>

            <motion.p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--primary)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span
                className="font-semibold"
                style={{ color: "var(--secondary)" }}
              >
                Hair is my canvas, scissors are my brush.
              </span>{" "}
              Every cut is a chance to transform not just appearances, but
              confidence. That moment when the cape comes off and the client
              smiles - that's why I do this.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Section 3: Services */}
      <motion.section
        className="w-full py-20 px-4"
        style={{ backgroundColor: "var(--background)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--secondary)" }}
            >
              Signature Services
            </motion.h2>
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--primary)" }}
            >
              Precision cuts tailored to your style
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="p-6 rounded-lg text-center"
                style={{
                  backgroundColor: "var(--accent)",
                  border: "2px solid var(--secondary)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div
                  className="text-3xl mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-full"
                  style={{
                    color: "var(--secondary)",
                    border: "2px solid var(--secondary)",
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--primary)" }}
                >
                  {service.name}
                </h3>
                <p style={{ color: "var(--primary)" }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* --- View All Services button --- */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/services"
              className="inline-block px-8 py-3 rounded-md font-medium text-lg"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--background)",
                boxShadow: "0 2px 8px 0 var(--secondary)",
                transition: "box-shadow 0.3s",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 16px 0 var(--secondary)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              View All Services
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 4: Gallery CTA */}
      <motion.section
        className="w-full py-24 px-4 relative overflow-hidden"
        style={{ backgroundColor: "var(--primary)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Layered background images */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={galleryImages[bgIndex]}
            alt="Gallery background"
            fill
            style={{
              objectFit: "cover",
              zIndex: 0,
              opacity: 0.35,
              transition: "opacity 0.8s",
            }}
            priority
          />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FaCamera
              className="text-4xl mx-auto mb-6"
              style={{ color: "var(--secondary)" }}
            />
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "var(--background)" }}
            >
              Feel the Famous Experience
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "var(--accent)" }}
            >
              See the transformations that keep clients coming back
            </p>
            {/* View Gallery button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a
                href="/gallery"
                className="px-8 py-3 rounded-md font-medium text-lg inline-flex items-center gap-2"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--background)",
                }}
              >
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
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 5: Testimonials */}
      <motion.section
        className="w-full py-20 px-4"
        style={{ backgroundColor: "var(--accent)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--primary)" }}
            >
              Client Stories
            </motion.h2>
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--primary)" }}
            >
              Don&apos;t just take our word for it
            </motion.p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Testimonial Card */}
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-background p-8 rounded-lg shadow-lg"
              style={{ border: "2px solid var(--secondary)" }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-2"
                  style={{ borderColor: "var(--secondary)" }}
                >
                  {/* Replace with your actual image paths if available */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl">👦</span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <FaQuoteLeft
                    className="text-2xl mb-4 mx-auto md:mx-0"
                    style={{ color: "var(--secondary)" }}
                  />
                  <p
                    className="text-lg italic mb-4"
                    style={{ color: "var(--primary)" }}
                  >
                    &quot;{testimonials[currentTestimonial].text}&quot;
                  </p>
                  <div>
                    <p
                      className="font-bold"
                      style={{ color: "var(--secondary)" }}
                    >
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm" style={{ color: "var(--primary)" }}>
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "w-6" : ""
                  }`}
                  style={{
                    backgroundColor: "var(--secondary)",
                    opacity: index === currentTestimonial ? 1 : 0.5,
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* See More Testimonials Button */}
            <div className="flex justify-center mt-8">
              <motion.a
                href="/testimonials"
                className="px-6 py-2 rounded-md font-semibold text-base"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--background)",
                  boxShadow: "0 2px 8px 0 var(--secondary)",
                  transition: "box-shadow 0.3s",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 16px 0 var(--secondary)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                See More Testimonials
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
