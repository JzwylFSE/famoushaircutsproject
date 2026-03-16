"use client";

import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaSnapchat,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className="w-full py-12 px-4"
      style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span
                style={{ color: "var(--secondary)" }}
                className="text-2xl mr-2"
              >
                ✂
              </span>
              <span className="font-bold text-xl">Famous Haircuts</span>
            </motion.div>
            <p
              className="text-center md:text-left opacity-80 mb-4"
              style={{ color: "var(--accent)" }}
            >
              Precision cuts for the modern gentleman. Established 2018.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: <FaInstagram />,
                  color: "#E1306C",
                  href: "https://www.instagram.com/famous_haircut01/",
                  label: "Instagram",
                },
                {
                  icon: <FaWhatsapp />,
                  color: "#25D366",
                  href: "https://wa.me/2348149713412",
                  label: "WhatsApp",
                },
                {
                  icon: <FaSnapchat />,
                  color: "#FFFC00",
                  href: "#",
                  label: "Snapchat",
                },
                {
                  icon: <FaXTwitter />,
                  color: "var(--background)",
                  href: "#",
                  label: "Twitter",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-2xl p-2 rounded-full"
                  style={{ backgroundColor: "var(--secondary)" }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span style={{ color: social.color }}>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="text-center md:text-left">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--secondary)" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-center md:justify-start">
                <i
                  className="fas fa-map-marker-alt mr-2"
                  style={{ color: "var(--secondary)" }}
                ></i>
                <span>Elekahia Housing Estate, PH</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <i
                  className="fas fa-phone mr-2"
                  style={{ color: "var(--secondary)" }}
                ></i>
                <span>+(234) 814 971 3412</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <i
                  className="fas fa-envelope mr-2"
                  style={{ color: "var(--secondary)" }}
                ></i>
                <span>book@famouscuts.com</span>
              </li>
            </ul>
          </div>

          {/* Hours Column */}
          <div className="text-center md:text-left">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--secondary)" }}
            >
              Opening Hours
            </h3>
            <ul className="space-y-2">
              {[
                { day: "Mon-Fri", hours: "9:00 AM - 7:00 PM" },
                { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between max-w-xs mx-auto md:mx-0"
                >
                  <span style={{ color: "var(--accent)" }}>{item.day}</span>
                  <span>{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-6 border-t text-center opacity-75 text-sm"
          style={{ borderColor: "var(--secondary)" }}
        >
          <p>
            © 2025 by Famous Haircuts. Designed by{" "}
            <a
              href="https://www.instagram.com/iam_jzwyl/"
              className="hover:underline"
              style={{ color: "var(--secondary)" }}
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
