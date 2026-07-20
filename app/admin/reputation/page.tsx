"use client";

import { useEffect, useState } from "react";

import ReputationApi from "@/src/lib/reputationApi";

import DashboardCards from "./components/DashboardCards";
import Leaderboard from "./components/Leaderboard";
import ContributorsTable from "./components/ContributorsTable";
import ContributorDetails from "./components/ContributorDetails";
import LoadingState from "./components/LoadingState";

type DashboardData = Record<string, any>;
type Contributor = Record<string, any>;

export default function ReputationPage() {
  const [loading, setLoading] = useState<boolean>(true);

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [leaderboard, setLeaderboard] =
    useState<Contributor[]>([]);

  const [contributors, setContributors] =
    useState<Contributor[]>([]);

  const [selectedWallet, setSelectedWallet] =
    useState<string | null>(null);

  const [selectedContributor, setSelectedContributor] =
    useState<Contributor | null>(null);

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

      setDashboard(dashboardData as DashboardData);
      setLeaderboard(leaderboardData as Contributor[]);
      setContributors(contributorsData as Contributor[]);
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

      setSelectedContributor(
        contributor as Contributor
      );
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
