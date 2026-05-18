"use client";

import { motion } from "framer-motion";
import SpaceScene from "../components/SpaceScene";

export default function ReputationPage() {

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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >

          <h1 className="text-[11vw] leading-none font-extrabold tracking-tight">

            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              PROOF
            </span>

            <span className="block text-white mt-4">
              OF REPUTATION
            </span>

          </h1>

          <p className="mt-8 max-w-4xl mx-auto text-gray-300 text-lg md:text-xl leading-relaxed">
            SocialEdger introduces Proof of Reputation —
            a decentralized trust and participation system where
            contribution, consistency, collaboration, and verified activity
            shape influence across the ecosystem.
          </p>

        </motion.div>

      </section>

      {/* ================= WHAT IS POR ================= */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          <motion.div {...fadeUp}>

            <h2 className="text-5xl font-bold mb-10 text-cyan-400">
              What is Proof of Reputation?
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Proof of Reputation (PoR) is the foundational trust protocol
              powering the SocialEdger ecosystem.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Instead of relying on centralized authority or
              financial dominance alone, PoR evaluates participation,
              contribution quality, consistency, ecosystem collaboration,
              and verified community impact.
            </p>

          </motion.div>

          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-6"
          >

            <div className="absolute inset-0 bg-cyan-500/5 blur-[120px]" />

            <img
              src="/reputation/reputation-consensus.png"
              alt="Reputation Consensus Visualization"
              className="
                relative z-10
                w-full
                h-auto
                object-contain
                rounded-2xl
              "
            />

          </motion.div>

        </div>

      </section>

      {/* ================= HOW REPUTATION GROWS ================= */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold text-center mb-8">
            How Reputation Grows
          </h2>

          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-20">
            Reputation is built through meaningful ecosystem participation,
            not artificial metrics or purchased influence.
          </p>

        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            "Verified Contributions",
            "Community Collaboration",
            "Contributor Activity",
            "Platform Engagement",
            "Long-Term Consistency",
            "Governance Participation",
            "Peer Recognition",
            "Knowledge Sharing",
          ].map((item) => (

            <motion.div
              key={item}
              whileHover={{ y: -10 }}
              className="p-[1px] rounded-3xl bg-gradient-to-br from-white/20 to-white/5"
            >

              <div className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">

                <h3 className="text-lg font-semibold text-center">
                  {item}
                </h3>

              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= CONSENSUS SYSTEM ================= */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-20 items-center">

          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-2xl p-10"
          >

            <span className="text-pink-400 uppercase tracking-[4px] text-sm">
              Reputation Consensus
            </span>

            <h2 className="text-4xl font-bold mt-4 mb-8">
              Community-Driven Trust Validation
            </h2>

            <p className="text-gray-300 leading-relaxed">
              SocialEdger evolves beyond centralized moderation models.
              High-reputation contributors help strengthen ecosystem quality
              through participation, validation, collaboration,
              and governance influence.
            </p>

          </motion.div>

          <motion.div {...fadeUp}>

            <h2 className="text-4xl font-bold mb-8 text-cyan-400">
              Reputation Influences
            </h2>

            <div className="space-y-6 text-gray-300 text-lg">

              <div>✔ Contributor visibility and ranking</div>
              <div>✔ Governance participation opportunities</div>
              <div>✔ Ecosystem trust and recognition</div>
              <div>✔ Community influence and leadership</div>
              <div>✔ Future reward and validator systems</div>
              <div>✔ Access to ecosystem opportunities</div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= PoR vs PoS vs PoW ================= */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold text-center mb-20">
            A New Consensus Model
          </h2>

        </motion.div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">

          <table className="w-full text-left min-w-[700px]">

            <thead className="border-b border-white/10">

              <tr>
                <th className="p-6 text-cyan-400">System</th>
                <th className="p-6 text-cyan-400">Driven By</th>
                <th className="p-6 text-cyan-400">Core Value</th>
              </tr>

            </thead>

            <tbody className="text-gray-300">

              <tr className="border-b border-white/10">
                <td className="p-6">Proof of Work</td>
                <td className="p-6">Computational Power</td>
                <td className="p-6">Mining Competition</td>
              </tr>

              <tr className="border-b border-white/10">
                <td className="p-6">Proof of Stake</td>
                <td className="p-6">Token Ownership</td>
                <td className="p-6">Financial Stake</td>
              </tr>

              <tr>
                <td className="p-6 text-cyan-400 font-semibold">
                  Proof of Reputation
                </td>

                <td className="p-6">
                  Contribution & Participation
                </td>

                <td className="p-6">
                  Community Trust & Ecosystem Value
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

      {/* ================= CONTRIBUTOR ROLES ================= */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold text-center mb-8">
            Ecosystem Contributors
          </h2>

          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-20">
            SocialEdger grows through diverse contributors
            collaborating across technology, creativity,
            governance, education, and ecosystem expansion.
          </p>

        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            "Developers",
            "Designers",
            "Writers",
            "Educators",
            "Moderators",
            "Community Leaders",
            "Researchers",
            "Growth Contributors",
          ].map((item) => (

            <motion.div
              key={item}
              whileHover={{ y: -10 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 text-center"
            >

              <h3 className="text-lg font-semibold">
                {item}
              </h3>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ================= WHY IT MATTERS ================= */}
      <section className="relative z-10 py-32 px-6 max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 gap-10">

          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
          >

            <h3 className="text-3xl font-bold mb-6 text-cyan-400">
              Why It Matters
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Proof of Reputation transforms digital participation
              into measurable ecosystem value, creating a more transparent,
              merit-driven, and community-powered environment.
            </p>

          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
          >

            <h3 className="text-3xl font-bold mb-6 text-pink-400">
              Built For The Future
            </h3>

            <p className="text-gray-300 leading-relaxed">
              SocialEdger positions reputation as the foundation
              for future governance, contributor recognition,
              ecosystem collaboration, and decentralized trust systems.
            </p>

          </motion.div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="relative z-10 py-32 text-center px-6">

        <motion.div {...fadeUp}>

          <h2 className="text-5xl font-bold mb-8">
            Start Building Reputation
          </h2>

          <p className="max-w-3xl mx-auto text-gray-400 text-lg mb-12">
            Every contribution, collaboration, and interaction
            helps shape your role within the SocialEdger ecosystem.
          </p>

          <button className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:scale-105 transition shadow-2xl shadow-cyan-500/20">
            Join The Ecosystem
          </button>

        </motion.div>

      </section>

    </main>
  );
}