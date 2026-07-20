"use client";

import { useEffect, useMemo, useState } from "react";

import ContributorSummary from "./components/ContributorSummary";
import ContributorSearch from "./components/ContributorSearch";
import ContributorTable from "./components/ContributorTable";
import ContributorProfile from "./components/ContributorProfile";
import ContributorActions from "./components/ContributorActions";
import ContributorAnalytics from "./components/ContributorAnalytics";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function AdminContributorsPage() {

  const [contributors, setContributors] =
    useState<any[]>([]);

  const [filtered, setFiltered] =
    useState<any[]>([]);

  const [selectedContributor, setSelectedContributor] =
    useState<any>(null);

  const [summary, setSummary] =
    useState<any>(null);

  const [analytics, setAnalytics] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {

    try {

      setLoading(true);

      const [

        contributorRes,

        summaryRes,

        analyticsRes,

      ] = await Promise.all([

        fetch(`${API}/api/contributors`),

        fetch(`${API}/api/contributors/admin/summary`),

        fetch(`${API}/api/contributors/admin/analytics`),

      ]);

      const contributorData =
        await contributorRes.json();

      const summaryData =
        await summaryRes.json();

      const analyticsData =
        await analyticsRes.json();

      setContributors(contributorData);

      setFiltered(contributorData);

      setSummary(summaryData);

      setAnalytics(analyticsData);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadData();

  }, []);

  function handleSearch(keyword: string) {

    if (!keyword) {

      setFiltered(contributors);

      return;

    }

    const search =
      keyword.toLowerCase();

    setFiltered(

      contributors.filter(

        (c) =>

          c.displayName
            ?.toLowerCase()
            .includes(search) ||

          c.username
            ?.toLowerCase()
            .includes(search) ||

          c.walletAddress
            ?.toLowerCase()
            .includes(search) ||

          c.country
            ?.toLowerCase()
            .includes(search) ||

          c.category
            ?.toLowerCase()
            .includes(search)

      )

    );

  }

  const activeContributors =
    useMemo(

      () =>

        contributors.filter(

          (c) =>

            c.accountStatus ===
            "Active"

        ).length,

      [contributors]

    );

  if (loading) {

    return (

      <main className="max-w-7xl mx-auto p-8">

        Loading Contributors...

      </main>

    );

  }

  return (

    <main className="max-w-7xl mx-auto p-8">

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          Contributors Management

        </h1>

        <p className="text-gray-400 mt-3">

          Manage contributor accounts, reputation, verification and ecosystem participation.

        </p>

      </div>

      <ContributorSummary

        totalContributors={
          summary?.totalContributors || 0
        }

        verifiedContributors={
          summary?.verifiedContributors || 0
        }

        pendingVerification={
          summary?.pendingVerification || 0
        }

        suspendedContributors={
          summary?.suspendedContributors || 0
        }

      />

      <ContributorSearch

        onSearch={
          handleSearch
        }

      />

      <ContributorTable

        contributors={
          filtered
        }

        onSelect={
          setSelectedContributor
        }

      />

      <ContributorProfile

        contributor={
          selectedContributor
        }

      />

      <ContributorActions

        contributor={
          selectedContributor
        }

        onRefresh={
          loadData
        }

      />

      <ContributorAnalytics

        totalContributors={
          analytics?.totalContributors || 0
        }

        verifiedContributors={
          summary?.verifiedContributors || 0
        }

        pendingVerification={
          summary?.pendingVerification || 0
        }

        suspendedContributors={
          summary?.suspendedContributors || 0
        }

        averageReputation={
          analytics?.averageReputation || 0
        }

        activeContributors={
          activeContributors
        }

      />

    </main>

  );

}