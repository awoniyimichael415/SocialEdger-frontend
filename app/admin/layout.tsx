import type { ReactNode } from "react";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="lg:ml-72">

        {/* Top Navigation */}
        <header className="sticky top-0 z-30 backdrop-blur-2xl bg-[#05070d]/80 border-b border-white/10">

          <div className="h-20 px-6 lg:px-10 flex items-center justify-between">

            <div>

              <h1 className="text-2xl font-bold">
                SocialEdger Administration
              </h1>

              <p className="text-sm text-gray-400">
                Manage the SocialEdger ecosystem from one unified dashboard.
              </p>

            </div>

            <div className="flex items-center gap-5">

              {/* Notifications */}

              <button className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">

                🔔

                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-xs flex items-center justify-center">
                  3
                </span>

              </button>

              {/* Admin */}

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
                  A
                </div>

                <div className="hidden md:block">

                  <p className="font-semibold">
                    Administrator
                  </p>

                  <p className="text-xs text-gray-400">
                    SocialEdger Team
                  </p>

                </div>

              </div>

            </div>

          </div>

        </header>

        {/* Page */}

        <div className="p-6 lg:p-10">

          {children}

        </div>

      </div>

    </main>
  );
}