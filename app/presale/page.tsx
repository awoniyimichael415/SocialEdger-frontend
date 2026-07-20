"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
} from "wagmi";

import { parseEther } from "viem";
import { motion } from "framer-motion";

import SpaceScene from "../components/SpaceScene";
import { CONTRACTS } from "@/src/lib/contracts";

export default function PresalePage() {

  const { address, isConnected } = useAccount();

  const [ethAmount, setEthAmount] = useState("");

  const { writeContract, data: hash } = useWriteContract();

  const { isLoading: txLoading, isSuccess } =
    useWaitForTransactionReceipt({
      hash,
    });

  // SET Balance
  const { data: tokenBalance } = useReadContract({
    address: CONTRACTS.PresaleToken.address as `0x${string}`,
    abi: CONTRACTS.PresaleToken.abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  /*
=========================================
LIVE PRESALE DATA
=========================================
*/

  const { data: presaleData } = useReadContracts({

    contracts: [

      {
        address:
          CONTRACTS.Presale.address as `0x${string}`,

        abi:
          CONTRACTS.Presale.abi,

        functionName:
          "getCurrentPhase",
      },

      {
        address:
          CONTRACTS.Presale.address as `0x${string}`,

        abi:
          CONTRACTS.Presale.abi,

        functionName:
          "presaleSummary",
      },

      {
        address:
          CONTRACTS.Presale.address as `0x${string}`,

        abi:
          CONTRACTS.Presale.abi,

        functionName:
          "remainingTokens",
      },

      ...(address
        ? [
            {
              address:
                CONTRACTS.Presale.address as `0x${string}`,

              abi:
                CONTRACTS.Presale.abi,

              functionName:
                "participantInfo",

              args: [address],
            },
          ]
        : []),

    ],

  });

/*
=========================================
PARSED DATA
=========================================
*/

  const phase =
    presaleData?.[0]?.result;

  const summary =
    presaleData?.[1]?.result;

  const remaining =
    presaleData?.[2]?.result;

  const participant =
    presaleData?.[3]?.result;

  const buyTokens = async () => {
    if (!ethAmount) return;

    writeContract({
      address: CONTRACTS.Presale.address as `0x${string}`,
      abi: CONTRACTS.Presale.abi,
      functionName: "buyTokens",
      value: parseEther(ethAmount),
    });
  };
/*
=========================================
LIVE PURCHASE ESTIMATION
=========================================
*/

  const estimatedSET =
    phase && ethAmount
      ? Number(ethAmount) * Number(phase.rate)
      : 0;

  const minimumETH =
    summary
      ? Number(summary[4]) / 1e18
      : 0;

  const maximumETH =
    summary
      ? Number(summary[5]) / 1e18
      : 0;

  const fadeUp = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">

      <SpaceScene />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 z-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >

          <h1 className="text-[12vw] leading-none font-extrabold tracking-tight">

            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              TRIAD
            </span>

            <span className="block text-white mt-4">
              TOKEN ECONOMY
            </span>

          </h1>

          <p className="mt-8 max-w-4xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed">
            Powering the SocialEdger ecosystem through a multi-token
            architecture designed for stability, utility,
            governance, and decentralized participation.
          </p>

        </motion.div>

      </section>

      {/* ================= TRIAD TOKENS ================= */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold text-center mb-8">
            Triad Token Technology
          </h2>

          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-20">
            SocialEdger introduces a three-layer token architecture
            powering ecosystem participation, economic stability,
            governance, and contributor incentives.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* ================= SET ================= */}
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-2xl p-10"
          >

            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />

            {/* TOKEN LOGO */}
            <div className="mb-8 flex justify-center">
              <img
                src="/tokens/set-token.png"
                alt="SET Token"
                className="w-full h-auto object-contain mx-auto mb-8 max-h-[260px]"
              />
            </div>

            <span className="text-cyan-400 uppercase tracking-[4px] text-sm">
              Stable Coin
            </span>

            <h3 className="text-4xl font-bold mt-4 mb-6">
              SET
            </h3>

            <p className="text-gray-300 leading-relaxed mb-8">
              SET provides a stable financial layer for ecosystem
              transactions, participation stability,
              and future payment infrastructure.
            </p>

            <div className="space-y-4 text-gray-300 mb-10">

              <div>✔ Stable ecosystem utility</div>
              <div>✔ Transaction settlement layer</div>
              <div>✔ Economic consistency</div>
              <div>✔ Future ecosystem payments</div>

            </div>

            {/* DENOMINATION */}
            <div className="rounded-2xl border border-cyan-500/20 bg-black/30 p-5">
              <h4 className="text-cyan-400 font-semibold mb-4">
                Denomination
              </h4>

              <div className="space-y-2 text-gray-300 text-sm">
                <div>1 SET</div>
                <div>0.1 dSET</div>
                <div>0.01 cSET</div>
                <div>0.001 mSET</div>
              </div>
            </div>

          </motion.div>

          {/* ================= HIVE ================= */}
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-2xl p-10"
          >

            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 blur-[120px]" />

            {/* TOKEN LOGO */}
            <div className="mb-8 flex justify-center">
              <img
                src="/tokens/hive-token.png"
                alt="HIVE Token"
                className="w-full h-auto object-contain mx-auto mb-8 max-h-[260px]"
              />
            </div>

            <span className="text-purple-400 uppercase tracking-[4px] text-sm">
              Utility Token
            </span>

            <h3 className="text-4xl font-bold mt-4 mb-6">
              HIVE
            </h3>

            <p className="text-gray-300 leading-relaxed mb-8">
              HIVE powers participation, contributor incentives,
              rewards, ecosystem engagement,
              and platform utility mechanisms.
            </p>

            <div className="space-y-4 text-gray-300 mb-10">

              <div>✔ Contributor incentives</div>
              <div>✔ Ecosystem utility</div>
              <div>✔ Participation rewards</div>
              <div>✔ Platform activation layer</div>

            </div>

            {/* DENOMINATION */}
            <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-5">
              <h4 className="text-purple-400 font-semibold mb-4">
                Denomination
              </h4>

              <div className="space-y-2 text-gray-300 text-sm">
                <div>1 HIVE</div>
                <div>0.1 dHIVE</div>
                <div>0.01 cHIVE</div>
                <div>0.001 mHIVE</div>
              </div>
            </div>

          </motion.div>

          {/* ================= DAOCRAT ================= */}
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-2xl p-10"
          >

            <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 blur-[120px]" />

            {/* TOKEN LOGO */}
            <div className="mb-8 flex justify-center">
              <img
                src="/tokens/daocrat-token.png"
                alt="Daocrat Token"
                className="w-full h-auto object-contain mx-auto mb-8 max-h-[260px]"
              />
            </div>

            <span className="text-pink-400 uppercase tracking-[4px] text-sm">
              Governance Token
            </span>

            <h3 className="text-4xl font-bold mt-4 mb-6">
              Daocrat
            </h3>

            <p className="text-gray-300 leading-relaxed mb-8">
              Daocrat enables decentralized governance,
              voting participation, ecosystem direction,
              and community-led evolution.
            </p>

            <div className="space-y-4 text-gray-300 mb-10">

              <div>✔ Governance participation</div>
              <div>✔ Voting influence</div>
              <div>✔ Ecosystem proposals</div>
              <div>✔ Community-led direction</div>

            </div>

            {/* DENOMINATION */}
            <div className="rounded-2xl border border-pink-500/20 bg-black/30 p-5">
              <h4 className="text-pink-400 font-semibold mb-4">
                Denomination
              </h4>

              <div className="space-y-2 text-gray-300 text-sm">
                <div>1 DAO</div>
                <div>0.1 dDAO</div>
                <div>0.01 cDAO</div>
                <div>0.001 mDAO</div>
              </div>
            </div>

          </motion.div>

        </div>

      </section>


      {/* ================= TOKEN FLOW ================= */}
      <section className="relative z-10 py-32 px-6 max-w-6xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold text-center mb-20">
            Ecosystem Token Flow
          </h2>

        </motion.div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 overflow-x-auto">

          <div className="min-w-[700px] flex items-center justify-between text-center gap-10">

            <div>
              <h3 className="text-cyan-400 text-2xl font-bold">
                Membership
              </h3>
              <p className="text-gray-400 mt-3">
                Ecosystem Access
              </p>
            </div>

            <div className="text-4xl text-gray-500">→</div>

            <div>
              <h3 className="text-purple-400 text-2xl font-bold">
                Reputation
              </h3>
              <p className="text-gray-400 mt-3">
                Trust & Contribution
              </p>
            </div>

            <div className="text-4xl text-gray-500">→</div>

            <div>
              <h3 className="text-cyan-400 text-2xl font-bold">
                HIVE
              </h3>
              <p className="text-gray-400 mt-3">
                Utility & Rewards
              </p>
            </div>

            <div className="text-4xl text-gray-500">→</div>

            <div>
              <h3 className="text-pink-400 text-2xl font-bold">
                Daocrat
              </h3>
              <p className="text-gray-400 mt-3">
                Governance & Influence
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= TOKEN DENOMINATION ================= */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold text-center mb-20">
            Token Denomination Framework
          </h2>

        </motion.div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">

          <table className="w-full text-left min-w-[700px]">

            <thead className="border-b border-white/10">

              <tr>
                <th className="p-6 text-cyan-400">Token</th>
                <th className="p-6 text-cyan-400">Category</th>
                <th className="p-6 text-cyan-400">Primary Role</th>
                <th className="p-6 text-cyan-400">Ecosystem Function</th>
              </tr>

            </thead>

            <tbody className="text-gray-300">

              <tr className="border-b border-white/10">
                <td className="p-6 font-semibold">SET</td>
                <td className="p-6">Stable Coin</td>
                <td className="p-6">Stability</td>
                <td className="p-6">Payments & Ecosystem Transactions</td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="p-6 font-semibold">HIVE</td>
                <td className="p-6">Utility Token</td>
                <td className="p-6">Participation</td>
                <td className="p-6">Rewards, Utility & Ecosystem Activation</td>
              </tr>

              <tr>
                <td className="p-6 font-semibold">Daocrat</td>
                <td className="p-6">Governance Token</td>
                <td className="p-6">Governance</td>
                <td className="p-6">Voting, Proposals & Ecosystem Direction</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

      {/* ================= PRESALE ================= */}
      <section className="relative z-10 py-32 px-6 max-w-5xl mx-auto">

        <motion.div
          {...fadeUp}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
        >

          <h2 className="text-4xl font-bold mb-10 text-center">
            SET Presale Participation
          </h2>

          <div className="grid md:grid-cols-2 gap-10 mb-10">

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="rounded-2xl bg-black/30 border border-white/10 p-5">

              <p className="text-gray-400 text-sm">
                Total ETH Raised
              </p>

              <p className="text-2xl font-bold mt-2">
                {summary
                  ? `${Number(summary[1]) / 1e18} ETH`
                  : "Loading..."}
              </p>

            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-5">

              <p className="text-gray-400 text-sm">
                Participants
              </p>

              <p className="text-2xl font-bold mt-2">
                {summary
                  ? Number(summary[3])
                  : "Loading..."}
              </p>

            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-5">

              <p className="text-gray-400 text-sm">
                Remaining SET
              </p>

              <p className="text-2xl font-bold mt-2">
                {remaining
                  ? (Number(remaining) / 1e18).toLocaleString()
                  : "Loading..."}
              </p>

            </div>

          </div>          

            <div>
              <p className="text-gray-400">Token Price</p>
              <p className="text-2xl font-semibold">
                {phase
                  ? `1 ETH = ${phase.rate.toString()} SET`
                  : "Loading..."}
              </p>             
            </div>

            <div>
              <p className="text-gray-400">Presale Phase</p>

              <p className="text-2xl font-semibold">

                {phase
                  ? phase.name
                  : "Loading..."}

              </p>

              {phase && (

                <span
                  className={`inline-block mt-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    phase.active
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {phase.active ? "ACTIVE" : "INACTIVE"}
                </span>

              )}
            </div>

            <div>
              <p className="text-gray-400">Accepted Currency</p>
              <p className="text-2xl font-semibold">
                ETH
              </p>
            </div>

            <div>
              <p className="text-gray-400">Your SET Balance</p>
              <p className="text-2xl font-semibold">
                {tokenBalance
                  ? (Number(tokenBalance) / 1e18).toLocaleString()
                  : "0"}{" "}
                SET
              </p>              
            </div>

          </div>

          {!isConnected ? (

            <p className="text-center text-red-400">
              Connect your wallet to participate.
            </p>

          ) : (

            <div className="space-y-6">

              {participant && (

                <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5 mb-6">

                  <p className="text-cyan-400 font-semibold">

                    {participant[0]
                      ? "You have already participated in this presale."
                      : "This wallet has not participated yet."}

                  </p>

                  <p className="text-gray-300 mt-2">

                    ETH Spent:{" "}
                    {Number(participant[1]) / 1e18}

                  </p>

                </div>

              )}              

              <input
                type="number"
                placeholder="Enter ETH amount"
                value={ethAmount}
                onChange={(e) =>
                  setEthAmount(e.target.value)
                }
                className="w-full bg-black border border-gray-700 rounded-xl px-6 py-4"
              />

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5">

                <div className="flex justify-between">

                  <span className="text-gray-400">
                    Estimated SET
                  </span>

                  <span className="font-bold text-cyan-400">

                    {estimatedSET.toLocaleString()}

                  </span>

                </div>

                <div className="mt-3 flex justify-between text-sm">

                  <span className="text-gray-400">

                    Minimum:
                    {" "}
                    {minimumETH} ETH

                  </span>

                  <span className="text-gray-400">

                    Maximum:
                    {" "}
                    {maximumETH} ETH

                  </span>

                </div>

              </div>

              <button
                onClick={buyTokens}
                disabled={
                  txLoading ||
                  !ethAmount ||
                  Number(ethAmount) < minimumETH ||
                  Number(ethAmount) > maximumETH
                }
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {txLoading
                  ? "Processing..."
                  : "Buy SET Tokens"}
              </button>

              {ethAmount &&
                (Number(ethAmount) < minimumETH ||
                  Number(ethAmount) > maximumETH) && (

                <p className="text-red-400 text-center">

                  Purchase amount must be between{" "}
                  {minimumETH} ETH and {maximumETH} ETH.

                </p>

              )}              

              {isSuccess && (
                <p className="text-green-400 text-center">
                  Purchase successful!
                </p>
              )}

            </div>

          )}

        </motion.div>

      </section>

      {/* ================= TRANSPARENCY ================= */}
      <section className="relative z-10 py-32 text-center px-6 max-w-4xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold mb-8">
            Transparent & Secure
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            Smart contracts govern ecosystem participation,
            token distribution, and future decentralized
            governance mechanisms — ensuring transparency,
            fairness, and long-term ecosystem integrity.
          </p>

        </motion.div>

      </section>

    </main>
  );
}