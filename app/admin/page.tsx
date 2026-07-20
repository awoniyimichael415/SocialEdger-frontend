"use client";

import DashboardHero from "./components/DashboardHero";
import DashboardStats from "./components/DashboardStats";
import DashboardActivity from "./components/DashboardActivity";
import DashboardLeaderboard from "./components/DashboardLeaderboard";
import DashboardQuickActions from "./components/DashboardQuickActions";
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
          ACTIVITY + LEADERBOARD
      ========================================= */}

      <section className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <DashboardActivity />

        </div>

        <div>

          <DashboardLeaderboard />

        </div>

      </section>

      {/* =========================================
          QUICK ACTIONS + SYSTEM HEALTH
      ========================================= */}

      <section className="grid xl:grid-cols-2 gap-8">

        <DashboardQuickActions />

        <DashboardSystemHealth />

      </section>

    </main>

  );

}