"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
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
import Button1 from "./../../Components/Button1";

export default function AdminPage() {
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- AUTHENTICATION CHECK ---
  useEffect(() => {
    async function checkAdminAuth() {
      setIsCheckingAuth(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          setAuthError("You are not logged in.");
          setIsAuthenticated(false);
        } else if (user.email === 'cjsimeon090@gmail.com') {
          setIsAuthenticated(true);
          fetchAppointments();
        } else {
          setAuthError("Access Denied: You do not have administrator privileges.");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setAuthError("Authentication check failed.");
      } finally {
        setIsCheckingAuth(false);
      }
    }
    
    checkAdminAuth();
  }, []);

  // --- LOGOUT FUNCTION ---
  async function handleLogout() {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setAppointments([]); // Clears data from memory for security
    router.push('/login');
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
          amount_paid,
          payment_reference,
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
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
         <FaSpinner className="animate-spin text-4xl text-[#B8860B]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 relative">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
        
        <motion.div 
          className="p-10 rounded-xl w-full max-w-md text-center relative z-10 bg-white border border-slate-200 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 mx-auto bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <FaLock className="text-2xl text-[#B8860B]" />
          </div>
          
          <h2 className="text-2xl font-serif tracking-widest font-bold mb-2 text-slate-900 uppercase">Restricted Access</h2>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-8">Admin Authentication Required</p>
          
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-md">
            <p className="text-red-600 text-sm">{authError}</p>
          </div>
          
          <motion.button
            onClick={() => router.push('/login')}
            className="w-full py-4 bg-[#B8860B] text-white text-sm uppercase tracking-widest font-bold hover:bg-[#DFB15B] transition-colors duration-300 rounded-sm"
            whileTap={{ scale: 0.98 }}
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // --- DATA PROCESSING ---
  const upcomingAppointments = appointments
    .filter(app => app.status === 'Pending' || app.status === 'Confirmed' || app.status === 'Paid')
    .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));

  const historyAppointments = appointments
    .filter(app => app.status === 'Completed' || app.status === 'Cancelled');

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // --- RENDER: ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen py-32 px-4 bg-slate-50 text-slate-900">
      <div className="container mx-auto max-w-7xl">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b border-slate-200 pb-6 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#B8860B] tracking-wider uppercase mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              Live Database Synchronization
            </p>
          </div>
          
          {/* Top Right Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            <Button1 onClick={fetchAppointments} className="gap-3 px-6 py-3 text-xs">
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaSyncAlt />}
              Refresh Clients
            </Button1>

            <button 
              onClick={handleLogout}
              className="px-6 py-3 border border-red-500 bg-transparent text-red-600 text-xs uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-3 rounded-sm disabled:opacity-50"
              title="Logout"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-32">
            <FaSpinner className="animate-spin text-5xl mx-auto text-[#B8860B] mb-6" />
            <p className="text-slate-500 text-xs uppercase tracking-widest">Querying Relational Tables...</p>
          </div>
        ) : (
          <>
            {/* LIVE QUEUE SECTION */}
            {upcomingAppointments.length > 0 && (
              <div className="mb-16">
                <h2 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live Queue
                </h2>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                          <th className="p-4 font-semibold">Time</th>
                          <th className="p-4 font-semibold">Client</th>
                          <th className="p-4 font-semibold">Service</th>
                          <th className="p-4 font-semibold">Paid</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {upcomingAppointments.map((app) => {
                            const today = isToday(app.appointment_date);
                            return (
                              <motion.tr 
                                key={app.appointment_id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${today ? 'bg-[#B8860B]/5' : ''}`}
                              >
                                <td className="p-4">
                                  <div className="flex flex-col">
                                    <span className={`font-semibold ${today ? 'text-[#B8860B]' : 'text-slate-900'}`}>
                                      {new Date(app.appointment_date).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      {today ? "Today" : new Date(app.appointment_date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="font-serif text-sm font-medium text-slate-900">{app.tbl_clients?.full_name}</div>
                                  <a href={`tel:${app.tbl_clients?.phone_number}`} className="text-xs text-slate-500 hover:text-[#B8860B] transition-colors">{app.tbl_clients?.phone_number}</a>
                                </td>
                                <td className="p-4 text-sm text-slate-700">{app.tbl_services?.service_name}</td>
                                <td className="p-4">
                                  <span className="text-sm font-medium text-slate-900">
                                    {app.amount_paid ? `₦${parseInt(app.amount_paid).toLocaleString()}` : 'N/A'}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-full ${
                                    app.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                    app.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                    'bg-green-50 text-green-700 border-green-200'
                                  }`}>
                                    {app.status}
                                  </span>
                                </td>
                                <td className="p-4 text-right">
                                  {(app.status === 'Pending' || app.status === 'Paid') && (
                                    <div className="flex justify-end gap-2">
                                      <button onClick={() => updateStatus(app.appointment_id, 'Confirmed')} className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Confirm">
                                        <FaCheckCircle className="text-lg" />
                                      </button>
                                      <button onClick={() => updateStatus(app.appointment_id, 'Cancelled')} className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Cancel">
                                        <FaTimesCircle className="text-lg" />
                                      </button>
                                    </div>
                                  )}
                                  {app.status === 'Confirmed' && (
                                    <button onClick={() => updateStatus(app.appointment_id, 'Completed')} className="px-4 py-2 text-xs uppercase tracking-widest font-bold bg-[#B8860B] text-white hover:bg-[#DFB15B] rounded-sm transition-colors shadow-sm">
                                      Complete
                                    </button>
                                  )}
                                </td>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* HISTORY SECTION */}
            <h2 className="text-xl font-serif font-bold text-slate-800 mb-6">Appointment History</h2>
            {historyAppointments.length === 0 ? (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p className="text-slate-500 text-sm uppercase tracking-widest">No Historical Appointments.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence>
                  {historyAppointments.map((app) => (
                    <motion.div
                      key={app.appointment_id}
                      className="p-8 rounded-xl bg-white border border-slate-100 shadow-sm relative flex flex-col justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                    >
                      <div 
                        className={`absolute top-6 right-6 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-full ${
                          app.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {app.status}
                      </div>

                      <div className="mb-8 pr-20">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Client</h3>
                        <p className="text-xl font-serif text-[#111827]">{app.tbl_clients?.full_name || "Unknown Identity"}</p>
                      </div>
                      
                      <div className="space-y-4 text-slate-600 font-light text-sm mb-6">
                        <div className="flex items-center gap-4">
                          <FaPhone className="text-[#B8860B]" /> 
                          <a href={`tel:${app.tbl_clients?.phone_number}`} className="hover:text-[#B8860B] transition-colors">
                            {app.tbl_clients?.phone_number}
                          </a>
                        </div>
                        <div className="flex items-center gap-4">
                          <FaCut className="text-[#B8860B]" /> 
                          <span className="text-[#111827]">{app.tbl_services?.service_name || "Custom Entry"}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <FaCalendarAlt className="text-[#B8860B]" /> 
                          <span className="font-semibold text-[#B8860B]">
                            {new Date(app.appointment_date).toLocaleString('en-NG', {
                              weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Financial Data */}
                      <div className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-md text-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Amount Paid</span>
                          <span className="font-bold text-slate-900">{app.amount_paid ? `₦${parseInt(app.amount_paid).toLocaleString()}` : 'N/A'}</span>
                        </div>
                        {app.payment_reference && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Ref</span>
                            <span className="text-xs text-slate-400 font-mono">{app.payment_reference}</span>
                          </div>
                        )}
                      </div>

                      {app.client_message && (
                        <div className="mt-auto p-4 bg-slate-50 border border-slate-100 rounded-md text-xs text-slate-600 italic leading-relaxed">
                          "{app.client_message}"
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}