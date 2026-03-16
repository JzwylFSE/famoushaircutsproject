"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const services = [
  {
    name: "Home Service",
    price: "₦7000",
    desc: "Get a professional haircut at the comfort of your home. We come to you!",
    image: "/images/homeservice.jpg",
    duration: "2h",
  },
  {
    name: "Classic Haircut",
    price: "₦5000",
    desc: "Traditional cut with scissor and clipper blend for a polished look",
    image: "/images/seventeen.jpg",
    duration: "1hr",
  },
  {
    name: "Clean Fade",
    price: "₦3000",
    desc: "Precision fade from skin to length with sharp lines",
    image: "/images/four(copy).jpg",
    duration: "50mins",
  },
  {
    name: "Children's Cut",
    price: "₦2000",
    desc: "Gentle cuts designed for young clients with fun styles",
    image: "/images/",
    duration: "35mins",
  },
  {
    name: "Lineup & Beard Trim",
    price: "₦1500",
    desc: "Sharp edges and perfectly shaped facial hair",
    image: "/images/beardtrim.jpg",
    duration: "40mins",
  },
  {
    name: "Hair Colouring",
    price: "₦1500",
    desc: "Professional coloring for vibrant or natural looks",
    image: "/images/",
    duration: "1hr",
  },
  {
    name: "Hair Design",
    price: "₦2000",
    desc: "Creative patterns and artistic designs in your cut",
    image: "/images/hairdesign.jpg",
    duration: "30mins",
  },
  {
    name: "Hair Treatment",
    price: "₦1500",
    desc: "Revitalizing treatments for healthy, strong hair",
    image: "/images/treatment.jpg",
    duration: "1hr",
  },
];

export default function ServicesPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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
          transition={{ delay: 0.2 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--primary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Precision cuts and treatments tailored to your unique style
        </motion.p>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        className="pb-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="rounded-lg overflow-hidden shadow-lg"
                style={{
                  backgroundColor: "var(--accent)",
                  border: "2px solid var(--secondary)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
              >
                {/* Service Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="w-full h-full flex items-center justify-center text-6xl z-10 relative">
                    {service.icon}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      {service.name}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--background)",
                      }}
                    >
                      {service.price}
                    </span>
                  </div>
                  <p className="mb-4" style={{ color: "var(--primary)" }}>
                    {service.desc}
                  </p>
                  <p
                    className="mb-4 text-sm font-semibold"
                    style={{ color: "var(--tertiary)" }}
                  >
                    Duration: {service.duration}
                  </p>
                  <motion.a
                    href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I'd%20like%20to%20book%20a%20${encodeURIComponent(
                      service.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium"
                    style={{ color: "var(--secondary)" }}
                    whileHover={{ x: 3 }}
                  >
                    Book Now <FaArrowRight className="ml-2" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "var(--secondary)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--background)" }}
            initial={{ y: -10 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Ready for Your Transformation?
          </motion.h2>
          <motion.a
            href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I'd%20like%20to%20book%20a%20haircut`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-md font-bold text-lg inline-block"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--secondary)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Appointment
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
