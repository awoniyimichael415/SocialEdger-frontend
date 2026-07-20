"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import { injected } from "wagmi/connectors";

import ProfileSummary from "./components/ProfileSummary";
import ReputationCard from "./components/ReputationCard";
import StatsGrid from "./components/StatsGrid";
import QuickActions from "./components/QuickActions";
import ActivityTimeline from "./components/ActivityTimeline";
import MiningCard from "./components/MiningCard";
import RewardsCard from "./components/RewardsCard";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function DashboardHome() {

  const { address, isConnected } =
    useAccount();

  const { connect } =
    useConnect();

  const { disconnect } =
    useDisconnect();

  const [agreementExists, setAgreementExists] =
    useState(false);

  const [checkingAgreement, setCheckingAgreement] =
    useState(false);

  const [loadingReputation, setLoadingReputation] =
    useState(false);

  const [reputation, setReputation] =
    useState<any>(null);

  /*
  ======================================
  LOAD REPUTATION
  ======================================
  */

  useEffect(() => {

    if (!address) return;

    const loadReputation =
      async () => {

        try {

          setLoadingReputation(true);

          const res =
            await fetch(
              `${API}/api/reputation/${address}`
            );

          const data =
            await res.json();

          setReputation(data);

        } catch (err) {

          console.error(
            "Failed to load reputation",
            err
          );

        } finally {

          setLoadingReputation(false);

        }

      };

    loadReputation();

  }, [address]);

  /*
  ======================================
  LOAD AGREEMENT
  ======================================
  */

  useEffect(() => {

    if (!address) return;

    const checkAgreement =
      async () => {

        try {

          setCheckingAgreement(true);

          const res =
            await fetch(
              `${API}/api/agreement/check/${address}`
            );

          const data =
            await res.json();

          setAgreementExists(
            data.exists
          );

        } catch (err) {

          console.error(err);

        } finally {

          setCheckingAgreement(false);

        }

      };

    checkAgreement();

  }, [address]);

  /*
  ======================================
  WALLET NOT CONNECTED
  ======================================
  */

  if (!isConnected) {

    return (

      <main className="min-h-screen section max-w-6xl mx-auto">

        <div className="glass-card p-10 text-center">

          <h1 className="text-5xl font-bold mb-6">

            SocialEdger
            Command Center

          </h1>

          <p className="text-gray-400 mb-8">

            Connect your wallet to
            access your contributor
            dashboard.

          </p>

          <button
            onClick={() =>
              connect({
                connector: injected(),
              })
            }
            className="btn-primary"
          >

            Connect MetaMask

          </button>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen section max-w-7xl mx-auto">

      {/* PART 2 CONTINUES HERE */}

      {/* PROFILE SUMMARY */}

      <ProfileSummary
        wallet={address}
        role={reputation?.role}
        contributor={reputation?.contributor}
        level={reputation?.level}
        badges={reputation?.badges}
      />

      {/* LOADING */}

      {loadingReputation && (

        <div className="glass-card p-8 mb-8 text-center">

          <h2 className="text-2xl font-semibold">
            Loading your ecosystem...
          </h2>

          <p className="text-gray-400 mt-3">
            Fetching contributor reputation,
            statistics and rewards.
          </p>

        </div>

      )}

      {/* INFTO AGREEMENT */}

      {!loadingReputation && (

        <div className="glass-card p-6 mb-8">

          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>

              <h2 className="text-xl font-semibold">
                INFTO Agreement
              </h2>

              {checkingAgreement ? (

                <p className="text-gray-400 mt-2">
                  Checking agreement...
                </p>

              ) : agreementExists ? (

                <p className="text-green-400 mt-2">
                  Agreement Signed ✅
                </p>

              ) : (

                <p className="text-yellow-400 mt-2">
                  Agreement not signed yet.
                </p>

              )}

            </div>

            {agreementExists && (

              <a
                href={`${API}/api/agreement/download/${address}`}
                target="_blank"
                className="btn-primary"
              >

                Download Agreement

              </a>

            )}

          </div>

        </div>

      )}

      {/* REPUTATION + STATS */}

      {!loadingReputation && (

        <div className="grid xl:grid-cols-2 gap-8 mb-8">

          <ReputationCard
            totalReputation={
              reputation?.totalReputation || 0
            }
            level={
              reputation?.level || {
                level: 1,
                title: "New Contributor",
                progress: 0,
                reputationRemaining: 250,
                nextLevel: 250,
                maxLevel: false,
              }
            }
            daoVotingWeight={
              reputation?.daoVotingWeight || 1
            }
            breakdown={
              reputation?.breakdown || {
                membership: 0,
                contributor: 0,
                opportunities: 0,
                rewards: 0,
              }
            }
          />

          <StatsGrid
            contributor={
              reputation?.contributor
            }
          />

        </div>

      )}

      {/* QUICK ACTIONS */}

      <div className="mb-8">

        <QuickActions />

      </div>

      {/* PART 3 CONTINUES BELOW */}

      {/* ACTIVITY + MINING */}

      {!loadingReputation && (

        <div className="grid xl:grid-cols-2 gap-8 mb-8">

          <ActivityTimeline
            history={reputation?.history || []}
          />

          <MiningCard
            multiplier={
              reputation?.role === "Primary Member"
                ? 5
                : reputation?.role === "Secondary Member"
                ? 2
                : 1
            }
            todayMined={0}
            totalMined={0}
          />

        </div>

      )}

      {/* REWARDS */}

      {!loadingReputation && (

        <div className="mb-8">

          <RewardsCard
            contributor={
              reputation?.contributor
            }
          />

        </div>

      )}

      {/* WALLET */}

      <div className="glass-card p-8">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>

            <h2 className="text-2xl font-bold mb-3">
              Connected Wallet
            </h2>

            <p className="text-gray-400 break-all">

              {address}

            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <Link
              href="/dashboard/primary-vault"
              className="btn-primary"
            >
              Primary Vault
            </Link>

            <Link
              href="/dashboard/contributor-profile"
              className="btn-primary"
            >
              My Profile
            </Link>

            <button
              onClick={() => disconnect()}
              className="px-6 py-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >
              Disconnect Wallet
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="text-center py-12">

        <p className="text-gray-500">

          SocialEdger Command Center

        </p>

        <p className="text-gray-600 text-sm mt-2">

          Where Reputation Meets Opportunity

        </p>

      </div>

    </main>

  );

}