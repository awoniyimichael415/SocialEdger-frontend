"use client";

import { useEffect, useMemo, useState } from "react";

export default function PresaleAnalytics() {

  const [summary, setSummary] = useState<any>(null);
  const [remaining, setRemaining] = useState<any>(null);
  const [phase, setPhase] = useState<any>(null);

  useEffect(() => {

    loadData();

    const timer = setInterval(loadData, 10000);

    return () => clearInterval(timer);

  }, []);

  async function loadData() {

    try {

      const [summaryRes, remainingRes, phaseRes] =
        await Promise.all([

          fetch("http://localhost:5000/api/presale/summary"),

          fetch("http://localhost:5000/api/presale/remaining"),

          fetch("http://localhost:5000/api/presale/current-phase"),

        ]);

      setSummary(await summaryRes.json());
      setRemaining(await remainingRes.json());
      setPhase(await phaseRes.json());

    } catch (err) {

      console.error(err);

    }

  }

  const sold = summary ? Number(summary[2]) / 1e18 : 0;

  const left = remaining
    ? Number(remaining.remainingTokens) / 1e18
    : 0;

  const total = sold + left;

  const progress =
    total > 0
      ? (sold / total) * 100
      : 0;

  const countdown = useMemo(() => {

    if (!phase?.endTime)
      return "No Active Phase";

    const now = Math.floor(Date.now() / 1000);

    let seconds =
      Number(phase.endTime) - now;

    if (seconds <= 0)
      return "Ended";

    const days =
      Math.floor(seconds / 86400);

    seconds %= 86400;

    const hours =
      Math.floor(seconds / 3600);

    seconds %= 3600;

    const minutes =
      Math.floor(seconds / 60);

    return `${days}d ${hours}h ${minutes}m`;

  }, [phase]);

  return (

    <section className="rounded-3xl border border-cyan-500/20 bg-[#111827] p-8">

      <h2 className="text-3xl font-bold mb-8">

        Presale Analytics

      </h2>

      <div className="grid gap-8 lg:grid-cols-2">

        <div>

          <div className="flex justify-between mb-3">

            <span className="text-gray-400">

              Presale Progress

            </span>

            <span className="font-semibold">

              {progress.toFixed(2)}%

            </span>

          </div>

          <div className="h-4 rounded-full bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">

            <div>

              <p className="text-gray-400">

                SET Sold

              </p>

              <h3 className="text-2xl font-bold">

                {sold.toLocaleString()}

              </h3>

            </div>

            <div>

              <p className="text-gray-400">

                Remaining SET

              </p>

              <h3 className="text-2xl font-bold">

                {left.toLocaleString()}

              </h3>

            </div>

          </div>

        </div>

        <div className="space-y-6">

          <div>

            <p className="text-gray-400">

              Current Status

            </p>

            <h3 className="text-2xl font-bold">

              {phase?.active
                ? "ACTIVE"
                : "INACTIVE"}

            </h3>

          </div>

          <div>

            <p className="text-gray-400">

              Current Phase

            </p>

            <h3 className="text-2xl font-bold">

              {phase?.name ?? "--"}

            </h3>

          </div>

          <div>

            <p className="text-gray-400">

              Phase Ends In

            </p>

            <h3 className="text-2xl font-bold">

              {countdown}

            </h3>

          </div>

          <div>

            <p className="text-gray-400">

              Exchange Rate

            </p>

            <h3 className="text-2xl font-bold">

              {phase
                ? `1 ETH = ${phase.rate} SET`
                : "--"}

            </h3>

          </div>

        </div>

      </div>

    </section>

  );

}