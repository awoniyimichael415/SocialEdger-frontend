"use client";

import { useEffect, useMemo, useState } from "react";

import RewardSummary from "./components/RewardSummary";
import ContributorSearch from "./components/ContributorSearch";
import RewardDistribution from "./components/RewardDistribution";
import RewardTransactions from "./components/RewardTransactions";
import WithdrawalRequests from "./components/WithdrawalRequests";
import RewardAnalytics from "./components/RewardAnalytics";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function AdminRewardsPage() {

  const [selectedContributor, setSelectedContributor] =
    useState<any>(null);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [withdrawals, setWithdrawals] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {

    try {

      setLoading(true);

      const txRes = await fetch(
        `${API}/api/rewards/admin/transactions`
      );

      if (txRes.ok) {

        const txData =
          await txRes.json();

        setTransactions(txData);

      }

      const wdRes = await fetch(
        `${API}/api/rewards/admin/withdrawals`
      );

      if (wdRes.ok) {

        const wdData =
          await wdRes.json();

        setWithdrawals(wdData);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadData();

  }, []);

  /*
  =========================================
  ANALYTICS
  =========================================
  */

  const analytics = useMemo(() => {

    let totalHive = 0;

    let totalSet = 0;

    let totalDaoCrat = 0;

    transactions.forEach((tx) => {

      if (tx.token === "HIVE") {

        totalHive += tx.amount;

      }

      if (tx.token === "SET") {

        totalSet += tx.amount;

      }

      if (tx.token === "DAOCRAT") {

        totalDaoCrat += tx.amount;

      }

    });

    const rewardedContributors =
      new Set(
        transactions.map(
          (tx) => tx.walletAddress
        )
      ).size;

    const averageReward =

      transactions.length > 0

        ? Math.round(

            (totalHive +
              totalSet +
              totalDaoCrat) /

              transactions.length

          )

        : 0;

    return {

      totalHive,

      totalSet,

      totalDaoCrat,

      rewardedContributors,

      averageReward,

    };

  }, [transactions]);

  if (loading) {

    return (

      <main className="max-w-7xl mx-auto p-8">

        Loading Rewards...

      </main>

    );

  }

  return (

    <main className="max-w-7xl mx-auto p-8">

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          Rewards Management

        </h1>

        <p className="text-gray-400 mt-4">

          Manage contributor rewards,
          withdrawals and reward analytics.

        </p>

      </div>

      <RewardSummary

        totalDistributed={
          transactions.length
        }

        pendingWithdrawals={
          withdrawals.filter(

            (w) =>
              w.status === "Pending"

          ).length
        }

        approvedWithdrawals={
          withdrawals.filter(

            (w) =>
              w.status === "Approved"

          ).length
        }

        rewardedContributors={
          analytics.rewardedContributors
        }

      />

      <ContributorSearch

        onSelect={
          setSelectedContributor
        }

      />

      <RewardDistribution

        contributor={
          selectedContributor
        }

        onRewardSent={
          loadData
        }

      />

      <RewardTransactions

        transactions={
          transactions
        }

      />

      <WithdrawalRequests

        withdrawals={
          withdrawals
        }

        onRefresh={
          loadData
        }

      />

      <RewardAnalytics

        totalHive={
          analytics.totalHive
        }

        totalSet={
          analytics.totalSet
        }

        totalDaoCrat={
          analytics.totalDaoCrat
        }

        totalWithdrawals={
          withdrawals.length
        }

        totalContributors={
          analytics.rewardedContributors
        }

        averageReward={
          analytics.averageReward
        }

      />

    </main>

  );

}