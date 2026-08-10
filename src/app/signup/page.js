import Link from 'next/link'
import { signup } from '@/app/auth/actions'

export default async function SignupPage({ searchParams }) {
  const message = (await searchParams)?.message

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-20 mx-auto min-h-[70vh]">
      <Link
        href="/"
        className="absolute left-8 top-28 py-2 px-4 rounded-md no-underline text-textmuted bg-surface hover:bg-gray-200 flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-textmain" action={signup}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">Create an Account</h1>
          <p className="text-textmuted font-light">Join Famous Haircuts to book your sessions</p>
        </div>
        
        <label className="text-sm font-medium mt-4 uppercase tracking-wider text-textmuted" htmlFor="full_name">
          Full Name
        </label>
        <input
          className="rounded-md px-4 py-3 bg-surface border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary mb-4"
          name="full_name"
          placeholder="John Doe"
          required
        />

        <label className="text-sm font-medium mt-2 uppercase tracking-wider text-textmuted" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-3 bg-surface border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary mb-4"
          name="email"
          placeholder="you@example.com"
          required
        />
        
        <label className="text-sm font-medium uppercase tracking-wider text-textmuted" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-3 bg-surface border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        <button className="bg-transparent border border-textmain text-textmain font-medium px-4 py-3 rounded-md hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm mb-2">
          Sign Up
        </button>
        
        {message && (
          <p className="mt-4 p-4 bg-red-50 text-red-600 text-center rounded-md text-sm border border-red-200">
            {message}
          </p>
        )}
        
        <div className="text-center mt-4">
          <p className="text-sm text-textmuted">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
