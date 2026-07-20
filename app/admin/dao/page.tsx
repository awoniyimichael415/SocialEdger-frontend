"use client";

import DaoOverview from "./components/DaoOverview";
import ProposalManager from "./components/ProposalManager";
import ProposalList from "./components/ProposalList";
import VotingAnalytics from "./components/VotingAnalytics";
import TreasuryOverview from "./components/TreasuryOverview";
import GovernanceActivity from "./components/GovernanceActivity";

export default function DaoDashboard() {

  return (

    <main className="min-h-screen bg-[#070B14] text-white">

      <div className="mx-auto max-w-7xl px-8 py-10">

        <h1 className="text-5xl font-bold mb-3">

          DAO Governance

        </h1>

        <p className="text-gray-400 mb-12">

          Manage governance proposals, voting, treasury
          oversight and decentralized decision making
          across the SocialEdger ecosystem.

        </p>

        <div className="space-y-8">

          <DaoOverview />

          <VotingAnalytics />

          <ProposalManager />

          <ProposalList />

          <TreasuryOverview />

          <GovernanceActivity />

        </div>

      </div>

    </main>

  );

}