"use client";

import Link from "next/link";

const actions = [
  {
    title: "Primary Vault",
    description: "Manage your Membership NFT and ownership.",
    href: "/dashboard/primary-vault",
    icon: "🏛",
    color: "from-cyan-500/20 to-cyan-700/10",
  },
  {
    title: "Secondary Vault",
    description: "Access your shared membership privileges.",
    href: "/dashboard/secondary-vault",
    icon: "🤝",
    color: "from-purple-500/20 to-purple-700/10",
  },
  {
    title: "Contributor Profile",
    description: "Manage your public contributor profile and portfolio.",
    href: "/dashboard/contributor-profile",
    icon: "👤",
    color: "from-pink-500/20 to-pink-700/10",
  },
  {
    title: "Browse Opportunities",
    description: "Discover new contributor opportunities.",
    href: "/opportunities",
    icon: "🎯",
    color: "from-green-500/20 to-green-700/10",
  },
  {
    title: "Mining Center",
    description: "Monitor mining activity and token generation.",
    href: "/dashboard/mining",
    icon: "⛏",
    color: "from-orange-500/20 to-orange-700/10",
  },
  {
    title: "Rewards Center",
    description: "Track HIVE, SET and DAOCRAT rewards.",
    href: "/dashboard/rewards",
    icon: "💰",
    color: "from-yellow-500/20 to-yellow-700/10",
  },

  {
    title: "DAO Governance",
    description: "Participate in governance proposals and voting.",
    href: "/dashboard/dao",
    icon: "🗳",
    color: "from-emerald-500/20 to-emerald-700/10",
  },
];

export default function QuickActions() {
  return (
    <section className="glass-card p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <p className="text-gray-400 mt-2">
            Jump directly into any area of the SocialEdger ecosystem.
          </p>

        </div>

        <span className="text-5xl">
          ⚡
        </span>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {actions.map((action) => (

          <Link
            key={action.title}
            href={action.href}
            className={`rounded-3xl border border-white/10 bg-gradient-to-br ${action.color} backdrop-blur-xl p-6 hover:scale-[1.03] transition duration-300`}
          >

            <div className="text-5xl mb-5">
              {action.icon}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {action.title}
            </h3>

            <p className="text-gray-300 text-sm leading-6 mb-6">
              {action.description}
            </p>

            <span className="text-cyan-400 font-medium">
              Open →
            </span>

          </Link>
        ))}

      </div>

    </section>
  );
}
