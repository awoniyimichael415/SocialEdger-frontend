"use client";

import { useEffect, useState } from "react";

export default function DashboardStats() {

  const [membership, setMembership] = useState<any>(null);
  const [presale, setPresale] = useState<any>(null);
  const [contributors, setContributors] = useState<any>(null);
  const [opportunities, setOpportunities] = useState<any>(null);
  const [rewardTransactions, setRewardTransactions] = useState<any[]>([]);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const [

        membershipRes,

        presaleRes,

        contributorRes,

        opportunityRes,

        rewardRes,

      ] = await Promise.all([

        fetch("http://localhost:5000/api/membership/admin/summary"),

        fetch("http://localhost:5000/api/presale/summary"),

        fetch("http://localhost:5000/api/contributors"),

        fetch("http://localhost:5000/api/opportunities"),

        fetch("http://localhost:5000/api/rewards/admin/transactions"),

      ]);

      setMembership(await membershipRes.json());

      setPresale(await presaleRes.json());

      setContributors(await contributorRes.json());

      setOpportunities(await opportunityRes.json());

      setRewardTransactions(await rewardRes.json());

    } catch (error) {

      console.error(error);

    }

  }

  const stats = [

    {

      title: "Members",

      value:
        membership
          ? membership.primaryMembers +
            membership.secondaryMembers
          : "--",

      subtitle: "Active Memberships",

      icon: "👥",

      color:
        "from-cyan-500/20 to-cyan-700/10",

    },

    {

      title: "NFT Minted",

      value:
        membership
          ? membership.mintedNFTs
          : "--",

      subtitle:
        membership
          ? `${membership.availableNFTs} Remaining`
          : "--",

      icon: "🖼️",

      color:
        "from-pink-500/20 to-pink-700/10",

    },

    {

      title: "Presale Participants",

      value:
        presale
          ? Number(presale[3])
          : "--",

      subtitle: "Live Blockchain",

      icon: "🚀",

      color:
        "from-purple-500/20 to-purple-700/10",

    },

    {

      title: "Contributors",

      value:
        contributors?.length ?? "--",

      subtitle: "Registered",

      icon: "⭐",

      color:
        "from-green-500/20 to-green-700/10",

    },

    {

      title: "Open Opportunities",

      value:
        opportunities?.length ?? "--",

      subtitle: "Available",

      icon: "🎯",

      color:
        "from-orange-500/20 to-orange-700/10",

    },

    {

      title: "Reward Transactions",

      value:
        rewardTransactions?.length ?? "--",

      subtitle: "Completed",

      icon: "💰",

      color:
        "from-yellow-500/20 to-yellow-700/10",

    },

  ];

  return (

    <section className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">

      {stats.map((item) => (

        <div

          key={item.title}

          className={`rounded-3xl border border-white/10 bg-gradient-to-br ${item.color} backdrop-blur-xl p-8 transition hover:scale-[1.02]`}

        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-400">

                {item.title}

              </p>

              <h2 className="mt-3 text-4xl font-bold">

                {item.value}

              </h2>

              <p className="mt-4 text-cyan-400">

                {item.subtitle}

              </p>

            </div>

            <div className="text-5xl">

              {item.icon}

            </div>

          </div>

        </div>

      ))}

    </section>

  );

}
