"use client";

import { useMemo, useState } from "react";
import type { Contributor } from "@/src/lib/reputationApi";

type Props = {
  contributors: Contributor[];
  onSelect: (wallet: string) => void;
};

export default function ContributorsTable({
  contributors,
  onSelect,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return contributors;

    const keyword = search.toLowerCase();

    return contributors.filter((user) => {
      const displayName =
        user.displayName ||
        user.fullName ||
        user.name ||
        "";

      const username = user.username || "";

      const wallet =
        user.walletAddress ||
        user.wallet ||
        "";

      return (
        displayName.toLowerCase().includes(keyword) ||
        username.toLowerCase().includes(keyword) ||
        wallet.toLowerCase().includes(keyword)
      );
    });
  }, [contributors, search]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Contributors
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Manage contributor reputation records.
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contributor..."
          className="w-72 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-zinc-800 bg-zinc-950">
            <tr className="text-left text-sm text-zinc-400">
              <th className="px-6 py-4">Contributor</th>
              <th className="px-6 py-4">Membership</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Verified</th>
              <th className="px-6 py-4">Reputation</th>
              <th className="px-6 py-4">Level</th>
              <th className="px-6 py-4">DAO Weight</th>
              <th className="px-6 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user, index) => {
              const displayName =
                user.displayName ||
                user.fullName ||
                user.name ||
                "Unknown";

              const username =
                user.username || "unknown";

              const wallet =
                user.walletAddress ||
                user.wallet ||
                "";

              return (
                <tr
                  key={user._id ?? wallet ?? index}
                  className="border-b border-zinc-800 hover:bg-zinc-800/40"
                >
                  <td className="px-6 py-5">
                    <div>
                      <div className="font-semibold text-white">
                        {displayName}
                      </div>

                      <div className="text-sm text-zinc-400">
                        @{username}
                      </div>

                      <div className="text-xs text-zinc-500">
                        {wallet
                          ? `${wallet.slice(0, 8)}...${wallet.slice(-6)}`
                          : "No wallet"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {user.membershipType ?? "-"}
                  </td>

                  <td className="px-6 py-5">
                    {user.accountStatus ?? "-"}
                  </td>

                  <td className="px-6 py-5">
                    {user.verified ? "Yes" : "No"}
                  </td>

                  <td className="px-6 py-5">
                    {user.totalReputation ??
                      user.reputation ??
                      0}
                  </td>

                  <td className="px-6 py-5">
                    {user.contributorLevel ?? 0}
                  </td>

                  <td className="px-6 py-5">
                    {user.daoVotingWeight ?? 0}
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => onSelect(wallet)}
                      disabled={!wallet}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-zinc-500"
                >
                  No contributors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
