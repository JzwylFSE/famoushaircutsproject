"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaPhone, 
  FaCut, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaSpinner,
  FaLock,
  FaSyncAlt,
  FaSignOutAlt
} from "react-icons/fa";
import Button1 from "@/components/Button1"; // Importing the reusable Button1

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- SIMPLE AUTHENTICATION ---
  const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE;

  function handleLogin(e) {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      fetchAppointments();
    } else {
      alert("Incorrect Security Passcode");
      setPasscode("");
    }
  }

  // --- LOGOUT FUNCTION ---
  function handleLogout() {
    setIsAuthenticated(false);
    setPasscode("");
    setAppointments([]); // Clears data from memory for security
  }

  // --- 2. FETCH APPOINTMENTS (Relational JOIN) ---
  async function fetchAppointments() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("tbl_appointments")
        .select(`
          appointment_id,
          appointment_date,
          status,
          client_message,
          created_at,
          tbl_clients (full_name, phone_number),
          tbl_services (service_name)
        `)
        .order("appointment_date", { ascending: false });

      if (error) throw error;
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // --- 3. UPDATE APPOINTMENT STATUS ---
  async function updateStatus(id, newStatus) {
    try {
      const { error } = await supabase
        .from("tbl_appointments")
        .update({ status: newStatus })
        .eq("appointment_id", id);

      if (error) throw error;
      
      setAppointments((prev) =>
        prev.map((app) =>
          app.appointment_id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to synchronize with database.");
    }
  }

  // --- RENDER: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#0a0a0a] bg-[url('/images/heropic.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-0"></div>
        
        <motion.div 
          className="p-10 rounded-xl w-full max-w-md text-center relative z-10 bg-zinc-900/40 border border-zinc-800 backdrop-blur-md shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 mx-auto bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <FaLock className="text-2xl text-[#d4af37]" />
          </div>
          
          <h2 className="text-2xl font-serif tracking-widest font-bold mb-2 text-white uppercase">Restricted Access</h2>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-8">Admin Authentication Required</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="••••••"
              className="w-full px-4 py-4 rounded-none border-0 border-b border-zinc-700 bg-zinc-900/50 text-center font-mono text-2xl tracking-[0.5em] text-[#d4af37] focus:ring-0 focus:border-[#d4af37] transition-colors placeholder:text-zinc-700"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
            />
            <motion.button
              type="submit"
              className="w-full py-4 bg-[#d4af37] text-[#0a0a0a] text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors duration-300"
              whileTap={{ scale: 0.98 }}
            >
              Authenticate
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- RENDER: ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen py-32 px-4 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b border-zinc-900 pb-6 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#d4af37] tracking-wider uppercase mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">
              Live Database Synchronization
            </p>
          </div>
          
          {/* Top Right Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Reusable Button1 for Syncing */}
            <Button1 onClick={fetchAppointments} className="gap-3 px-6 py-3 text-xs">
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaSyncAlt />}
              Refresh Clients
            </Button1>

            {/* Custom Red Danger Button for Logout */}
            <button 
              onClick={handleLogout}
              className="px-6 py-3 border border-red-600 bg-transparent text-red-600 text-xs uppercase tracking-widest font-bold hover:bg-red-600 hover:text-[#0a0a0a] transition-all duration-300 inline-flex items-center justify-center gap-3 disabled:opacity-50"
              title="Logout"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>
        </div>

        {/* Appointments Grid */}
        {isLoading ? (
          <div className="text-center py-32">
            <FaSpinner className="animate-spin text-5xl mx-auto text-[#d4af37] mb-6" />
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Querying Relational Tables...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-32 bg-zinc-900/30 border border-zinc-800 rounded-xl">
            <p className="text-zinc-500 text-sm uppercase tracking-widest">No Active Appointments Found in Database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {appointments.map((app) => (
                <motion.div
                  key={app.appointment_id}
                  className="p-8 rounded-xl bg-zinc-900/50 border border-zinc-800 relative flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  {/* Status Badge (Luxury Neon Style) */}
                  <div 
                    className={`absolute top-6 right-6 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                      app.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      app.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      app.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                    }`}
                  >
                    {app.status}
                  </div>

                  {/* Client Info */}
                  <div className="mb-8 pr-20">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Client</h3>
                    <p className="text-xl font-serif text-white">{app.tbl_clients?.full_name || "Unknown Identity"}</p>
                  </div>
                  
                  <div className="space-y-4 text-zinc-400 font-light text-sm mb-6">
                    <div className="flex items-center gap-4">
                      <FaPhone className="text-[#d4af37]" /> 
                      <a href={`tel:${app.tbl_clients?.phone_number}`} className="hover:text-white transition-colors">
                        {app.tbl_clients?.phone_number}
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <FaCut className="text-[#d4af37]" /> 
                      <span className="text-white">{app.tbl_services?.service_name || "Custom Entry"}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <FaCalendarAlt className="text-[#d4af37]" /> 
                      <span className="font-semibold text-[#d4af37]">
                        {new Date(app.appointment_date).toLocaleString('en-NG', {
                          weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Message Block */}
                  {app.client_message && (
                    <div className="mb-6 p-4 bg-[#0a0a0a] border border-zinc-800 text-xs text-zinc-500 italic leading-relaxed">
                      "{app.client_message}"
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto pt-6 border-t border-zinc-800 flex gap-3">
                    {app.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => updateStatus(app.appointment_id, 'Confirmed')}
                          className="flex-1 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-[#0a0a0a] transition-all duration-300"
                        >
                          <FaCheckCircle /> Confirm
                        </button>
                        <button 
                          onClick={() => updateStatus(app.appointment_id, 'Cancelled')}
                          className="flex-1 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-[#0a0a0a] transition-all duration-300"
                        >
                          <FaTimesCircle /> Cancel
                        </button>
                      </>
                    )}
                    {app.status === 'Confirmed' && (
                      <button 
                        onClick={() => updateStatus(app.appointment_id, 'Completed')}
                        className="w-full py-3 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 bg-[#d4af37] text-[#0a0a0a] hover:bg-white transition-all duration-300"
                      >
                        <FaCheckCircle /> Mark as Completed
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}