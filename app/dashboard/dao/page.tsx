"use client";

import MemberDAOOverview from "./components/MemberDAOOverview";
import ProposalFeed from "./components/ProposalFeed";
import CreateProposal from "./components/CreateProposal";
import MyProposals from "./components/MyProposals";
import GovernanceHistory from "./components/GovernanceHistory";

export default function MemberDAOPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-8">

        {/* Header */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold sm:text-4xl">
              DAO Governance
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-400">
              Participate in SocialEdger governance by creating proposals,
              voting on community decisions, and tracking your governance
              activities. DAO participation is available exclusively to
              Premium Members.
            </p>
          </div>
        </section>

        {/* Overview */}
        <MemberDAOOverview />

        {/* Active Proposals */}
        <ProposalFeed />

        {/* Create Proposal */}
        <CreateProposal />

        {/* My Proposals */}
        <MyProposals />

        {/* Governance History */}
        <GovernanceHistory />

      </div>
    </div>
  );
}