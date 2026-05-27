"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpaceScene from "./components/SpaceScene";

import {
  useAccount,
  useConnect,
} from "wagmi";

import { injected } from "wagmi/connectors";

type NFT = {
  name: string;
  image: string;
};

const METADATA_BASE =
  "https://ipfs.io/ipfs/bafybeifsjfe56xxwvyfcgq2h6bnnd4uhuobppn2ubzamnvjkfskvxrnyga/";

export default function Home() {

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { isConnected } = useAccount();
  const { connect } = useConnect();

  useEffect(() => {

    const loadNFTs = async () => {

      const items: NFT[] = [];

      for (let i = 1; i <= 6; i++) {

        try {

          const res = await fetch(
            `${METADATA_BASE}${i}.json`
          );

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

    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );

  }, []);

  // CONNECT WALLET
  const handleConnectWallet = () => {

    if (typeof window === "undefined") return;

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );

    const hasMetaMask =
      typeof (window as any).ethereum !==
      "undefined";

    if (hasMetaMask) {

      connect({
        connector: injected(),
      });

      return;
    }

    if (isMobile) {

      const dappUrl =
        window.location.href.replace(
          /^https?:\/\//,
          ""
        );

      const metamaskLink =
        `https://metamask.app.link/dapp/${dappUrl}`;

      window.location.href =
        metamaskLink;

      setTimeout(() => {

        const isIOS =
          /iPhone|iPad|iPod/i.test(
            navigator.userAgent
          );

        if (isIOS) {

          window.location.href =
            "https://apps.apple.com/app/metamask/id1438144202";

        } else {

          window.location.href =
            "https://play.google.com/store/apps/details?id=io.metamask";

        }

      }, 2000);

      return;
    }

    window.location.href =
      "https://metamask.io/download/";

  };

  // FLOATING ANIMATION
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

  // REVEALS
  const revealLeft = {
    initial: {
      opacity: 0,
      x: -250,
      scale: 0.95,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    transition: {
      duration: 1.2,
    },
  };

  const revealRight = {
    initial: {
      opacity: 0,
      x: 250,
      scale: 0.95,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    transition: {
      duration: 1.2,
    },
  };

  return (

    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white cursor-none">

      <SpaceScene />

      {/* CUSTOM CURSOR */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mouse.x - 12,
          y: mouse.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.9) 0%, rgba(255,0,200,0.6) 40%, transparent 70%)",
          boxShadow:
            "0 0 25px rgba(0,255,255,0.6)",
        }}
      />

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 z-10 relative">

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.4,
          }}
          className="text-[14vw] leading-none font-extrabold"
        >

          <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SOCIAL
          </span>

          <span className="block bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            EDGER
          </span>

        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="mt-6 text-gray-300 max-w-2xl text-lg"
        >
          A futuristic reputation-powered Web3 ecosystem where identity,
          ownership, and opportunity converge.
        </motion.p>

      </section>

      {/* STORY */}
      <section className="min-h-screen flex items-center px-6 max-w-6xl mx-auto relative z-10">

        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          <motion.div {...revealLeft}>

            <h2 className="text-4xl text-cyan-400 mb-6 font-bold">
              A Reputation Driven Economy
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              SocialEdger introduces a decentralized participation economy
              where reputation becomes measurable digital capital.
            </p>

          </motion.div>

          <motion.img
            src="/parallax/ai-guide-3.png"
            className="w-full max-w-[700px] mx-auto"
            {...floatAnimation}
          />

        </div>

      </section>

      {/* WHAT */}
      <section className="min-h-screen flex items-center px-6 max-w-6xl mx-auto relative z-10">

        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          <motion.img
            src="/parallax/ai-guide-2.png"
            className="w-full max-w-[800px] mx-auto"
            {...floatAnimation}
          />

          <motion.div
            {...revealRight}
            className="
              p-10
              rounded-3xl
              backdrop-blur-2xl
              border border-white/10
              bg-white/5
              shadow-[0_0_50px_rgba(255,255,255,0.05)]
            "
          >

            <h2 className="text-3xl text-pink-400 mb-4 font-semibold">
              What is SocialEdger?
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              A global network where contribution defines access,
              and reputation becomes currency.
            </p>

          </motion.div>

        </div>

      </section>

      {/* ROADMAP */}
      <section className="py-40 relative z-10 px-6 overflow-hidden">

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-center
            text-5xl
            md:text-7xl
            font-extrabold
            mb-28
            bg-gradient-to-r
            from-cyan-300
            via-purple-400
            to-pink-500
            bg-clip-text
            text-transparent
          "
        >
          SocialEdger Roadmap Flow
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">

          {/* CENTER LINE */}
          <div
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-[8px]
              h-full
              rounded-full
              bg-gradient-to-b
              from-cyan-400
              via-purple-500
              to-pink-500
              shadow-[0_0_40px_rgba(0,255,255,0.7)]
            "
          />

          <div className="space-y-32">

            {[
              {
                phase: "PHASE 1",
                title: "FOUNDATIONAL RUDIMENTS",
                date: "May 2026 - Aug 2026",
                duration: "100 Days",
                side: "left",
                items: [
                  "Art NFTs",
                  "Investing Skills",
                  "SET Mining Protocol",
                  "PoR & KYC/KYUYM",
                  "AI & SI Agent",
                ],
              },

              {
                phase: "PHASE 2",
                title: "SOCIALEDGER & INTEROPERABILITY",
                date: "Sep 2026 - Nov 2026",
                duration: "90 Days",
                side: "right",
                items: [
                  "LMail",
                  "LPay",
                  "Hive Protocol",
                  "Interoperability Bridge",
                ],
              },

              {
                phase: "PHASE 3",
                title: "AI INTEGRATION & COMMERCIAL ECOSYSTEM",
                date: "Dec 2026 - Feb 2027",
                duration: "88 Days",
                side: "left",
                items: [
                  "SMID Synthetic Intelligence",
                  "AI dApp",
                  "Song Analysis",
                  "Real Time Social Automation",
                  "Gen SAI",
                ],
              },

              {
                phase: "PHASE 4",
                title: "METAVERSE PROTOCOL & GLOBAL LAUNCH",
                date: "Mar 2027 - May 2027",
                duration: "90 Days",
                side: "right",
                items: [
                  "Metauniverse",
                  "SI Algorithmic Profile Push",
                  "D-Cloning",
                  "AI Trading Automation",
                ],
              },
            ].map((item, i) => (

              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: item.side === "left" ? -150 : 150,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                }}
                className={`
                  relative
                  flex
                  items-center
                  ${
                    item.side === "left"
                      ? "justify-start"
                      : "justify-end"
                  }
                `}
              >

                {/* CARD */}
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -10,
                  }}
                  className="
                    relative
                    w-full
                    md:w-[44%]
                    p-[1px]
                    rounded-3xl
                    bg-gradient-to-br
                    from-cyan-400/30
                    via-purple-500/20
                    to-pink-500/30
                  "
                >

                  <div
                    className="
                      rounded-3xl
                      p-8
                      bg-[#0c0c14]/80
                      backdrop-blur-2xl
                      border border-white/10
                      shadow-[0_0_60px_rgba(0,255,255,0.08)]
                    "
                  >

                    <p className="text-cyan-400 font-bold mb-2">
                      {item.phase}
                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      {item.title}
                    </h3>

                    <p className="text-pink-300 mb-1">
                      {item.date}
                    </p>

                    <p className="text-cyan-300 mb-6">
                      {item.duration}
                    </p>

                    <div className="space-y-3">

                      {item.items.map((point) => (

                        <div
                          key={point}
                          className="
                            flex
                            items-center
                            gap-3
                            text-gray-300
                          "
                        >
                          <div
                            className="
                              w-2 h-2
                              rounded-full
                              bg-cyan-400
                              shadow-[0_0_15px_rgba(0,255,255,1)]
                            "
                          />

                          <span>{point}</span>

                        </div>

                      ))}

                    </div>

                  </div>

                </motion.div>

                {/* CENTER NODE */}
                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-8 h-8
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    to-pink-500
                    border-4
                    border-[#0a0a0f]
                    shadow-[0_0_35px_rgba(0,255,255,0.9)]
                    z-20
                  "
                />

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* NFT */}
      <section className="py-32 max-w-6xl mx-auto px-6 relative z-10">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl text-center mb-16 text-pink-400"
        >
          Featured Membership NFTs
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">

          {nfts.map((nft, i) => (

            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -12,
              }}
              transition={{
                delay: i * 0.1,
              }}
              className="
                p-[1px]
                rounded-3xl
                bg-gradient-to-br
                from-white/20
                to-white/5
              "
            >

              <div className="
                p-4
                rounded-3xl
                bg-white/5
                backdrop-blur-2xl
                border border-white/10
              ">

                <div className="overflow-hidden rounded-2xl mb-4">

                  <motion.img
                    src={nft.image}
                    className="w-full h-64 object-cover"
                    whileHover={{
                      scale: 1.08,
                    }}
                  />

                </div>

                <h3 className="text-lg font-semibold">
                  {nft.name}
                </h3>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ECOSYSTEM */}
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
            "Token Economy",
          ].map((item, i) => (

            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -10,
              }}
              className="
                p-8
                text-center
                bg-white/5
                backdrop-blur-2xl
                border border-white/10
                rounded-3xl
              "
            >

              <h3 className="text-xl text-cyan-300">
                {item}
              </h3>

            </motion.div>

          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="py-32 text-center z-10 px-6 relative">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >

          <h2 className="text-4xl mb-6 text-pink-400">
            Join SocialEdger
          </h2>

          {!isConnected ? (

            <button
              onClick={handleConnectWallet}
              className="
                px-10 py-4
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                to-pink-500
                hover:scale-110
                transition
                shadow-[0_0_40px_rgba(0,255,255,0.35)]
              "
            >
              Connect Wallet
            </button>

          ) : (

            <Link href="/gallery">

              <button
                className="
                  px-10 py-4
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-pink-500
                  hover:scale-110
                  transition
                  shadow-[0_0_40px_rgba(0,255,255,0.35)]
                "
              >
                Enter Gallery
              </button>

            </Link>

          )}

        </motion.div>

      </section>

      {/* FOOTER */}
      <footer className="
        py-10
        text-center
        border-t border-white/10
        text-gray-500
        text-sm
        z-10
        relative
      ">
        © {new Date().getFullYear()} SocialEdger.
        All rights reserved.
      </footer>

    </main>

  );
}
