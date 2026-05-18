"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SpaceScene from "../components/SpaceScene";

export default function MembershipPage() {

  const fadeUp = {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">

      <SpaceScene />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 z-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >

          <h1 className="text-[12vw] leading-none font-extrabold tracking-tight">

            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              MEMBERSHIP
            </span>

            <span className="block text-white text-[7vw] mt-4">
              ECOSYSTEM
            </span>

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-gray-300 text-lg md:text-xl">
            SocialEdger Membership is more than access.
            It is a gateway into a reputation-powered ecosystem
            where contributors, creators, and members participate
            in the future of digital ownership and community growth.
          </p>

          <div className="mt-10 flex flex-wrap gap-6 justify-center">

            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:scale-105 transition shadow-xl shadow-cyan-500/20">
              Become a Member
            </button>

            <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition">
              Explore Memberships
            </button>

          </div>

        </motion.div>

      </section>

      {/* ================= DUAL MEMBERSHIP ================= */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold text-center mb-6">
            Two Paths Into The Ecosystem
          </h2>

          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-20">
            SocialEdger introduces a dual membership model where users can
            participate through contribution, collaboration, or premium ecosystem access.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* CONTRIBUTOR */}
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-2xl p-10"
          >

            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />

            <span className="text-cyan-400 uppercase tracking-[4px] text-sm">
              Contributor Membership
            </span>

            <h3 className="text-4xl font-bold mt-4 mb-6">
              Invest Skills,
              Build Reputation
            </h3>

            <p className="text-gray-300 leading-relaxed mb-8">
              Contributor Membership is designed for creators,
              developers, marketers, writers, moderators, and ecosystem builders
              who want to grow through meaningful participation.
            </p>

            <div className="space-y-4 text-gray-300">

              <div>✔ Limited contributor positions</div>
              <div>✔ Reputation growth opportunities</div>
              <div>✔ Governance participation</div>
              <div>✔ Contributor recognition system</div>
              <div>✔ Ecosystem visibility and exposure</div>

            </div>

            <div className="mt-10">
              <button className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 transition">
                Apply as Contributor
              </button>
            </div>

          </motion.div>

          {/* PREMIUM */}
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-2xl p-10"
          >

            <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/10 blur-[120px]" />

            <span className="text-pink-400 uppercase tracking-[4px] text-sm">
              Premium Membership
            </span>

            <h3 className="text-4xl font-bold mt-4 mb-6">
              Unlock Premium
              Ecosystem Access
            </h3>

            <p className="text-gray-300 leading-relaxed mb-8">
              Premium Membership provides enhanced access to ecosystem tools,
              opportunities, rewards, and exclusive participation experiences.
            </p>

            <div className="space-y-4 text-gray-300">

              <div>✔ Premium community access</div>
              <div>✔ NFT-powered identity</div>
              <div>✔ Priority ecosystem opportunities</div>
              <div>✔ Exclusive content and resources</div>
              <div>✔ Future governance benefits</div>

            </div>

            <div className="mt-10">
              <button className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-400 transition">
                Get Premium Access
              </button>
            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= BENEFITS ================= */}
      <section className="relative z-10 py-32 px-6 max-w-6xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl text-center font-bold mb-20">
            Membership Benefits
          </h2>

        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            "NFT-Powered Identity",
            "Proof of Reputation",
            "Governance Participation",
            "Contributor Recognition",
            "Community Rewards",
            "Member Vault Access",
            "Priority Opportunities",
            "Future Ecosystem Utilities",
          ].map((item) => (

            <motion.div
              key={item}
              whileHover={{ y: -10 }}
              className="p-[1px] rounded-3xl bg-gradient-to-br from-white/20 to-white/5"
            >

              <div className="h-full rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8">

                <h3 className="text-lg font-semibold text-center">
                  {item}
                </h3>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative z-10 py-32 px-6 max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          <motion.div {...fadeUp}>

            <h2 className="text-5xl font-bold mb-10">
              How Membership Works
            </h2>

            <div className="space-y-6 text-gray-300 text-lg">

              <div>
                1. Join the SocialEdger ecosystem through Contributor
                or Premium Membership.
              </div>

              <div>
                2. Receive your NFT-powered membership identity
                and ecosystem access.
              </div>

              <div>
                3. Participate in the platform to build reputation,
                unlock opportunities, and grow influence.
              </div>

              <div>
                4. Contribute to the future of the community
                through governance and ecosystem participation.
              </div>

            </div>

          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 backdrop-blur-2xl p-6"
          >

            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/10 blur-[120px]" />

            <img
              src="/membership/membership-ecosystem.png"
              alt="Membership Ecosystem"
              className="relative z-10 w-full h-auto object-contain rounded-2xl"
            />

          </motion.div>

        </div>

      </section>

      {/* ================= STRUCTURE ================= */}
      <section className="relative z-10 py-32 px-6 max-w-6xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl text-center font-bold mb-20">
            Membership Structure
          </h2>

        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
          >

            <h3 className="text-3xl font-bold mb-6">
              Single Membership
            </h3>

            <p className="text-gray-300 leading-relaxed">
              A membership NFT linked to one primary wallet,
              giving members full ecosystem participation,
              reputation tracking, and vault ownership.
            </p>

          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
          >

            <h3 className="text-3xl font-bold mb-6">
              Shared Membership
            </h3>

            <p className="text-gray-300 leading-relaxed mb-8">
              Shared Membership allows two linked members to access
              the ecosystem through a single NFT while maintaining
              separate dashboards and participation histories.
            </p>

            <Link href="/shared-membership">
              <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition">
                Learn More
              </button>
            </Link>

          </motion.div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="relative z-10 py-32 text-center px-6">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold mb-8">
            Become Part of SocialEdger
          </h2>

          <p className="max-w-3xl mx-auto text-gray-400 text-lg mb-12">
            Join a reputation-powered ecosystem where participation,
            contribution, and community shape the future of digital ownership.
          </p>

          <button className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:scale-105 transition shadow-2xl shadow-cyan-500/20">
            Start Your Membership Journey
          </button>

        </motion.div>

      </section>

    </main>
  );
}