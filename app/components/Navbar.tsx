"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight font-sans"
        >
          Social<span className="text-purple-400">Edger</span>
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex gap-10 text-[18px] font-sans text-gray-300">
          <Link href="/membership" className="hover:text-white transition">Membership</Link>
          <Link href="/reputation" className="hover:text-white transition">Reputation</Link>
          <Link href="/contributors" className="hover:text-white transition">Contributors</Link>
          <Link href="/presale" className="hover:text-white transition">Presale</Link>
          <Link href="/docs" className="hover:text-white transition">Docs</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="hidden md:flex gap-4 font-sans">
          <button className="btn-outline text-[18px]">Login</button>
          <button className="btn-primary text-[18px]">Register</button>
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden font-sans">
          <span className="text-2xl">☰</span>
        </div>
      </div>
    </header>
  );
}
