import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaCalendarAlt, FaHistory, FaUser } from 'react-icons/fa'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile and appointments from database
  // This will require RLS policies to be set up in Supabase
  const { data: profile } = await supabase
    .from('tbl_clients')
    .select('*')
    .eq('client_id', user.id)
    .single()

  const { data: appointments } = await supabase
    .from('tbl_appointments')
    .select('*, tbl_services(service_name, price)')
    .eq('client_id', user.id)
    .order('appointment_date', { ascending: false })

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || user.email.split('@')[0];
  const fullName = user.user_metadata?.full_name || 'Client';

  return (
    <div className="flex flex-col min-h-screen bg-background text-textmain pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold text-textmain mb-2">Welcome Back, {firstName}</h1>
            <p className="text-textmuted">Manage your grooming appointments</p>
          </div>
          <Link href="/contact" className="hidden sm:inline-flex bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-secondary transition-all duration-300 shadow-md">
            New Appointment
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-surface border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
                  <FaUser />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{fullName}</h2>
                  <p className="text-sm text-textmuted">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-textmuted font-semibold mb-1">Phone Number</p>
                  <p className="text-sm">{profile?.phone_number || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-textmuted font-semibold mb-1">Member Since</p>
                  <p className="text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="md:col-span-2">
            <div className="bg-surface border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-semibold flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" /> Upcoming Appointments
                </h2>
              </div>
              
              {!appointments || appointments.filter(a => a.status !== 'Completed').length === 0 ? (
                <div className="text-center py-10 bg-background rounded-lg border border-dashed border-gray-300">
                  <p className="text-textmuted mb-4">You have no upcoming appointments.</p>
                  <Link href="/contact" className="text-primary font-medium hover:underline">
                    Book one now
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.filter(a => a.status !== 'Completed').map((apt) => (
                    <div key={apt.appointment_id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background border border-gray-100 rounded-lg hover:border-primary/30 transition-colors">
                      <div>
                        <p className="font-semibold text-lg">{apt.tbl_services?.service_name}</p>
                        <p className="text-textmuted text-sm">{new Date(apt.appointment_date).toLocaleString()}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-1">
                          {apt.status}
                        </span>
                        <p className="font-medium text-sm">Ref: {apt.payment_reference?.slice(0,8)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-surface border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-semibold flex items-center gap-2">
                  <FaHistory className="text-textmuted" /> History
                </h2>
              </div>
              
              {!appointments || appointments.filter(a => a.status === 'Completed').length === 0 ? (
                <p className="text-textmuted text-sm">No completed appointments found.</p>
              ) : (
                <div className="space-y-3">
                  {appointments.filter(a => a.status === 'Completed').map((apt) => (
                    <div key={apt.appointment_id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium">{apt.tbl_services?.service_name}</p>
                        <p className="text-textmuted text-xs">{new Date(apt.appointment_date).toLocaleDateString()}</p>
                      </div>
                      <p className="font-medium text-sm">₦{apt.amount_paid}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
