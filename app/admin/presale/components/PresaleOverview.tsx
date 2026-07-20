"use client";

import { useEffect, useState } from "react";

export default function PresaleOverview() {

  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {

    loadSummary();

  }, []);

  async function loadSummary() {

    try {

      const res = await fetch(
        "http://localhost:5000/api/presale/summary"
      );

      const data = await res.json();

      setSummary(data);

    } catch (error) {

      console.error(error);

    }

  }

  const cards = [

    {

      title: "Current Phase",

      value:
        summary
          ? Number(summary[0]) + 1
          : "--",

    },

    {

      title: "ETH Raised",

      value:
        summary
          ? `${(
              Number(summary[1]) / 1e18
            ).toLocaleString()} ETH`
          : "--",

    },

    {

      title: "SET Sold",

      value:
        summary
          ? (
              Number(summary[2]) / 1e18
            ).toLocaleString()
          : "--",

    },

    {

      title: "Participants",

      value:
        summary
          ? Number(summary[3])
          : "--",

    },

    {

      title: "Minimum Purchase",

      value:
        summary
          ? `${Number(summary[4]) / 1e18} ETH`
          : "--",

    },

    {

      title: "Maximum Purchase",

      value:
        summary
          ? `${Number(summary[5]) / 1e18} ETH`
          : "--",

    },

  ];

  return (

    <section>

      <h2 className="text-3xl font-bold mb-8">

        Presale Overview

      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => (

          <div
            key={card.title}
            className="rounded-3xl border border-cyan-500/20 bg-[#111827] p-8"
          >

            <p className="text-gray-400">

              {card.title}

            </p>

            <h3 className="mt-4 text-3xl font-bold">

              {card.value}

            </h3>

          </div>

        ))}

      </div>

    </section>

  );

}