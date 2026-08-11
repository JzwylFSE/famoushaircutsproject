"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHome, FaImages, FaStar, FaPhone, FaUser, FaSignOutAlt } from "react-icons/fa";
import { GiScissors } from "react-icons/gi";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { logout } from "@/app/auth/actions"; 

export default function Navbar({ initialUser }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(initialUser);

  const supabase = createClient();

  useEffect(() => {
    // Sync with server state changes from revalidatePath
    setUser(initialUser);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [initialUser, supabase.auth]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Contact", icon: <FaPhone />, href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? `bg-surface/80 backdrop-blur-lg shadow-sm py-3 ${isMobileMenuOpen ? 'border-none' : 'border-b border-gray-200'}`
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-xl sm:text-2xl md:text-3xl cursor-pointer font-serif font-bold text-textmain whitespace-nowrap">
              FAMOUS<span className="font-light text-primary">HAIRCUTS</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-8">
            <div className="flex space-x-5 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link href={link.href} key={link.name}>
                    <span 
                      className={`text-xs xl:text-sm uppercase tracking-widest font-semibold transition-colors duration-300 cursor-pointer relative group ${
                        isActive ? "text-primary" : "text-textmuted hover:text-primary"
                      }`}
                    >
                      {link.name}
                      <span 
                        className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </span>
                  </Link>
                );
              })}
            </div>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4 xl:ml-6">
                <Link
                  href="/dashboard"
                  className="text-primary font-serif italic text-lg tracking-wide hover:text-secondary transition-colors"
                >
                  Dashboard
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="px-5 py-2 border-2 border-red-500 text-red-500 text-xs uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-all duration-300 rounded-md"
                  >
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4 xl:ml-6">
                <Link
                  href="/login"
                  className="text-textmain hover:text-primary text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-transparent border border-textmain text-textmain text-xs uppercase tracking-widest font-bold hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-md"
                >
                  Book Now
                </Link>
              </div>
            )}
          </nav>

          <button
            className="lg:hidden text-textmain hover:text-primary transition-colors focus:outline-none p-2"
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden absolute top-full left-0 w-full bg-surface/80 backdrop-blur-lg border-b border-gray-200 shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)]"
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
                          ? "text-primary bg-primary/5 border border-primary/20"
                          : "text-textmuted hover:text-primary hover:bg-surface border border-transparent"
                      }`}
                    >
                      <span className="mr-4 text-xl sm:text-2xl text-primary">{link.icon}</span>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
              
              <div className="pt-6 mt-4 border-t border-gray-100 flex flex-col gap-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-4 rounded-xl text-textmain hover:text-primary hover:bg-surface border border-transparent font-semibold uppercase tracking-widest text-sm"
                    >
                      <FaUser className="mr-4 text-xl text-primary" /> Dashboard
                    </Link>
                    <form action={logout} className="w-full">
                      <button
                        type="submit"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full flex items-center px-4 py-4 rounded-xl text-red-500 hover:bg-red-50 border border-transparent font-semibold uppercase tracking-widest text-sm"
                      >
                        <FaSignOutAlt className="mr-4 text-xl text-red-500" /> Logout
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full py-4 text-primary text-center font-bold uppercase tracking-widest text-sm sm:text-base border-2 border-primary hover:bg-primary/5 transition-colors rounded-md"
                    >
                      Login
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full py-4 bg-transparent border border-textmain text-textmain text-center font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-primary hover:border-primary hover:text-white transition-colors rounded-md"
                    >
                      Book Appointment
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}