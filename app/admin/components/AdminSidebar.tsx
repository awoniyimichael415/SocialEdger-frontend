"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
  { name: "Dashboard", icon: "📊", href: "/admin" },
  { name: "Contributors", icon: "👥", href: "/admin/contributors" },
  { name: "Membership NFTs", icon: "🖼", href: "/admin/membership" },
  { name: "Opportunities", icon: "🎯", href: "/admin/opportunities" },
  { name: "Applications", icon: "📄", href: "/admin/applications" },
  { name: "KYC", icon: "🛡", href: "/admin/kyc" },
  { name: "Reputation", icon: "⭐", href: "/admin/reputation" },
  { name: "Rewards", icon: "💰", href: "/admin/rewards" },
  { name: "Presale", icon: "💰", href: "/admin/presale" },
  { name: "Mining", icon: "⛏", href: "/admin/mining" },
  { name: "Blog", icon: "📰", href: "/admin/posts" },
//  { name: "Analytics", icon: "📈", href: "/admin/analytics" },
  { name: "DAO", icon: "🗳", href: "/admin/dao" },
//  { name: "Settings", icon: "⚙", href: "/admin/settings" },
];

export default function AdminSidebar() {

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Button */}

      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 glass-card p-3 rounded-xl"
      >
        ☰
      </button>

      {/* Mobile Overlay */}

      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed top-0 left-0
        h-screen
        w-72
        bg-[#090b12]/95
        backdrop-blur-3xl
        border-r border-white/10
        z-50
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Logo */}

        <div className="p-8 border-b border-white/10">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-2xl">
              S
            </div>

            <div>

              <h1 className="text-xl font-bold">
                SocialEdger
              </h1>

              <p className="text-xs text-gray-400">
                Admin Dashboard
              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <div className="p-5 overflow-y-auto h-[calc(100vh-180px)]">

          {menu.map((item) => {

            const active =
              pathname === item.href;

            return (

              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  mb-2
                  transition
                  ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <span className="text-xl">
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.name}
                </span>

              </Link>

            );

          })}

        </div>

        {/* Footer */}

        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-white/10">

          <div className="rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4">

            <p className="text-sm text-gray-400">
              Ecosystem Status
            </p>

            <div className="flex items-center gap-2 mt-2">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

              <span className="text-green-400 font-medium">
                All Systems Online
              </span>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}