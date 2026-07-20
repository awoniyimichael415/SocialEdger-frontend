"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

interface Proposal {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  approvalVotes: number;
  rejectionVotes: number;
  abstainedVotes: number;
  createdAt: string;
}

export default function ProposalFeed() {
  const { address } = useAccount();

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const loadProposals = async () => {
      try {
        const response = await DAOApi.proposals(address);
        setProposals(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProposals();
  }, [address]);

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        Loading proposals...
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
        <h2 className="text-xl font-semibold">
          No Active Proposals
        </h2>

        <p className="mt-2 text-gray-400">
          There are currently no proposals available for voting.
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

              <p className="mt-2 text-gray-400">
                {proposal.description}
              </p>
            </div>

            <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white">
              {proposal.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">
                Category
              </p>

              <p className="font-semibold">
                {proposal.category}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Approve
              </p>

              <p className="font-semibold text-green-500">
                {proposal.approvalVotes}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Reject
              </p>

              <p className="font-semibold text-red-500">
                {proposal.rejectionVotes}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Abstain
              </p>

              <p className="font-semibold text-yellow-500">
                {proposal.abstainedVotes}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Created{" "}
              {new Date(
                proposal.createdAt
              ).toLocaleDateString()}
            </p>

            <button className="rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700">
              View Proposal
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}