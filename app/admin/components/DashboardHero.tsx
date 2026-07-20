"use client";

import { useEffect, useState } from "react";

export default function DashboardHero() {

  const [time, setTime] = useState("");

  useEffect(() => {

    function updateTime() {

      const now = new Date();

      const hour = now.getHours();

      if (hour < 12) {

        setTime("Good Morning");

      } else if (hour < 18) {

        setTime("Good Afternoon");

      } else {

        setTime("Good Evening");

      }

    }

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);

  }, []);

  return (

    <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-10">

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

        <div>

          <h1 className="text-5xl font-bold">

            {time}, Administrator 👋

          </h1>

          <p className="mt-6 max-w-3xl text-lg text-gray-300">

            Welcome to the SocialEdger Command Center.

            Monitor blockchain activity, contributors, memberships,
            presale performance, rewards, governance,
            opportunities and overall platform health
            from a single dashboard.

          </p>

        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-black/30 p-6 min-w-[260px]">

          <p className="text-gray-400">

            Environment

          </p>

          <h3 className="mt-2 text-2xl font-bold text-cyan-400">

            Sepolia Testnet

          </h3>

          <div className="mt-5 flex items-center gap-3">

            <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400">

              Blockchain Connected

            </span>

          </div>

        </div>

      </div>

    </section>

  );

}