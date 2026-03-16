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
import { useState } from "react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const text = `Hello, my name is ${form.name}%0AService: ${form.service}%0APhone: ${form.phone}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Hero Section */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: "var(--secondary)" }}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Get In Touch
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--primary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Book your appointment or ask us anything - we&apos;re here to help
        </motion.p>
      </motion.section>

      {/* Contact Grid */}
      <motion.section
        className="py-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="p-8 rounded-lg"
            style={{
              backgroundColor: "var(--accent)",
              border: "2px solid var(--secondary)",
            }}
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
            transition={{ type: "spring" }}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "var(--secondary)" }}
            >
              Send Us a Message
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "var(--secondary)" }}
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "var(--secondary)" }}
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="block mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  Service Needed
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "var(--secondary)" }}
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  <option>Classic Haircut (₦5000)</option>
                  <option>Clean Fade (₦3000)</option>
                  <option>Children&apos;s Cut (₦2000)</option>
                  <option>Lineup &amp; Beard Trim (₦1500)</option>
                  <option>Hair Colouring (₦1500)</option>
                  <option>Hair Design (₦2000)</option>
                  <option>Hair Treatment (₦1500)</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 rounded border"
                  style={{ borderColor: "var(--secondary)" }}
                  value={form.message}
                  onChange={handleChange}
                  spellCheck={false}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 rounded-md font-bold"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--background)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ x: 20 }}
            whileInView={{ x: 0 }}
            transition={{ type: "spring" }}
          >
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--secondary)" }}
              >
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt
                    className="text-xl mt-1"
                    style={{ color: "var(--secondary)" }}
                  />
                  <div>
                    <h3
                      className="font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      Our Location
                    </h3>
                    <p style={{ color: "var(--primary)" }}>
                      Elekahia Housing Estate, PH
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhone
                    className="text-xl mt-1"
                    style={{ color: "var(--secondary)" }}
                  />
                  <div>
                    <h3
                      className="font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      Call Us
                    </h3>
                    <a
                      href="tel:+2348149713412"
                      style={{
                        color: "var(--primary)",
                        textDecoration: "underline",
                      }}
                    >
                      +234 814 971 3412
                    </a>
                    <div className="flex items-center gap-2 mt-2">
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                        style={{
                          color: "var(--primary)",
                          textDecoration: "underline",
                        }}
                      >
                        <FaWhatsapp className="text-green-500" />
                        WhatsApp Chat
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaInstagram
                    className="text-xl mt-1"
                    style={{ color: "#E1306C" }}
                  />
                  <div>
                    <h3
                      className="font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/famous_haircut01/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--primary)",
                        textDecoration: "underline",
                      }}
                    >
                      @famous_haircut01
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaClock
                    className="text-xl mt-1"
                    style={{ color: "var(--secondary)" }}
                  />
                  <div>
                    <h3
                      className="font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      Working Hours
                    </h3>
                    <p style={{ color: "var(--primary)" }}>
                      Mon-Fri: 9AM - 7PM
                      <br />
                      Saturday: 10AM - 5PM
                      <br />
                      Sunday: Closed
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
        className={`px-4 ${
          isMapExpanded
            ? "fixed inset-0 z-50 bg-black/90 p-0"
            : "relative py-12"
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className={`container mx-auto ${isMapExpanded ? "h-full" : ""}`}>
          <div
            className={`relative ${
              isMapExpanded ? "h-full" : "h-96 md:h-[500px]"
            } rounded-xl overflow-hidden shadow-xl`}
          >
            {/* Map Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1751297670936!6m8!1m7!1sjWekXspCg2W8szRpQoJ_yw!2m2!1d4.823071742629652!2d7.026558577574137!3f313.0157594936708!4f1.803797468354432!5f0.4000000000000002"
              width="100%"
              height="300"
              style={{
                border: 0,
                borderRadius: "1rem",
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
                maxWidth: 600,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Famous Haircuts Street View"
            />

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex gap-3">
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=4.8230717,7.0265586"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full flex items-center justify-center"
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
                className="p-3 rounded-full flex items-center justify-center"
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
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md max-w-xs">
              <h3 className="font-bold flex items-center gap-2">
                <FaMapMarkerAlt style={{ color: "var(--secondary)" }} />
                Famous Haircuts
              </h3>
              <p className="text-sm mt-1">
                Elekahia Housing Estate, Port Harcourt
              </p>
              <a
                href="https://www.google.com/maps?q=4.8230717,7.0265586"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm mt-2 inline-block"
                style={{ color: "var(--secondary)" }}
              >
                View on Google Maps →
              </a>
            </div>
          </div>

          {isMapExpanded && (
            <motion.button
              onClick={() => setIsMapExpanded(false)}
              className="absolute top-4 right-4 p-3 rounded-full"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--background)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FaCompress />
            </motion.button>
          )}
        </div>
      </motion.section>
    </div>
  );
}
