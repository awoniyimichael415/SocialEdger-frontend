"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import RewardBalances from "./components/RewardBalances";
import RewardStatistics from "./components/RewardStatistics";
import WithdrawalPanel from "./components/WithdrawalPanel";
import RewardHistory from "./components/RewardHistory";
import WithdrawalHistory from "./components/WithdrawalHistory";
import RewardAnalytics from "./components/RewardAnalytics";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function RewardsPage() {

  const { address, isConnected } =
    useAccount();

  const [loading, setLoading] =
    useState(true);

  const [rewards, setRewards] =
    useState<any>(null);

  const [withdrawals, setWithdrawals] =
    useState<any[]>([]);

  async function loadRewards() {

    if (!address) return;

    try {

      setLoading(true);

      const rewardRes =
        await fetch(
          `${API}/api/rewards/${address}`
        );

      const rewardData =
        await rewardRes.json();

      setRewards(rewardData);

      const withdrawalRes =
        await fetch(
          `${API}/api/rewards/withdrawals/${address}`
        );

      const withdrawalData =
        await withdrawalRes.json();

      setWithdrawals(withdrawalData);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadRewards();

  }, [address]);

  if (!isConnected) {

    return (

      <main className="section max-w-7xl mx-auto">

        <div className="glass-card p-10 text-center">

          <h1 className="text-5xl font-bold">

            Rewards Center

          </h1>

          <p className="text-gray-400 mt-6">

            Connect your wallet to access your rewards.

          </p>

        </div>

      </main>

    );

  }

  if (loading) {

    return (

      <main className="section max-w-7xl mx-auto">

        <div className="glass-card p-10 text-center">

          Loading rewards...

        </div>

      </main>

    );

  }

  const wallet =
    rewards?.wallet;

  const history =
    rewards?.history || [];

  return (

    <main className="section max-w-7xl mx-auto">

      <div className="mb-12">

        <h1 className="text-5xl font-bold">

          Rewards Center

        </h1>

        <p className="text-gray-400 mt-4">

          Manage your HIVE, SET and DAOCRAT rewards from one place.

        </p>

      </div>

      {/* Continue in Part 2 */}

      <RewardBalances
        wallet={wallet}
      />

      <RewardStatistics
        wallet={wallet}
      />

      <WithdrawalPanel
        wallet={wallet}
        walletAddress={address!}
        onSuccess={loadRewards}
      />

      <RewardAnalytics
        wallet={wallet}
        history={history}
        withdrawals={withdrawals}
      />

      <RewardHistory
        history={history}
      />

      <WithdrawalHistory
        withdrawals={withdrawals}
      />

    </main>

  );

}