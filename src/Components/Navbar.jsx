"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Added to detect current route
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHome, FaImages, FaStar, FaPhone } from "react-icons/fa";
import { GiScissors } from "react-icons/gi";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname(); // Get current page's path
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for Glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", icon: <FaHome />, href: "/" },
    { name: "Services", icon: <GiScissors />, href: "/services" },
    { name: "Gallery", icon: <FaImages />, href: "/gallery" },
    { name: "Testimonials", icon: <FaStar />, href: "/testimonials" },
    { name: "Contact", icon: <FaPhone />, href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/85 backdrop-blur-md border-b border-zinc-800 shadow-xl py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo - Premium Serif */}
          <Link href="/">
            <span className="text-2xl cursor-pointer font-serif tracking-widest font-bold text-[#d4af37]">
              FAMOUS<span className="text-white font-light">HAIRCUTS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              {navLinks.map((link) => {
                // Check if the current route matches the link
                const isActive = pathname === link.href;

                return (
                  <Link href={link.href} key={link.name}>
                    <span 
                      className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-300 cursor-pointer relative group ${
                        isActive ? "text-[#d4af37]" : "text-zinc-300 hover:text-[#d4af37]"
                      }`}
                    >
                      {link.name}
                      {/* Sub-line animation: Forced to full width if active */}
                      <span 
                        className={`absolute -bottom-2 left-0 h-[1px] bg-[#d4af37] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </span>
                  </Link>
                );
              })}
            </div>
            
            {/* Isolated CTA Button */}
            <Link
              href="/contact"
              className="ml-6 px-6 py-2 border border-[#d4af37] text-[#d4af37] text-xs uppercase tracking-widest font-bold hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#d4af37] hover:text-white transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-zinc-800 shadow-2xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-2">
              {navLinks.map((link) => {
                // Check if the current route matches the link (for mobile)
                const isActive = pathname === link.href;

                return (
                  <Link href={link.href} key={link.name}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-4 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm font-semibold cursor-pointer ${
                        isActive 
                          ? "text-[#d4af37] bg-zinc-900/50" // Active state look on mobile
                          : "text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-900/50"
                      }`}
                    >
                      <span className="mr-4 text-lg text-[#d4af37]">{link.icon}</span>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 mx-4 px-4 py-4 bg-[#d4af37] text-[#0a0a0a] text-center font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}