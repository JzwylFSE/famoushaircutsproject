"use client";

import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaSnapchat,
  FaXTwitter,
} from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-16 px-4 bg-[#0a0a0a] border-t border-zinc-900">
      <div className="container mx-auto max-w-6xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* 1. Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div className="mb-6" whileHover={{ scale: 1.02 }}>
              <Link href="/">
                <span className="text-2xl font-serif tracking-widest font-bold text-[#d4af37] cursor-pointer">
                  FAMOUS<span className="text-white font-light">HAIRCUTS</span>
                </span>
              </Link>
            </motion.div>
            <p className="text-zinc-400 font-light leading-relaxed mb-8 max-w-xs">
              Precision cuts for the modern gentleman. Elevating grooming standards since 2018.
            </p>
            
            {/* Social Icons - Brand Colors with Dynamic Hover Glow */}
            <div className="flex space-x-4">
              {[
                { 
                  icon: <FaInstagram />, 
                  href: "https://www.instagram.com/famous_haircut01/", 
                  label: "Instagram",
                  color: "#E1306C" // Instagram Pink
                },
                { 
                  icon: <FaWhatsapp />, 
                  href: "https://wa.me/2348149713412", 
                  label: "WhatsApp",
                  color: "#25D366" // WhatsApp Green
                },
                { 
                  icon: <FaSnapchat />, 
                  href: "#", 
                  label: "Snapchat",
                  color: "#FFFC00" // Snapchat Yellow
                },
                { 
                  icon: <FaXTwitter />, 
                  href: "#", 
                  label: "Twitter",
                  color: "#FFFFFF" // X/Twitter White
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-xl p-3 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors duration-300"
                  style={{ color: social.color }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.1,
                    borderColor: social.color,
                    boxShadow: `0 8px 20px -5px ${social.color}60` // Creates a dynamic glow based on the brand color
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. Contact Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-widest">
              Contact Us
            </h3>
            <ul className="space-y-4 text-zinc-400 font-light">
              <li className="flex items-center justify-center md:justify-start group cursor-pointer hover:text-[#d4af37] transition-colors duration-300">
                <FaMapMarkerAlt className="mr-4 text-[#d4af37]" />
                <span>Elekahia Housing Estate, PH</span>
              </li>
              <li className="flex items-center justify-center md:justify-start group cursor-pointer hover:text-[#d4af37] transition-colors duration-300">
                <FaPhone className="mr-4 text-[#d4af37]" />
                <span>+(234) 814 971 3412</span>
              </li>
              <li className="flex items-center justify-center md:justify-start group cursor-pointer hover:text-[#d4af37] transition-colors duration-300">
                <FaEnvelope className="mr-4 text-[#d4af37]" />
                <span>book@famouscuts.com</span>
              </li>
            </ul>
          </div>

          {/* 3. Hours Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold mb-6 text-white uppercase tracking-widest">
              Opening Hours
            </h3>
            <ul className="space-y-4 w-full max-w-[250px]">
              {[
                { day: "Mon-Fri", hours: "9:00 AM - 7:00 PM" },
                { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-zinc-400 font-light border-b border-zinc-800/50 pb-2"
                >
                  <span className="text-white">{item.day}</span>
                  <span className={item.hours === "Closed" ? "text-[#d4af37] font-semibold tracking-wider uppercase text-xs" : ""}>
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-zinc-900 text-center flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-zinc-600">
          <p className="mb-4 md:mb-0">
            © 2026 Famous Haircuts. All Rights Reserved.
          </p>
          <p>
            Designed by{" "}
            <a
              href="https://www.instagram.com/iam_jzwyl/"
              className="text-zinc-400 hover:text-[#d4af37] transition-colors font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              iam_jzwyl
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}