"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

interface Analytics {
  totalVotes: number;
  approvedVotes: number;
  rejectedVotes: number;
  abstainedVotes: number;
  participationRate: number;
}

export default function VotingAnalytics() {
  const { address } = useAccount();

  const [analytics, setAnalytics] = useState<Analytics>({
    totalVotes: 0,
    approvedVotes: 0,
    rejectedVotes: 0,
    abstainedVotes: 0,
    participationRate: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const loadAnalytics = async () => {
      try {
        const response = await DAOApi.analytics(address);
        setAnalytics(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [address]);

  if (loading) {
    return (
      <div className="rounded-xl border p-6">
        Loading Voting Analytics...
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Voting Analytics
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div>
          <p className="text-sm text-gray-500">
            Total Votes
          </p>
          <p className="mt-2 text-2xl font-bold">
            {analytics.totalVotes}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Approved
          </p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {analytics.approvedVotes}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Rejected
          </p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {analytics.rejectedVotes}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Abstained
          </p>
          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {analytics.abstainedVotes}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Participation
          </p>
          <p className="mt-2 text-2xl font-bold">
            {analytics.participationRate}%
          </p>
        </div>
      </div>
    </div>
  );
}