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

  // 🎯 CUSTOM CURSOR STATE
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

    // 🎯 CURSOR TRACK
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 🎬 FLOATING ANIMATION
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
      ease: "easeInOut",
    },
  };

  // 🎯 STRONG REVEAL
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

      {/* 🔥 CUSTOM CURSOR */}
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

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center z-10 px-6">

        <h1 className="text-[14vw] leading-none font-extrabold tracking-tight">
          <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            SOCIAL
          </span>
          <span className="block bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
            EDGER
          </span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl text-lg">
          A futuristic reputation-powered Web3 ecosystem where identity,
          ownership, and opportunity converge.
        </p>

      </section>

      {/* ================= STORY ================= */}
      <section className="min-h-screen flex items-center px-6 max-w-6xl mx-auto z-10">

        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          <motion.div {...revealLeft}>
            <h2 className="text-4xl font-bold mb-6 text-cyan-400">
              A Reputation Driven Economy
            </h2>
            <p className="text-gray-300">
              SocialEdger introduces a decentralized participation economy
              where reputation becomes measurable digital capital.
            </p>
          </motion.div>

          <div className="relative h-[420px] rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 overflow-hidden">

            <motion.img
              src="/parallax/ai-guide-3.png"
              className="absolute bottom-0 right-0 w-[115%]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              {...floatAnimation}
            />

          </div>

        </div>
      </section>

      {/* ================= WHAT ================= */}
      <section className="min-h-screen flex items-center px-6 max-w-6xl mx-auto z-10">

        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          <div className="relative h-[420px] rounded-3xl bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border border-white/10 overflow-hidden">

            <motion.img
              src="/parallax/ai-guide-2.png"
              className="absolute bottom-0 left-0 w-[130%]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              {...floatAnimation}
            />

          </div>

          <motion.div
            {...revealRight}
            className="p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl"
          >
            <h2 className="text-3xl font-semibold mb-4 text-pink-400">
              What is SocialEdger?
            </h2>

            <p className="text-gray-300">
              A global network where contribution defines access,
              and reputation becomes currency.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto z-10">

        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl text-center mb-16 text-purple-400">
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
              <motion.div
                key={item}
                whileHover={{ y: -10 }}
                className="
                  p-[1px] rounded-2xl
                  bg-gradient-to-br from-white/20 to-white/5
                "
              >
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <h3 className="text-xl text-cyan-300">{item}</h3>
                </div>
              </motion.div>
            ))}

          </div>
        </motion.div>

      </section>

      {/* ================= NFT (GLASS FIXED) ================= */}
      <section className="py-32 max-w-6xl mx-auto z-10 px-6">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl text-center mb-16 text-pink-400"
        >
          Featured Membership NFTs
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {nfts.map((nft, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="p-[1px] rounded-3xl bg-gradient-to-br from-white/20 to-white/5"
            >

              <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10">

                <div className="overflow-hidden rounded-xl mb-4">
                  <motion.img
                    src={nft.image}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>

                <h3 className="text-white">{nft.name}</h3>

              </div>

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