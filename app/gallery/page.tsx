"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { formatEther } from "viem";

import { CONTRACTS as ADDRESS } from "@/src/contracts/config";
import { CONTRACTS as CONTRACT_DATA } from "@/src/lib/contracts";

type NFT = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const METADATA_BASE =
  "https://ipfs.io/ipfs/bafybeifsjfe56xxwvyfcgq2h6bnnd4uhuobppn2ubzamnvjkfskvxrnyga/";

const NFTs_PER_PAGE = 30;

export default function GalleryPage() {
  const { address, isConnected } = useAccount();

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [mintingId, setMintingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { writeContract, data: hash, error } = useWriteContract();
  const { isLoading: txLoading, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  const { data: mintPrice } = useReadContract({
    address: ADDRESS.MembershipNFT as `0x${string}`,
    abi: CONTRACT_DATA.MembershipNFT.abi,
    functionName: "mintPrice",
  });

  const mintPriceEth = mintPrice
    ? formatEther(mintPrice as bigint)
    : null;

  // Load NFT metadata
  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const items: NFT[] = [];

        for (let i = 1; i <= 66; i++) {
          const res = await fetch(`${METADATA_BASE}${i}.json`);
          if (!res.ok) continue;

          const meta = await res.json();

          items.push({
            id: i - 1,
            name: meta.name,
            description: meta.description,
            image: meta.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            ),
          });
        }

        setNfts(items);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load NFTs.");
      } finally {
        setLoading(false);
      }
    };

    loadNFTs();
  }, []);

  const totalPages = Math.ceil(nfts.length / NFTs_PER_PAGE);
  const startIndex = (currentPage - 1) * NFTs_PER_PAGE;
  const currentNFTs = nfts.slice(
    startIndex,
    startIndex + NFTs_PER_PAGE
  );

  const mintNFT = async (tokenId: number) => {
    if (!isConnected || !address) {
      setMessage("Connect wallet first.");
      return;
    }

    if (!mintPrice) {
      setMessage("Unable to read mint price.");
      return;
    }

    try {
      setMessage("");
      setMintingId(tokenId);

      writeContract({
        address: ADDRESS.MembershipNFT as `0x${string}`,
        abi: CONTRACT_DATA.MembershipNFT.abi,
        functionName: "publicMint",
        args: [tokenId],
        value: BigInt(mintPrice),
      });
    } catch (err: any) {
      console.error(err);
      setMessage(err?.shortMessage || "Mint failed.");
      setMintingId(null);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage("🎉 Mint successful!");
      setMintingId(null);
    }
  }, [isSuccess]);

  return (
    <main className="min-h-screen section max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">
        SocialEdger NFT Gallery
      </h1>

      {message && (
        <div className="mb-6 text-yellow-400">{message}</div>
      )}

      {loading ? (
        <p>Loading NFTs...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-8">
            {currentNFTs.map((nft) => (
              <div key={nft.id} className="glass-card p-5">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />

                <h3 className="text-xl font-semibold">
                  {nft.name}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {nft.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400 font-bold">
                    {mintPriceEth
                      ? `${mintPriceEth} ETH`
                      : "Loading price..."}
                  </span>
                </div>

                <button
                  onClick={() => mintNFT(nft.id)}
                  disabled={!isConnected || txLoading}
                  className="btn-primary w-full"
                >
                  {mintingId === nft.id && txLoading
                    ? "Minting..."
                    : "Mint NFT"}
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentPage === 1}
              className="btn-outline"
            >
              Previous
            </button>

            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="btn-outline"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}