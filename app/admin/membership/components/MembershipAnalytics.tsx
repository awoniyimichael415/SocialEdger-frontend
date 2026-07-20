"use client";

interface Props {

  totalSupply?: number;

  mintedNFTs?: number;

  availableNFTs?: number;

  primaryMembers?: number;

  secondaryMembers?: number;

  sharedMemberships?: number;

  mintProgress?: number;

  activeMemberships?: number;

}

export default function MembershipAnalytics({

  totalSupply = 20000,

  mintedNFTs = 0,

  availableNFTs = 20000,

  primaryMembers = 0,

  secondaryMembers = 0,

  sharedMemberships = 0,

  mintProgress = 0,

  activeMemberships = 0,

}: Props) {

  const analytics = [

    {

      title: "Mint Progress",

      value: `${mintProgress}%`,

      icon: "📈",

      color: "text-cyan-400",

    },

    {

      title: "Active Memberships",

      value: activeMemberships,

      icon: "🟢",

      color: "text-green-400",

    },

    {

      title: "Primary Members",

      value: primaryMembers,

      icon: "👑",

      color: "text-purple-400",

    },

    {

      title: "Secondary Members",

      value: secondaryMembers,

      icon: "🤝",

      color: "text-blue-400",

    },

    {

      title: "Shared Memberships",

      value: sharedMemberships,

      icon: "🔗",

      color: "text-pink-400",

    },

    {

      title: "Remaining Supply",

      value: availableNFTs,

      icon: "📦",

      color: "text-yellow-400",

    },

  ];

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Membership Analytics

          </h2>

          <p className="text-gray-400 mt-2">

            Real-time statistics for the Membership NFT ecosystem.

          </p>

        </div>

        <span className="text-5xl">

          📊

        </span>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {analytics.map((item) => (

          <div

            key={item.title}

            className="rounded-2xl border border-white/10 bg-white/5 p-6"

          >

            <div className="flex justify-between items-center">

              <span className="text-5xl">

                {item.icon}

              </span>

              <span

                className={`text-3xl font-bold ${item.color}`}

              >

                {item.value}

              </span>

            </div>

            <h3 className="mt-6 font-semibold">

              {item.title}

            </h3>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">

        <div className="flex justify-between mb-3">

          <span className="text-gray-300">

            NFT Minting Progress

          </span>

          <span className="font-semibold">

            {mintedNFTs} / {totalSupply}

          </span>

        </div>

        <div className="w-full h-4 rounded-full bg-black/40 overflow-hidden">

          <div

            className="h-full bg-cyan-500 transition-all"

            style={{

              width: `${mintProgress}%`,

            }}

          />

        </div>

      </div>

    </section>

  );

}