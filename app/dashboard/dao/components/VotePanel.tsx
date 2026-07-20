"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

interface VotePanelProps {
  proposalId: string;
  onVoteSuccess?: () => void;
}

export default function VotePanel({
  proposalId,
  onVoteSuccess,
}: VotePanelProps) {
  const { address } = useAccount();

  const [loading, setLoading] = useState(false);

  const submitVote = async (
    decision: "Approve" | "Reject" | "Abstain"
  ) => {
    if (!address) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000"
        }/api/dao/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wallet: address,
            proposalId,
            decision,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Voting failed."
        );
      }

      alert(data.message);

      if (onVoteSuccess) {
        onVoteSuccess();
      }
    } catch (error: any) {
      alert(
        error.message ||
          "Unable to submit your vote."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Cast Your Vote
      </h2>

      <p className="mb-6 text-gray-400">
        You can only vote once per proposal.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          disabled={loading}
          onClick={() =>
            submitVote("Approve")
          }
          className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          Approve
        </button>

        <button
          disabled={loading}
          onClick={() =>
            submitVote("Reject")
          }
          className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          Reject
        </button>

        <button
          disabled={loading}
          onClick={() =>
            submitVote("Abstain")
          }
          className="rounded-lg bg-yellow-500 px-5 py-3 font-medium text-black transition hover:bg-yellow-600 disabled:opacity-50"
        >
          Abstain
        </button>
      </div>
    </div>
  );
}