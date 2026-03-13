"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";

import { CONTRACTS } from "@/src/lib/contracts";

export default function PrimaryVault() {
  const { address, isConnected } = useAccount();

  const [memberAddress, setMemberAddress] = useState("");
  const [reputation, setReputation] = useState<number | null>(null);
  const [loadingRep, setLoadingRep] = useState(false);

  const { writeContract } = useWriteContract();

  // Check NFT balance
  const { data: balance, isLoading } = useReadContract({
    address: CONTRACTS.MembershipNFT.address as `0x${string}`,
    abi: CONTRACTS.MembershipNFT.abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const ownsMembership = Boolean(balance && Number(balance) > 0);

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

  // Get shared members
  const { data: sharedMembers } = useReadContract({
    address: CONTRACTS.MembershipNFT.address as `0x${string}`,
    abi: CONTRACTS.MembershipNFT.abi,
    functionName: "getSharedMembers",
    args: [0],
    query: {
      enabled: ownsMembership,
    },
  });

  const addMember = async () => {
    if (!memberAddress) return;

    writeContract({
      address: CONTRACTS.MembershipNFT.address as `0x${string}`,
      abi: CONTRACTS.MembershipNFT.abi,
      functionName: "addSharedMember",
      args: [0, memberAddress],
    });

    setMemberAddress("");
  };

  const removeMember = async (wallet: string) => {
    writeContract({
      address: CONTRACTS.MembershipNFT.address as `0x${string}`,
      abi: CONTRACTS.MembershipNFT.abi,
      functionName: "removeSharedMember",
      args: [0, wallet],
    });
  };

  return (
    <main className="min-h-screen section max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">
        Primary Membership Vault
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
            Membership NFT
          </h3>

          {isLoading ? (
            <p className="text-gray-400">
              Checking blockchain...
            </p>
          ) : ownsMembership ? (
            <>
              <p className="text-green-400">
                Ownership Status: Primary Member ✅
              </p>

              <p className="text-gray-400">
                NFT Balance: {Number(balance)}
              </p>
            </>
          ) : (
            <p className="text-red-400">
              No Membership NFT Found
            </p>
          )}
        </div>

        {/* Reputation */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">
            Reputation Score
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
            {ownsMembership
              ? "Full access granted via on-chain Membership NFT."
              : "Access locked. Mint or receive a Membership NFT to unlock ecosystem utilities."}
          </p>
        </div>

        {/* Shared Members Manager */}
        {ownsMembership && (
          <div className="glass-card p-6 md:col-span-2">

            <h3 className="text-lg font-semibold mb-4">
              Shared Membership
            </h3>

            <div className="flex gap-4 mb-6">

              <input
                type="text"
                placeholder="Wallet address"
                value={memberAddress}
                onChange={(e) => setMemberAddress(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded px-4 py-2"
              />

              <button
                onClick={addMember}
                className="btn-primary"
              >
                Add Member
              </button>

            </div>

            <div className="space-y-3">

              {sharedMembers &&
              (sharedMembers as string[]).length > 0 ? (
                (sharedMembers as string[]).map((wallet) => (
                  <div
                    key={wallet}
                    className="flex justify-between items-center bg-black/40 p-3 rounded"
                  >

                    <span className="text-gray-300">
                      {wallet}
                    </span>

                    <button
                      onClick={() => removeMember(wallet)}
                      className="text-red-400"
                    >
                      Remove
                    </button>

                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No shared members yet.
                </p>
              )}

            </div>

          </div>
        )}

      </div>
    </main>
  );
}
