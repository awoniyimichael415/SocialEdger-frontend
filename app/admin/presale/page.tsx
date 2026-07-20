"use client";

import PresaleOverview from "./components/PresaleOverview";
import PresaleAnalytics from "./components/PresaleAnalytics";
import PhaseManager from "./components/PhaseManager";
import PurchaseLimits from "./components/PurchaseLimits";
import WithdrawPanel from "./components/WithdrawPanel";
import ParticipantTable from "./components/ParticipantTable";

export default function AdminPresalePage() {

  return (

    <main className="min-h-screen bg-[#070B14] text-white">

      <div className="mx-auto max-w-7xl px-8 py-10">

        <h1 className="text-5xl font-bold mb-3">
          Presale Administration
        </h1>

        <p className="text-gray-400 mb-12">
          Manage every aspect of the SocialEdger SET Token Presale from one dashboard.
        </p>

        <div className="space-y-8">

          <PresaleOverview />

          <PresaleAnalytics />

          <PhaseManager />

          <PurchaseLimits />

          <WithdrawPanel />

          <ParticipantTable />

        </div>

      </div>

    </main>

  );

}