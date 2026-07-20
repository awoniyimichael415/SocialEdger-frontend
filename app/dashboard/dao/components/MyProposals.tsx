"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

interface Proposal {
  _id: string;
  title: string;
  category: string;
  status: string;
  approvalVotes: number;
  rejectionVotes: number;
  abstainedVotes: number;
  createdAt: string;
}

export default function MyProposals() {
  const { address } = useAccount();

  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (!address) return;

    const loadMyProposals = async () => {
      try {
        const response = await DAOApi.myProposals(address);

        setProposals(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMyProposals();
  }, [address]);

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        Loading your proposals...
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
        <h2 className="text-2xl font-bold">
          No Proposals Yet
        </h2>

        <p className="mt-3 text-gray-400">
          You haven't submitted any DAO proposals yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <div
          key={proposal._id}
          className="rounded-xl border border-neutral-800 bg-neutral-900 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {proposal.title}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                {proposal.category}
              </p>
            </div>

            <span className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
              {proposal.status}
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-neutral-700 p-4">
              <p className="text-sm text-gray-500">
                Approvals
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-500">
                {proposal.approvalVotes}
              </h3>
            </div>

            <div className="rounded-lg border border-neutral-700 p-4">
              <p className="text-sm text-gray-500">
                Rejections
              </p>

              <h3 className="mt-2 text-3xl font-bold text-red-500">
                {proposal.rejectionVotes}
              </h3>
            </div>

            <div className="rounded-lg border border-neutral-700 p-4">
              <p className="text-sm text-gray-500">
                Abstained
              </p>

              <h3 className="mt-2 text-3xl font-bold text-yellow-500">
                {proposal.abstainedVotes}
              </h3>
            </div>
          </div>

          <div className="mt-6 flex justify-between text-sm text-gray-500">
            <span>
              Submitted on{" "}
              {new Date(
                proposal.createdAt
              ).toLocaleDateString()}
            </span>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}