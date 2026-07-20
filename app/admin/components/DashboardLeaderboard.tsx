"use client";

import { useEffect, useState } from "react";

export default function DashboardLeaderboard() {

  const [contributors, setContributors] = useState<any[]>([]);

  useEffect(() => {

    loadLeaderboard();

  }, []);

  async function loadLeaderboard() {

    try {

      const response = await fetch(

        "https://api.socialedger.io/api/contributors"

      );

      const data = await response.json();

      const sorted = [...data].sort(

        (a, b) =>

          (b.reputationScore || 0) -

          (a.reputationScore || 0)

      );

      setContributors(sorted.slice(0, 10));

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

      <h2 className="text-2xl font-bold mb-8">

        Top Contributors

      </h2>

      {contributors.length === 0 ? (

        <p className="text-gray-400">

          No contributor data available.

        </p>

      ) : (

        <div className="space-y-5">

          {contributors.map((user, index) => (

            <div

              key={user._id || index}

              className="flex items-center justify-between border-b border-white/5 pb-4"

            >

              <div>

                <p className="font-semibold">

                  #{index + 1}{" "}

                  {user.fullName ||

                    user.name ||

                    "Unknown Contributor"}

                </p>

                <p className="text-sm text-gray-500">

                  {user.walletAddress || "No Wallet"}

                </p>

              </div>

              <div className="text-right">

                <p className="text-cyan-400 font-bold">

                  {user.reputationScore || 0}

                </p>

                <p className="text-xs text-gray-500">

                  Reputation

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}
