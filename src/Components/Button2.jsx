import Link from "next/link";

export default function Button2({ href, children, className = "", ...props }) {
  // Base luxury styling: Filled -> Outline
  const baseStyles =
    "px-8 py-4 border border-textmain bg-transparent text-textmain text-sm uppercase tracking-widest font-bold hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 inline-flex items-center justify-center text-center disabled:opacity-50 disabled:cursor-not-allowed rounded-md";
  
  const combinedClassName = `${baseStyles} ${className}`;

  // If an href is provided, render a Next.js Link
  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  // Otherwise, render a standard HTML button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}