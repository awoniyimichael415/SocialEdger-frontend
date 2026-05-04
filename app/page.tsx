"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpaceScene from "./components/SpaceScene";

type NFT = {
  name: string;
  image: string;
};

const METADATA_BASE =
  "https://ipfs.io/ipfs/bafybeifsjfe56xxwvyfcgq2h6bnnd4uhuobppn2ubzamnvjkfskvxrnyga/";

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadNFTs = async () => {
      const items: NFT[] = [];

      for (let i = 1; i <= 6; i++) {
        try {
          const res = await fetch(`${METADATA_BASE}${i}.json`);
          const meta = await res.json();

          items.push({
            name: meta.name,
            image: meta.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
          });
        } catch {}
      }

      setNfts(items);
    };

    loadNFTs();

    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ✅ FIXED easing (important)
  const floatAnimation = {
    animate: {
      y: [0, -30, 15, -20, 0],
      x: [0, 20, -15, 10, 0],
      rotate: [0, 3, -3, 2, 0],
      scale: [1, 1.03, 0.98, 1.02, 1],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const revealLeft = {
    initial: { opacity: 0, x: -250, scale: 0.95 },
    whileInView: { opacity: 1, x: 0, scale: 1 },
    transition: { duration: 1.2 },
  };

  const revealRight = {
    initial: { opacity: 0, x: 250, scale: 0.95 },
    whileInView: { opacity: 1, x: 0, scale: 1 },
    transition: { duration: 1.2 },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white cursor-none">

      <SpaceScene />

      {/* CURSOR */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mouse.x - 12,
          y: mouse.y - 12,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.9) 0%, rgba(255,0,200,0.6) 40%, transparent 70%)",
          boxShadow: "0 0 25px rgba(0,255,255,0.6)",
        }}
      />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 z-10">
        <h1 className="text-[14vw] leading-none font-extrabold">
          <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SOCIAL
          </span>
          <span className="block bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            EDGER
          </span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl text-lg">
          A futuristic reputation-powered Web3 ecosystem where identity,
          ownership, and opportunity converge.
        </p>
      </section>

      {/* STORY */}
      <section className="min-h-screen flex items-center px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
          <motion.div {...revealLeft}>
            <h2 className="text-4xl text-cyan-400 mb-6">
              A Reputation Driven Economy
            </h2>
            <p className="text-gray-300">
              SocialEdger introduces a decentralized participation economy
              where reputation becomes measurable digital capital.
            </p>
          </motion.div>

          <motion.img
            src="/parallax/ai-guide-3.png"
            className="w-full"
            {...floatAnimation}
          />
        </div>
      </section>

      {/* WHAT */}
      <section className="min-h-screen flex items-center px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
          <motion.img
            src="/parallax/ai-guide-2.png"
            className="w-full"
            {...floatAnimation}
          />

          <motion.div {...revealRight}>
            <h2 className="text-3xl text-pink-400 mb-4">
              What is SocialEdger?
            </h2>
            <p className="text-gray-300">
              A global network where contribution defines access,
              and reputation becomes currency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROADMAP (FULL FIXED) */}
      <section className="py-32 max-w-5xl mx-auto px-6">

        <h2 className="text-4xl text-center mb-20 text-cyan-400">
          Roadmap
        </h2>

        <div className="relative border-l border-white/10 pl-10 space-y-20">

          {[
            {
              phase: "Phase 1",
              title: "Foundation",
              desc: "Launch NFT membership, core reputation system, and onboarding flow.",
            },
            {
              phase: "Phase 2",
              title: "Mining Economy",
              desc: "Introduce token mining, contribution rewards, and multiplier system.",
            },
            {
              phase: "Phase 3",
              title: "DAO Governance",
              desc: "Enable governance participation and decentralized decision-making.",
            },
            {
              phase: "Phase 4",
              title: "Global Expansion",
              desc: "Scale platform globally and integrate cross-community ecosystems.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -left-14 top-2 w-6 h-6 bg-cyan-400 rounded-full shadow-lg" />

              <h3 className="text-cyan-400">{item.phase}</h3>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}

        </div>

      </section>

      {/* NFT */}
      <section className="py-32 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl text-center mb-16 text-pink-400">
          Featured Membership NFTs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {nfts.map((nft, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-4 bg-white/5 border border-white/10 rounded-2xl"
            >
              <img
                src={nft.image}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h3>{nft.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ECOSYSTEM ================= */}
      <section className="py-32 max-w-6xl mx-auto z-10 px-6">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl text-center mb-16 text-purple-400"
        >
          Ecosystem
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            "Reputation Engine",
            "Contributor Network",
            "Token Economy"
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="p-8 text-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl"
            >
              <h3 className="text-xl text-cyan-300">{item}</h3>
            </motion.div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 text-center z-10 px-6">

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="text-4xl mb-6 text-pink-400">
            Join SocialEdger
          </h2>

          <Link href="/gallery">
            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:scale-110 transition">
              Get Started
            </button>
          </Link>
        </motion.div>

      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center border-t border-white/10 text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} SocialEdger. All rights reserved.
      </footer>

    </main>
  );
}
