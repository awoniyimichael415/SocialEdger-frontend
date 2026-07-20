"use client";

interface Props {

  totalContributors?: number;

  verifiedContributors?: number;

  pendingVerification?: number;

  suspendedContributors?: number;

}

export default function ContributorSummary({

  totalContributors = 0,

  verifiedContributors = 0,

  pendingVerification = 0,

  suspendedContributors = 0,

}: Props) {

  const cards = [

    {

      title: "Total Contributors",

      value: totalContributors,

      icon: "👥",

      color: "text-cyan-400",

    },

    {

      title: "Verified",

      value: verifiedContributors,

      icon: "✅",

      color: "text-green-400",

    },

    {

      title: "Pending Verification",

      value: pendingVerification,

      icon: "🟡",

      color: "text-yellow-400",

    },

    {

      title: "Suspended",

      value: suspendedContributors,

      icon: "🚫",

      color: "text-red-400",

    },

  ];

  return (

    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

      {cards.map((card) => (

        <div

          key={card.title}

          className="glass-card p-6"

        >

          <div className="flex justify-between items-center">

            <span className="text-5xl">

              {card.icon}

            </span>

            <span className={`text-3xl font-bold ${card.color}`}>

              {card.value.toLocaleString()}

            </span>

          </div>

          <h3 className="mt-6 text-lg font-semibold">

            {card.title}

          </h3>

        </div>

      ))}

    </section>

  );

}