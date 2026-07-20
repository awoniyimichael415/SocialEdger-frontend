"use client";

import { useEffect, useState } from "react";
import { DAOApi } from "@/src/lib/daoApi";
import { useAccount } from "wagmi";

interface Overview {
  totalProposals: number;
  activeProposals: number;
  totalVotes: number;
  participationRate: number;
}

export default function DaoOverview() {
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
      <div className="rounded-xl border p-6">
        Loading DAO Overview...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <div className="rounded-xl border p-6">
        <h3 className="text-sm text-gray-500">
          Total Proposals
        </h3>
        <p className="mt-2 text-3xl font-bold">
          {overview.totalProposals}
        </p>
      </div>

      <div className="rounded-xl border p-6">
        <h3 className="text-sm text-gray-500">
          Active Proposals
        </h3>
        <p className="mt-2 text-3xl font-bold">
          {overview.activeProposals}
        </p>
      </div>

      <div className="rounded-xl border p-6">
        <h3 className="text-sm text-gray-500">
          Total Votes
        </h3>
        <p className="mt-2 text-3xl font-bold">
          {overview.totalVotes}
        </p>
      </div>

      <div className="rounded-xl border p-6">
        <h3 className="text-sm text-gray-500">
          Participation
        </h3>
        <p className="mt-2 text-3xl font-bold">
          {overview.participationRate}%
        </p>
      </div>
    </div>
  );
}