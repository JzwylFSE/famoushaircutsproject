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
          Our Services
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-zinc-400 uppercase tracking-[0.2em]"
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
                className="group rounded-xl overflow-hidden bg-zinc-900/30 border border-zinc-800 hover:border-[#d4af37]/50 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 15px 30px -10px rgba(212, 175, 55, 0.1)",
                }}
              >
                {/* Service Image */}
                <div className="h-56 bg-zinc-900 relative overflow-hidden">
                  {service.image && service.image !== "/images/" ? (
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 font-serif italic text-sm">
                      Image coming soon
                    </div>
                  )}
                  {/* Dark Gradient Overlay for readability if text was over it, and luxury feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"></div>
                </div>

                {/* Service Content */}
                <div className="p-8 relative bg-[#0a0a0a]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                      {service.name}
                    </h3>
                    <span className="text-xl font-serif font-bold text-[#d4af37]">
                      {service.price}
                    </span>
                  </div>

                  <p className="mb-6 text-zinc-400 font-light leading-relaxed min-h-[3rem]">
                    {service.desc}
                  </p>

                  <div className="flex justify-between items-center border-t border-zinc-800/50 pt-6">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                      Duration:{" "}
                      <span className="text-white">{service.duration}</span>
                    </p>

                    {/* Interactive Book Now Link */}
                    <Link
                      href={`/contact?service=${encodeURIComponent(
                        `${service.name} (${service.price})`,
                      )}`}
                      className="inline-flex items-center text-xs font-bold text-[#d4af37] uppercase tracking-widest hover:text-white transition-colors duration-300"
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
            Ready for Your Transformation?
          </motion.h2>
          <p className="text-zinc-400 mb-10 uppercase tracking-widest text-sm">
            Secure your slot and experience the standard.
          </p>
          <Button2 href="/contact">Book Appointment</Button2>
        </div>
      </motion.section>
    </div>
  );
}
