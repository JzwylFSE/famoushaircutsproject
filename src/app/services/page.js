"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Button2 from "./../../Components/Button2";

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
    image: "/images/", // Note: Ensure you have a valid image path here or it will show empty
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
    image: "/images/", // Note: Ensure you have a valid image path here
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
  return (
    <div className="min-h-screen bg-background text-textmain">
      {/* --- Hero Section --- */}
      <motion.section
        className="pt-32 pb-20 px-4 text-center relative bg-surface border-b border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-medium mb-6 text-textmain tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-xs sm:text-sm max-w-2xl mx-auto text-primary uppercase tracking-[0.3em] font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Precision cuts and treatments tailored to your unique style
        </motion.p>
      </motion.section>

      {/* --- Services Grid --- */}
      <motion.section
        className="pb-24 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className="group rounded-xl overflow-hidden bg-surface border border-gray-200 hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{
                  y: -8,
                }}
              >
                {/* Service Image */}
                <div className="h-56 bg-gray-100 relative overflow-hidden">
                  {service.image && service.image !== "/images/" ? (
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-textmuted font-serif italic text-sm bg-surface">
                      Image coming soon
                    </div>
                  )}
                  {/* Subtle overlay for the new light theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Service Content */}
                <div className="p-8 relative bg-surface">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-textmain uppercase tracking-wider">
                      {service.name}
                    </h3>
                    <span className="text-xl font-serif font-bold text-primary">
                      {service.price}
                    </span>
                  </div>

                  <p className="mb-6 text-textmuted font-medium leading-relaxed min-h-[3rem]">
                    {service.desc}
                  </p>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                    <p className="text-xs font-bold text-textmuted uppercase tracking-widest">
                      Duration:{" "}
                      <span className="text-textmain font-semibold">{service.duration}</span>
                    </p>

                    {/* Interactive Book Now Link */}
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.name)}`}
                      className="inline-flex items-center text-xs font-bold text-primary uppercase tracking-widest hover:text-secondary transition-colors duration-300"
                      aria-label={`Book ${service.name}`}
                    >
                      Book Now
                      <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- CTA Section --- */}
      <motion.section
        className="py-24 px-4 text-center bg-surface border-t border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-3xl md:text-5xl font-serif text-textmain font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ready for Your Transformation?
          </motion.h2>
          <p className="text-textmuted font-semibold mb-10 uppercase tracking-widest text-sm">
            Secure your slot and experience the standard.
          </p>
          <Button2 href="/contact">Book Appointment</Button2>
        </div>
      </motion.section>
    </div>
  );
}
