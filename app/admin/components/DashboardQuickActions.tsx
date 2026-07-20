"use client";

import Link from "next/link";

export default function DashboardQuickActions() {

  const actions = [

    {

      title: "Create Opportunity",

      description:
        "Publish a new contributor opportunity.",

      href: "/admin/opportunities",

      icon: "🎯",

      color:
        "from-cyan-500/20 to-cyan-700/10",

    },

    {

      title: "Membership Manager",

      description:
        "Manage Membership NFTs.",

      href: "/admin/membership",

      icon: "🖼️",

      color:
        "from-pink-500/20 to-pink-700/10",

    },

    {

      title: "Presale Dashboard",

      description:
        "Manage SET token presale.",

      href: "/admin/presale",

      icon: "🚀",

      color:
        "from-purple-500/20 to-purple-700/10",

    },

    {

      title: "Reward Center",

      description:
        "Manage contributor rewards.",

      href: "/admin/rewards",

      icon: "💰",

      color:
        "from-yellow-500/20 to-yellow-700/10",

    },

    {

      title: "KYC Verification",

      description:
        "Review pending KYC requests.",

      href: "/admin/kyc",

      icon: "📄",

      color:
        "from-green-500/20 to-green-700/10",

    },

    {

      title: "Contributors",

      description:
        "View contributor profiles.",

      href: "/admin/contributors",

      icon: "👥",

      color:
        "from-orange-500/20 to-orange-700/10",

    },

  ];

  return (

    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

      <h2 className="text-2xl font-bold mb-8">

        Quick Actions

      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => (

          <Link

            key={action.title}

            href={action.href}

            className={`rounded-2xl border border-white/10 bg-gradient-to-br ${action.color} p-6 transition hover:scale-[1.03] hover:border-cyan-400/40`}

          >

            <div className="text-5xl mb-5">

              {action.icon}

            </div>

            <h3 className="text-xl font-bold">

              {action.title}

            </h3>

            <p className="mt-3 text-gray-300 text-sm">

              {action.description}

            </p>

          </Link>

        ))}

      </div>

    </section>

  );

}