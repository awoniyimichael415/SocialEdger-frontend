"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface Contributor {
  _id: string;
  displayName: string;
  username: string;
  walletAddress: string;
  totalReputation: number;
  verified: boolean;
}

export default function DashboardLeaderboard() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    try {
      const response = await fetch(
        `${API}/api/contributors`
      );

      if (!response.ok) {
        throw new Error("Failed to load contributors");
      }

      const data: Contributor[] = await response.json();

      const sorted = [...data].sort(
        (a, b) =>
          (b.totalReputation || 0) -
          (a.totalReputation || 0)
      );

      setContributors(sorted.slice(0, 10));
    } catch (error) {
      console.error(
        "Leaderboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

      <h2 className="text-2xl font-bold mb-8">
        Top Contributors
      </h2>

      {loading ? (
        <p className="text-gray-400">
          Loading leaderboard...
        </p>
      ) : contributors.length === 0 ? (
        <p className="text-gray-400">
          No contributor data available.
        </p>
      ) : (
        <div className="space-y-5">

          {contributors.map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between border-b border-white/5 pb-4"
            >
              <div>
                <p className="font-semibold flex items-center gap-2">
                  #{index + 1} {user.displayName}

                  {user.verified && (
                    <span className="text-cyan-400">
                      ✔
                    </span>
                  )}
                </p>

                <p className="text-sm text-gray-500">
                  @{user.username}
                </p>
              </div>

              <div className="text-right">
                <p className="text-cyan-400 font-bold text-lg">
                  {user.totalReputation ?? 0}
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
