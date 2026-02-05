"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Social<span className="text-purple-400">Edger</span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-10 text-[18px] font-space text-gray-300">
          <Link href="/membership" className="hover:text-white transition">Membership</Link>
          <Link href="/reputation" className="hover:text-white transition">Reputation</Link>
          <Link href="/contributors" className="hover:text-white transition">Contributors</Link>
          <Link href="/presale" className="hover:text-white transition">Presale</Link>
          <Link href="/docs" className="hover:text-white transition">Docs</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-4">
          <button className="btn-outline">Login</button>
          <button className="btn-primary">Register</button>
        </div>

        {/* MOBILE ICON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6 px-6 py-6 bg-black/80 backdrop-blur-xl text-[18px] font-space text-gray-300 border-t border-white/10">
          <Link href="/membership" onClick={() => setOpen(false)}>Membership</Link>
          <Link href="/reputation" onClick={() => setOpen(false)}>Reputation</Link>
          <Link href="/contributors" onClick={() => setOpen(false)}>Contributors</Link>
          <Link href="/presale" onClick={() => setOpen(false)}>Presale</Link>
          <Link href="/docs" onClick={() => setOpen(false)}>Docs</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

          <div className="flex flex-col gap-3 pt-4">
            <button className="btn-outline">Login</button>
            <button className="btn-primary">Register</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
