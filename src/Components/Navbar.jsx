"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaImages,
  FaStar,
  FaPhone,
} from "react-icons/fa";
import { GiScissors } from "react-icons/gi";
import Link from "next/link";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 shadow-md transition-all duration-300 ${
        isScrolled ? "bg-opacity-95 shadow-lg" : "bg-opacity-100"
      }`}
      style={{ backgroundColor: "var(--primary)" }}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <span
              style={{ color: "var(--secondary)" }}
              className="text-3xl cursor-pointer"
              aria-label="Home"
            >
              FAM✂OUS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative flex space-x-8">
              {navLinks.map((link) => (
                <Link href={link.href} key={link.name}>
                  <span
                    style={{ color: "var(--background)" }}
                    className="hover:underline transition-colors relative group cursor-pointer"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--secondary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--background)")
                    }
                  >
                    {link.name}
                    {/* Underline animation */}
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5"
                      style={{
                        backgroundColor: "var(--secondary)",
                        width: 0,
                        transition: "width 0.3s",
                      }}
                    />
                  </span>
                </Link>
              ))}
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I'd%20like%20to%20book%20a%20haircut`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--background)",
              }}
              className="ml-4 px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-button"
            style={{ color: "var(--background)" }}
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden w-full left-0 right-0 shadow-lg"
            style={{ backgroundColor: "var(--primary)" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="container mx-auto px-4 py-3">
              {navLinks.map((link, index) => (
                <Link href={link.href} key={link.name}>
                  <span
                    style={{
                      color: "var(--accent)",
                      borderBottom: "1px solid var(--secondary)",
                    }}
                    className="block py-3 flex items-center transition-colors cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--secondary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.name}
                  </span>
                </Link>
              ))}
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I'd%20like%20to%20book%20a%20haircut`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--background)",
                }}
                className="w-full mt-4 px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors block text-center"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
