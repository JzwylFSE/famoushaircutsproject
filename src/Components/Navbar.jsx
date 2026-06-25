"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHome, FaImages, FaStar, FaPhone } from "react-icons/fa";
import { GiScissors } from "react-icons/gi";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
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

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

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
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-800 shadow-xl py-3"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Brand Logo - Fluid Scaling & No Wrapping */}
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-xl sm:text-2xl md:text-3xl cursor-pointer font-serif tracking-widest font-bold text-[#d4af37] whitespace-nowrap">
              FAMOUS<span className="text-white font-light">HAIRCUTS</span>
            </span>
          </Link>

          {/* Desktop Nav - Hidden on Mobile/Tablet, Flex on Laptop+ (lg) */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-8">
            <div className="flex space-x-5 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link href={link.href} key={link.name}>
                    <span 
                      className={`text-xs xl:text-sm uppercase tracking-widest font-semibold transition-colors duration-300 cursor-pointer relative group ${
                        isActive ? "text-[#d4af37]" : "text-zinc-300 hover:text-[#d4af37]"
                      }`}
                    >
                      {link.name}
                      {/* Sub-line animation */}
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
              className="ml-4 xl:ml-6 px-5 xl:px-8 py-3 border border-[#d4af37] bg-transparent text-[#d4af37] text-xs uppercase tracking-widest font-bold hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all duration-300"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile/Tablet Toggle Button */}
          <button
            className="lg:hidden text-[#d4af37] hover:text-white transition-colors focus:outline-none p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl sm:text-3xl" />
            ) : (
              <FaBars className="text-2xl sm:text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Scrollable & Full Cover */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-zinc-800 shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)]"
          >
            <div className="container mx-auto px-4 py-6 sm:py-8 flex flex-col space-y-2 sm:space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link href={link.href} key={link.name}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm sm:text-base font-semibold cursor-pointer ${
                        isActive 
                          ? "text-[#d4af37] bg-zinc-900/60 border border-zinc-800"
                          : "text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-900/40 border border-transparent"
                      }`}
                    >
                      <span className="mr-4 text-xl sm:text-2xl text-[#d4af37]">{link.icon}</span>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
              
              <div className="pt-6 mt-4 border-t border-zinc-800/50">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 bg-[#d4af37] text-[#0a0a0a] text-center font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-white transition-colors rounded-md"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}