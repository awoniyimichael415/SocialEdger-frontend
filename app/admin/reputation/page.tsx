"use client";

import { useEffect, useState } from "react";

import ReputationApi from "@/src/lib/reputationApi";

import DashboardCards from "./components/DashboardCards";
import Leaderboard from "./components/Leaderboard";
import ContributorsTable from "./components/ContributorsTable";
import ContributorDetails from "./components/ContributorDetails";
import LoadingState from "./components/LoadingState";

export default function ReputationPage() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [contributors, setContributors] = useState([]);

  const [selectedWallet, setSelectedWallet] =
    useState<string | null>(null);

  const [selectedContributor, setSelectedContributor] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [
        dashboardData,
        leaderboardData,
        contributorsData,
      ] = await Promise.all([
        ReputationApi.getDashboard(),
        ReputationApi.getLeaderboard(),
        ReputationApi.getContributors(),
      ]);

      setDashboard(dashboardData);
      setLeaderboard(leaderboardData);
      setContributors(contributorsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function selectContributor(wallet: string) {
    try {
      setSelectedWallet(wallet);

      const contributor =
        await ReputationApi.getReputation(wallet);

      setSelectedContributor(contributor);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <main className="space-y-8 p-8">

      <section>
        <h1 className="text-4xl font-bold">
          Reputation Management
        </h1>

        <p className="mt-2 text-zinc-500">
          Manage contributor reputation,
          membership, badges, voting
          weight and contributor history.
        </p>
      </section>

      <DashboardCards
        dashboard={dashboard}
      />

      <Leaderboard
        contributors={leaderboard}
        onSelect={selectContributor}
      />

      <ContributorsTable
        contributors={contributors}
        onSelect={selectContributor}
      />

      {selectedContributor && (
        <ContributorDetails
          data={selectedContributor}
        />
      )}

    </main>
  );
}