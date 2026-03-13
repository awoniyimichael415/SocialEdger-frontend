"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACTS } from "@/src/lib/contracts";

export default function SecondaryVault() {

  const { address, isConnected } = useAccount();

  const [reputation, setReputation] = useState<number | null>(null);
  const [loadingRep, setLoadingRep] = useState(false);

  // Check if wallet is a secondary member
  const { data: isSecondary, isLoading } = useReadContract({
    address: CONTRACTS.MembershipNFT.address as `0x${string}`,
    abi: CONTRACTS.MembershipNFT.abi,
    functionName: "isSecondary",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get tokenId membership belongs to
  const { data: tokenId } = useReadContract({
    address: CONTRACTS.MembershipNFT.address as `0x${string}`,
    abi: CONTRACTS.MembershipNFT.abi,
    functionName: "memberOfToken",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const hasAccess = Boolean(isSecondary);

  // Fetch reputation from backend
  useEffect(() => {

    if (!address) return;

    const fetchReputation = async () => {

      try {

        setLoadingRep(true);

        const res = await fetch(
          `https://socialedger-backend.onrender.com/api/reputation/${address}`
        );

        const data = await res.json();

        setReputation(data.reputation);

      } catch (error) {

        console.error("Failed to fetch reputation:", error);

      } finally {

        setLoadingRep(false);

      }

    };

    fetchReputation();

  }, [address]);

  return (

    <main className="min-h-screen section max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">
        Secondary Membership Vault
      </h1>

      {!isConnected && (
        <div className="glass-card p-6 mb-6">
          <p className="text-red-400">
            Please connect your wallet from the dashboard first.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Membership Status */}
        <div className="glass-card p-6">

          <h3 className="text-lg font-semibold mb-2">
            Shared Membership Status
          </h3>

          {isLoading ? (

            <p className="text-gray-400">
              Checking blockchain...
            </p>

          ) : hasAccess ? (

            <>

              <p className="text-green-400">
                Shared Member Access Granted ✅
              </p>

              <p className="text-gray-400 mt-2">
                Membership NFT ID: {tokenId?.toString()}
              </p>

            </>

          ) : (

            <p className="text-red-400">
              No Shared Membership Found
            </p>

          )}

        </div>

        {/* Reputation */}
        <div className="glass-card p-6">

          <h3 className="text-lg font-semibold mb-2">
            Participation Reputation
          </h3>

          {loadingRep ? (

            <p className="text-gray-400">
              Calculating reputation...
            </p>

          ) : (

            <p className="text-3xl font-bold text-purple-400">
              {reputation ?? 0}
            </p>

          )}

        </div>

        {/* Ecosystem */}
        <div className="glass-card p-6 md:col-span-2">

          <h3 className="text-lg font-semibold mb-2">
            Ecosystem Access
          </h3>

          <p className="text-gray-400">
            {hasAccess
              ? "Access granted via shared membership assigned by the primary NFT owner."
              : "Access locked. A primary member must assign you to their membership NFT."}
          </p>

        </div>

      </div>

    </main>

  );
}
