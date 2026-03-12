"use client";

import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";

import { CONTRACTS } from "@/src/lib/contracts";

export default function PresalePage() {

  const { address, isConnected } = useAccount();

  const [ethAmount, setEthAmount] = useState("");

  const { writeContract, data: hash } = useWriteContract();

  const { isLoading: txLoading, isSuccess } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Read SET token balance
  const { data: tokenBalance } = useReadContract({
    address: CONTRACTS.PresaleToken.address as `0x${string}`,
    abi: CONTRACTS.PresaleToken.abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const buyTokens = async () => {
    if (!ethAmount) return;

    writeContract({
      address: CONTRACTS.Presale.address as `0x${string}`,
      abi: CONTRACTS.Presale.abi,
      functionName: "buyTokens",
      value: parseEther(ethAmount),
    });
  };

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          SocialEdger Token Presale
        </h1>
        <p className="hero-sub text-gray-300 mt-6 max-w-3xl mx-auto">
          Participate in the early growth of the SocialEdger ecosystem and
          support a reputation-driven Web3 platform built for global inclusion.
        </p>
      </section>

      {/* PRESALE CARD */}
      <section className="section max-w-4xl mx-auto">

        <div className="glass-card p-10 text-center">

          <h2 className="text-2xl font-semibold mb-6">
            Presale Participation
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">

            <div>
              <p className="text-gray-400">Token Price</p>
              <p className="text-xl font-semibold">
                1 ETH = 1000 SET
              </p>
            </div>

            <div>
              <p className="text-gray-400">Accepted Currency</p>
              <p className="text-xl font-semibold">
                ETH
              </p>
            </div>

            <div>
              <p className="text-gray-400">Your SET Balance</p>
              <p className="text-xl font-semibold">
                {tokenBalance
                  ? Number(tokenBalance) / 1e18
                  : 0} SET
              </p>
            </div>

            <div>
              <p className="text-gray-400">Presale Phase</p>
              <p className="text-xl font-semibold">
                Phase 1
              </p>
            </div>

          </div>

          <div className="mt-10 space-y-4">

            {!isConnected ? (

              <p className="text-red-400">
                Connect your wallet to participate.
              </p>

            ) : (

              <>
                <input
                  type="number"
                  placeholder="Enter ETH amount"
                  value={ethAmount}
                  onChange={(e) =>
                    setEthAmount(e.target.value)
                  }
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3"
                />

                <button
                  onClick={buyTokens}
                  disabled={txLoading}
                  className="btn-primary w-full md:w-auto px-12"
                >
                  {txLoading
                    ? "Processing..."
                    : "Buy Tokens"}
                </button>

                {isSuccess && (
                  <p className="text-green-400">
                    Purchase successful!
                  </p>
                )}

              </>
            )}

          </div>

        </div>

      </section>

      {/* WHY PARTICIPATE */}
      <section className="section max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Why Participate in Presale?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            "Early Ecosystem Access",
            "Support Reputation Infrastructure",
            "Community Growth Participation",
            "Future Platform Governance",
          ].map((item) => (
            <div key={item} className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}

        </div>

      </section>

      {/* TRANSPARENCY */}
      <section className="section text-center max-w-4xl mx-auto">

        <h2 className="text-3xl font-semibold mb-6">
          Transparent & Secure
        </h2>

        <p className="text-gray-400">
          Smart contracts govern token distribution, ensuring transparency,
          fairness, and security for all participants.
        </p>

      </section>

    </main>
  );
}