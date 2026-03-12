"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Web3Background from "./components/Web3Background";

type NFT = {
  name: string;
  image: string;
};

const METADATA_BASE =
  "https://ipfs.io/ipfs/bafybeifsjfe56xxwvyfcgq2h6bnnd4uhuobppn2ubzamnvjkfskvxrnyga/";

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const loadNFTs = async () => {
      const items: NFT[] = [];

      for (let i = 1; i <= 6; i++) {
        try {
          const res = await fetch(`${METADATA_BASE}${i}.json`);
          const meta = await res.json();

          items.push({
            name: meta.name,
            image: meta.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            ),
          });
        } catch {}
      }

      setNfts(items);
    };

    loadNFTs();
  }, []);

  return (
    <main className="relative min-h-screen px-6 md:px-16 lg:px-24 overflow-hidden">

      {/* REAL 3D WEBGL BACKGROUND */}
      <Web3Background />

      {/* Glow overlay effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">

        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse top-20 left-20"></div>

        <div className="absolute w-[400px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full animate-pulse bottom-20 right-20"></div>

      </div>

      {/* HERO SECTION */}
      <section className="relative py-24 text-center md:text-left max-w-6xl mx-auto">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">
          Where Reputation <br className="hidden sm:block"/> Meets Opportunity
        </h1>

        <p className="mt-6 text-[24px] text-gray-300 max-w-2xl mx-auto md:mx-0">
          SocialEdger is a Web3 ecosystem where contributors, members,
          and communities grow through verified reputation,
          NFT-powered memberships, and inclusive participation.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

          <Link href="/membership">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition">
              Explore Membership
            </button>
          </Link>

          <Link href="/presale">
            <button className="px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition">
              Join Presale
            </button>
          </Link>

        </div>

      </section>

      {/* WHAT IS SOCIALEDGER */}
      <section className="py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div className="rounded-3xl bg-white/5 backdrop-blur-lg p-8 border border-white/10">

          <h2 className="text-3xl font-semibold mb-4">
            What is SocialEdger?
          </h2>

          <p className="text-gray-300">
            SocialEdger connects diverse participants into a reputation-driven
            digital network. Our Proof of Reputation model replaces traditional
            gatekeeping, ensuring opportunity is earned through participation
            and contribution.
          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 h-72 md:h-96"></div>

      </section>

      {/* FEATURES */}
      <section className="py-24 max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Platform Foundations
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            "NFT-Based Membership",
            "Shared Membership System",
            "Proof of Reputation",
            "Token Presale",
            "Contributor Portfolios",
            "Dual Membership Vaults"
          ].map((item) => (

            <div
              key={item}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold">
                {item}
              </h3>
            </div>

          ))}

        </div>

      </section>

      {/* NFT PREVIEW SECTION */}
      <section className="py-24 max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Featured Membership NFTs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {nfts.map((nft, i) => (

            <div
              key={i}
              className="glass-card p-4 hover:scale-105 transition"
            >

              <img
                src={nft.image}
                alt={nft.name}
                className="rounded-xl mb-4 w-full h-64 object-cover"
              />

              <h3 className="text-lg font-semibold">
                {nft.name}
              </h3>

            </div>

          ))}

        </div>

        <div className="text-center mt-12">

          <Link href="/gallery">

            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition">

              See Full Gallery

            </button>

          </Link>

        </div>

      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 text-center max-w-4xl mx-auto">

        <h2 className="text-3xl font-semibold mb-6">
          Join the SocialEdger Ecosystem
        </h2>

        <p className="text-gray-400 mb-10">
          Participate, contribute, and grow your digital reputation from day one.
        </p>

        <Link href="/membership">

          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition">

            Get Started

          </button>

        </Link>

      </section>

    </main>
  );
}