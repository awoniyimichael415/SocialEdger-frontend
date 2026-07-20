"use client";

import DashboardHero from "./components/DashboardHero";
import DashboardStats from "./components/DashboardStats";
import DashboardActivity from "./components/DashboardActivity";
import DashboardLeaderboard from "./components/DashboardLeaderboard";
import DashboardSystemHealth from "./components/DashboardSystemHealth";

export default function AdminDashboard() {
  return (
    <main className="space-y-10">

      {/* =========================================
          HERO
      ========================================= */}
      <DashboardHero />

      {/* =========================================
          LIVE PLATFORM STATISTICS
      ========================================= */}
      <DashboardStats />

      {/* =========================================
          LIVE ECOSYSTEM ACTIVITY
      ========================================= */}
      <section>
        <DashboardActivity />
      </section>

      {/* =========================================
          TOP CONTRIBUTORS
      ========================================= */}
      <section>
        <DashboardLeaderboard />
      </section>

      {/* =========================================
          SYSTEM HEALTH
      ========================================= */}
      <section>
        <DashboardSystemHealth />
      </section>

    </main>
  );
}
