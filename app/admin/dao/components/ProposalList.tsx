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
  createdAt: string;
}

export default function ProposalList() {
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
      <div className="rounded-xl border p-6">
        Loading proposals...
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="rounded-xl border p-6">
        No proposals available.
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        DAO Proposals
      </h2>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal._id}
            className="rounded-lg border p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {proposal.title}
              </h3>

              <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                {proposal.status}
              </span>
            </div>

            <p className="mt-3 text-gray-600">
              {proposal.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <span>
                <strong>Category:</strong> {proposal.category}
              </span>

              <span>
                <strong>Created:</strong>{" "}
                {new Date(proposal.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}