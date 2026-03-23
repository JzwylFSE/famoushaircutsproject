"use client";

import { useState, useEffect } from "react";
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
  FaLock
} from "react-icons/fa";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- 1. SIMPLE AUTHENTICATION ---
  // In a real-world app, use Supabase Auth. For this project, a hardcoded passcode works perfectly.
  const ADMIN_PASSCODE = "famous2026"; 

  function handleLogin(e) {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      fetchAppointments();
    } else {
      alert("Incorrect Passcode!");
    }
  }

  // --- 2. FETCH APPOINTMENTS (Relational JOIN) ---
  async function fetchAppointments() {
    setIsLoading(true);
    try {
      // Notice the relational query: fetching from appointments, but joining clients and services!
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
      
      // Update local UI state without refreshing the page
      setAppointments((prev) =>
        prev.map((app) =>
          app.appointment_id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  }

  // --- RENDER: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--background)" }}>
        <motion.div 
          className="p-8 rounded-lg w-full max-w-md text-center"
          style={{ backgroundColor: "var(--accent)", border: "2px solid var(--secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaLock className="text-4xl mx-auto mb-4" style={{ color: "var(--secondary)" }} />
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--secondary)" }}>Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Passcode"
              className="w-full px-4 py-3 rounded border text-center font-bold tracking-widest"
              style={{ borderColor: "var(--secondary)", backgroundColor: "var(--background)", color: "var(--primary)" }}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
            />
            <motion.button
              type="submit"
              className="w-full py-3 rounded font-bold"
              style={{ backgroundColor: "var(--secondary)", color: "var(--background)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Unlock Dashboard
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- RENDER: ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: "var(--background)" }}>
      <div className="container mx-auto max-w-6xl">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-end mb-8 border-b pb-4" style={{ borderColor: "var(--secondary)" }}>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--secondary)" }}>Appointments Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: "var(--primary)" }}>Manage your incoming bookings</p>
          </div>
          <button 
            onClick={fetchAppointments}
            className="px-4 py-2 rounded text-sm font-bold flex items-center gap-2"
            style={{ backgroundColor: "var(--accent)", color: "var(--secondary)", border: "1px solid var(--secondary)" }}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Refresh Data"}
          </button>
        </div>

        {/* Appointments Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <FaSpinner className="animate-spin text-4xl mx-auto" style={{ color: "var(--secondary)" }} />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20" style={{ color: "var(--primary)" }}>
            <p className="text-xl">No appointments found in the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {appointments.map((app) => (
                <motion.div
                  key={app.appointment_id}
                  className="p-6 rounded-lg shadow-lg relative overflow-hidden"
                  style={{ backgroundColor: "var(--accent)", border: "1px solid var(--secondary)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                >
                  {/* Status Badge */}
                  <div 
                    className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg ${
                      app.status === 'Pending' ? 'bg-yellow-500 text-black' :
                      app.status === 'Confirmed' ? 'bg-green-500 text-white' :
                      app.status === 'Cancelled' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                    }`}
                  >
                    {app.status}
                  </div>

                  {/* Client Info */}
                  <h3 className="text-xl font-bold mb-4 pr-16" style={{ color: "var(--secondary)" }}>
                    {app.tbl_clients?.full_name || "Unknown Client"}
                  </h3>
                  
                  <div className="space-y-3 text-sm" style={{ color: "var(--primary)" }}>
                    <p className="flex items-center gap-3">
                      <FaPhone style={{ color: "var(--secondary)" }} /> 
                      <a href={`tel:${app.tbl_clients?.phone_number}`} className="underline">
                        {app.tbl_clients?.phone_number}
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <FaCut style={{ color: "var(--secondary)" }} /> 
                      {app.tbl_services?.service_name || "Custom Service"}
                    </p>
                    <p className="flex items-center gap-3">
                      <FaCalendarAlt style={{ color: "var(--secondary)" }} /> 
                      {new Date(app.appointment_date).toLocaleString()}
                    </p>
                  </div>

                  {/* Message Block */}
                  {app.client_message && (
                    <div className="mt-4 p-3 rounded text-sm italic opacity-80" style={{ backgroundColor: "var(--background)", color: "var(--primary)" }}>
                      "{app.client_message}"
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-2">
                    {app.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => updateStatus(app.appointment_id, 'Confirmed')}
                          className="flex-1 py-2 rounded font-bold flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-500 transition"
                        >
                          <FaCheckCircle /> Confirm
                        </button>
                        <button 
                          onClick={() => updateStatus(app.appointment_id, 'Cancelled')}
                          className="flex-1 py-2 rounded font-bold flex items-center justify-center gap-2 bg-red-600 text-white hover:bg-red-500 transition"
                        >
                          <FaTimesCircle /> Cancel
                        </button>
                      </>
                    )}
                    {app.status === 'Confirmed' && (
                      <button 
                        onClick={() => updateStatus(app.appointment_id, 'Completed')}
                        className="w-full py-2 rounded font-bold flex items-center justify-center gap-2"
                        style={{ backgroundColor: "var(--secondary)", color: "var(--background)" }}
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