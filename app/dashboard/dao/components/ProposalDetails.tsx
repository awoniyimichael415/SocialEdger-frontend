"use client";

interface ProposalDetailsProps {
  proposal: {
    _id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    approvalVotes: number;
    rejectionVotes: number;
    abstainedVotes: number;
    createdAt: string;
    endDate: string;
  };
}

export default function ProposalDetails({
  proposal,
}: ProposalDetailsProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {proposal.title}
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Category: {proposal.category}
          </p>
        </div>

        <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
          {proposal.status}
        </span>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">
          Proposal Description
        </h2>

        <p className="leading-7 text-gray-300">
          {proposal.description}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-neutral-700 p-5">
          <p className="text-sm text-gray-500">
            Approve
          </p>

          <h3 className="mt-2 text-3xl font-bold text-green-500">
            {proposal.approvalVotes}
          </h3>
        </div>

        <div className="rounded-lg border border-neutral-700 p-5">
          <p className="text-sm text-gray-500">
            Reject
          </p>

          <h3 className="mt-2 text-3xl font-bold text-red-500">
            {proposal.rejectionVotes}
          </h3>
        </div>

        <div className="rounded-lg border border-neutral-700 p-5">
          <p className="text-sm text-gray-500">
            Abstain
          </p>

          <h3 className="mt-2 text-3xl font-bold text-yellow-500">
            {proposal.abstainedVotes}
          </h3>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">
            Created
          </p>

          <p className="mt-2 font-semibold">
            {new Date(
              proposal.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Voting Ends
          </p>

          <p className="mt-2 font-semibold">
            {new Date(
              proposal.endDate
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}