"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Web3Background from "./components/Web3Background";
import CharacterParallax from "./components/CharacterParallax";
import HeroCharacter from "./components/HeroCharacter";

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

  const fade = {
    hidden: { opacity: 0, y: 180 },
    show: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  return (
    <main className="relative min-h-screen px-6 md:px-16 lg:px-24 overflow-hidden">
      
      <Web3Background />
      <CharacterParallax />

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">

        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse top-20 left-20"></div>

        <div className="absolute w-[400px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full animate-pulse bottom-20 right-20"></div>

      </div>

      {/* HERO */}
      <section className="relative py-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >

          <h1 className="text-5xl lg:text-6xl leading-tight">
            Where Reputation <br /> Meets Opportunity
          </h1>

          <p className="mt-6 text-[22px] text-gray-300 max-w-xl">
            SocialEdger is a Web3 ecosystem where contributors,
            communities and innovators grow through verified
            reputation, NFT memberships and decentralized
            participation.
          </p>

          <div className="mt-10 flex gap-6 flex-wrap">

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

        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
        >
          <HeroCharacter />
        </motion.div>

      </section>

      {/* STORY */}
      <motion.section
        data-character="1"
        className="relative z-10 py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
        variants={fade}
        initial="hidden"
        whileInView="show"
      >

        <div className="rounded-3xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 h-80 border border-white/10"></div>

        <div>

          <h2 className="text-4xl font-semibold mb-6">
            A Reputation Driven Economy
          </h2>

          <p className="text-gray-300 leading-relaxed">
            SocialEdger introduces a decentralized participation
            economy where reputation becomes measurable digital
            capital. Through Proof-of-Reputation, individuals earn
            opportunity based on real contributions.
          </p>

        </div>

      </motion.section>

      {/* WHAT IS SOCIALEDGER */}
      <motion.section
        data-character="2"
        className="relative z-10 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        variants={fade}
        initial="hidden"
        whileInView="show"
      >

        <div className="rounded-3xl bg-white/5 backdrop-blur-lg p-8 border border-white/10">

          <h2 className="text-3xl font-semibold mb-4">
            What is SocialEdger?
          </h2>

          <p className="text-gray-300">
            SocialEdger connects global participants into a
            reputation-driven digital network. Opportunity
            is earned through participation and contribution.
          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 h-72 md:h-96"></div>

      </motion.section>

      {/* PLATFORM FOUNDATIONS */}
      <motion.section
        data-character="3"
        className="relative z-10 py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-16"
        variants={fade}
        initial="hidden"
        whileInView="show"
      >

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

      </motion.section>

      {/* NFT MEMBERSHIP */}
      <motion.section
        className="py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-16"
        variants={fade}
        initial="hidden"
        whileInView="show"
      >

        <div>

          <h2 className="text-4xl font-semibold mb-6">
            NFT Powered Membership
          </h2>

          <p className="text-gray-300 mb-6">
            Membership NFTs unlock powerful advantages inside
            the SocialEdger ecosystem including accelerated
            mining rewards and governance participation.
          </p>

          <ul className="space-y-3 text-gray-400">
            <li>✔ 5× Token Mining Power</li>
            <li>✔ Shared Membership System</li>
            <li>✔ Reputation Acceleration</li>
            <li>✔ Governance Access</li>
          </ul>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-pink-600/30 to-purple-600/30 h-96 border border-white/10"></div>

      </motion.section>

      {/* NFT PREVIEW */}
      <motion.section
        className="py-24 max-w-6xl mx-auto"
        variants={fade}
        initial="hidden"
        whileInView="show"
      >

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

      </motion.section>

      {/* ROADMAP */}
      <motion.section
        className="py-32 max-w-6xl mx-auto"
        variants={fade}
        initial="hidden"
        whileInView="show"
      >

        <h2 className="text-4xl text-center mb-24">
          SocialEdger Roadmap
        </h2>

        <div className="relative">

          {/* CENTER LINE */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[8px] bg-purple-500/40 h-full"></div>

          <div className="space-y-32">

            {[
              {
                phase:"Phase 1",
                title:"Foundation",
                desc:"Launch NFT membership and reputation system"
              },
              {
                phase:"Phase 2",
                title:"Mining Economy",
                desc:"Deploy token mining system with 5× multiplier"
              },
              {
                phase:"Phase 3",
                title:"Ecosystem Expansion",
                desc:"Contributor network and DAO governance"
              },
              {
                phase:"Phase 4",
                title:"Global Network",
                desc:"Open participation platform globally"
              }
            ].map((item,i)=>(
              <div
                key={i}
                className={`flex items-center w-full ${
                  i % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >

                {i % 2 === 1 && (
                  <div className="w-1/2 pr-12 text-right">
                    <div className="glass-card p-6">
                      <h3 className="text-purple-400">{item.phase}</h3>
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                )}

                <div className="relative z-10 w-8 h-8 bg-purple-600 rounded-full border-4 border-black"></div>

                {i % 2 === 0 && (
                  <div className="w-1/2 pl-12">
                    <div className="glass-card p-6">
                      <h3 className="text-purple-400">{item.phase}</h3>
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

      </motion.section>

      {/* ECOSYSTEM */}
      <motion.section
        className="py-32 max-w-6xl mx-auto"
        variants={fade}
        initial="hidden"
        whileInView="show"
      >

        <h2 className="text-4xl text-center mb-16">
          The SocialEdger Ecosystem
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            {
              title:"Reputation Engine",
              desc:"Transparent scoring measuring real participation."
            },
            {
              title:"Contributor Network",
              desc:"Global collaboration between creators."
            },
            {
              title:"Token Economy",
              desc:"Mining powered reward economy."
            }
          ].map((item,i)=>(
            <div key={i} className="glass-card p-8 text-center">
              <h3 className="text-xl mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}

        </div>

      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-24 text-center max-w-4xl mx-auto"
        variants={fade}
        initial="hidden"
        whileInView="show"
      >

        <h2 className="text-3xl font-semibold mb-6">
          Join the SocialEdger Ecosystem
        </h2>

        <p className="text-gray-400 mb-10">
          Participate, contribute and grow your digital reputation.
        </p>

        <Link href="/membership">

          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition">
            Get Started
          </button>

        </Link>

      </motion.section>

    </main>
  );
}