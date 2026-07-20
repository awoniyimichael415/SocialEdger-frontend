"use client";

import { useEffect, useMemo, useState } from "react";

import MembershipSummary from "./components/MembershipSummary";
import MintedNFTs from "./components/MintedNFTs";
import NFTDetails from "./components/NFTDetails";
import MembershipActions from "./components/MembershipActions";
import MembershipAnalytics from "./components/MembershipAnalytics";
import MintQueue from "./components/MintQueue";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function MembershipPage() {

  const [nfts, setNfts] =
    useState<any[]>([]);

  const [selectedNFT, setSelectedNFT] =
    useState<any>(null);

  const [mintQueue, setMintQueue] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {

    try {

      setLoading(true);

      const [

        nftRes,

        queueRes,

      ] = await Promise.all([

        fetch(
          `${API}/api/membership/admin/nfts`
        ),

        fetch(
          `${API}/api/membership/admin/queue`
        ),

      ]);

      if (nftRes.ok) {

        const nftData =
          await nftRes.json();

        setNfts(nftData);

      }

      if (queueRes.ok) {

        const queueData =
          await queueRes.json();

        setMintQueue(queueData);

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

  const analytics =
    useMemo(() => {

      const totalSupply = 20000;

      const mintedNFTs =
        nfts.length;

      const availableNFTs =
        totalSupply -
        mintedNFTs;

      const primaryMembers =
        nfts.filter(

          (n) =>

            n.membershipType ===
            "Primary"

        ).length;

      const secondaryMembers =
        nfts.reduce(

          (

            total,

            nft

          ) =>

            total +

            (

              nft.sharedMembers
                ?.length || 0

            ),

          0

        );

      const sharedMemberships =
        nfts.filter(

          (n) =>

            n.sharedMembers
              ?.length > 0

        ).length;

      const mintProgress =

        Math.round(

          (

            mintedNFTs /

            totalSupply

          ) * 100

        );

      return {

        totalSupply,

        mintedNFTs,

        availableNFTs,

        primaryMembers,

        secondaryMembers,

        sharedMemberships,

        mintProgress,

      };

    }, [nfts]);

  if (loading) {

    return (

      <main className="max-w-7xl mx-auto p-8">

        Loading Membership NFTs...

      </main>

    );

  }

  return (

    <main className="max-w-7xl mx-auto p-8">

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          Membership NFT Management

        </h1>

        <p className="text-gray-400 mt-3">

          Manage NFT memberships, shared memberships, mint queue and blockchain operations.

        </p>

      </div>

      <MembershipSummary

        totalSupply={
          analytics.totalSupply
        }

        mintedNFTs={
          analytics.mintedNFTs
        }

        availableNFTs={
          analytics.availableNFTs
        }

        primaryMembers={
          analytics.primaryMembers
        }

        secondaryMembers={
          analytics.secondaryMembers
        }

        sharedMemberships={
          analytics.sharedMemberships
        }

      />

      <MintedNFTs

        nfts={nfts}

        onSelect={
          setSelectedNFT
        }

      />

      <NFTDetails

        nft={selectedNFT}

      />

      <MembershipActions

        nft={selectedNFT}

        onRefresh={loadData}

      />

      <MembershipAnalytics

        totalSupply={
          analytics.totalSupply
        }

        mintedNFTs={
          analytics.mintedNFTs
        }

        availableNFTs={
          analytics.availableNFTs
        }

        primaryMembers={
          analytics.primaryMembers
        }

        secondaryMembers={
          analytics.secondaryMembers
        }

        sharedMemberships={
          analytics.sharedMemberships
        }

        mintProgress={
          analytics.mintProgress
        }

        activeMemberships={
          analytics.mintedNFTs
        }

      />

      <MintQueue

        requests={
          mintQueue
        }

        onRefresh={
          loadData
        }

      />

    </main>

  );

}