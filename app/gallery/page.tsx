"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { formatEther } from "viem";
import { motion } from "framer-motion";

import { CONTRACTS as ADDRESS } from "@/src/contracts/config";
import { CONTRACTS as CONTRACT_DATA } from "@/src/lib/contracts";

import INFTOAgreementModal from "@/app/components/INFTOAgreementModal";

type NFT = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const METADATA_BASE =
  "https://ipfs.io/ipfs/bafybeifsjfe56xxwvyfcgq2h6bnnd4uhuobppn2ubzamnvjkfskvxrnyga/";

const NFTs_PER_PAGE = 30;

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function GalleryPage() {
  const { address, isConnected } = useAccount();

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [mintingId, setMintingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAgreement, setShowAgreement] = useState(false);
  const [pendingMintToken, setPendingMintToken] =
    useState<number | null>(null);

  const { writeContract, data: hash } = useWriteContract();
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

  const executeMint = async (tokenId: number) => {
    if (!mintPrice) return;

    try {
      setMessage("");
      setMintingId(tokenId);

      writeContract({
        address: ADDRESS.MembershipNFT as `0x${string}`,
        abi: CONTRACT_DATA.MembershipNFT.abi,
        functionName: "publicMint",
        args: [tokenId],
        value: BigInt(mintPrice as bigint),
      });
    } catch (err: any) {
      console.error(err);
      setMessage(err?.shortMessage || "Mint failed.");
      setMintingId(null);
    }
  };

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
      const res = await fetch(
        `${API}/api/agreement/check/${address}`
      );

      const data = await res.json();

      if (!data.exists) {
        setPendingMintToken(tokenId);
        setShowAgreement(true);
        return;
      }

      executeMint(tokenId);
    } catch (err) {
      console.error(err);
      setMessage("Agreement check failed.");
    }
  };

  const handleAgreementAccepted = () => {
    setShowAgreement(false);

    if (pendingMintToken !== null) {
      executeMint(pendingMintToken);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage("🎉 Mint successful!");
      setMintingId(null);
    }
  }, [isSuccess]);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white px-6 py-20">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        NFT Gallery
      </motion.h1>

      {message && (
        <div className="mb-6 text-center text-yellow-400">
          {message}
        </div>
      )}

      {showAgreement && (
        <INFTOAgreementModal
          onAccepted={handleAgreementAccepted}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-400">
          Loading NFTs...
        </p>
      ) : (
        <>
          {/* GRID */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

            {currentNFTs.map((nft, i) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="
                  relative p-[1px] rounded-3xl
                  bg-gradient-to-br from-white/20 to-white/5
                "
              >

                {/* GLASS CARD */}
                <div className="
                  rounded-3xl p-5 h-full
                  bg-white/5 backdrop-blur-2xl
                  border border-white/10
                  shadow-[0_0_25px_rgba(0,255,255,0.08)]
                  hover:shadow-[0_0_40px_rgba(255,0,200,0.15)]
                  transition
                ">

                  {/* IMAGE */}
                  <div className="overflow-hidden rounded-xl mb-4">
                    <motion.img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* TEXT */}
                  <h3 className="text-lg font-semibold mb-1">
                    {nft.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {nft.description}
                  </p>

                  {/* PRICE */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyan-400 font-bold">
                      {mintPriceEth
                        ? `${mintPriceEth} ETH`
                        : "Loading..."}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => mintNFT(nft.id)}
                    disabled={!isConnected || txLoading}
                    className="
                      w-full py-2 rounded-full
                      bg-gradient-to-r from-cyan-500 to-pink-500
                      hover:scale-105 transition
                      shadow-lg shadow-cyan-500/20
                    "
                  >
                    {mintingId === nft.id && txLoading
                      ? "Minting..."
                      : "Mint NFT"}
                  </button>

                </div>
              </motion.div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-6 mt-16">

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition"
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
              className="px-6 py-2 border border-white/20 rounded-full hover:bg-white/10 transition"
            >
              Next
            </button>

          </div>
        </>
      )}
    </main>
  );
}