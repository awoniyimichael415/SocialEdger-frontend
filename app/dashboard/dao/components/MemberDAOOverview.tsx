"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

interface Overview {
  totalProposals: number;
  activeProposals: number;
  totalVotes: number;
  participationRate: number;
}

export default function MemberDAOOverview() {
  const { address } = useAccount();

  const [overview, setOverview] = useState<Overview>({
    totalProposals: 0,
    activeProposals: 0,
    totalVotes: 0,
    participationRate: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const loadOverview = async () => {
      try {
        const response = await DAOApi.overview(address);
        setOverview(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, [address]);

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        Loading DAO Overview...
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Total Proposals
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {overview.totalProposals}
        </h2>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Active Proposals
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {overview.activeProposals}
        </h2>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Total Votes
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {overview.totalVotes}
        </h2>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <p className="text-sm text-gray-400">
          Participation
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {overview.participationRate}%
        </h2>
      </div>
    </div>
  );
}