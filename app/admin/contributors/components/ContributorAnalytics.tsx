"use client";

interface Props {
  totalContributors?: number;
  verifiedContributors?: number;
  pendingVerification?: number;
  suspendedContributors?: number;
  averageReputation?: number;
  activeContributors?: number;
}

export default function ContributorAnalytics({

  totalContributors = 0,

  verifiedContributors = 0,

  pendingVerification = 0,

  suspendedContributors = 0,

  averageReputation = 0,

  activeContributors = 0,

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
      title: "Pending",
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

    {
      title: "Average Reputation",
      value: averageReputation,
      icon: "⭐",
      color: "text-purple-400",
    },

    {
      title: "Active Contributors",
      value: activeContributors,
      icon: "🚀",
      color: "text-blue-400",
    },

  ];

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Contributor Analytics

          </h2>

          <p className="text-gray-400 mt-2">

            High-level insights into contributor growth and activity.

          </p>

        </div>

        <span className="text-5xl">

          📊

        </span>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >

            <div className="flex justify-between items-center">

              <span className="text-5xl">

                {card.icon}

              </span>

              <span className={`text-3xl font-bold ${card.color}`}>

                {Number(card.value).toLocaleString()}

              </span>

            </div>

            <h3 className="mt-6 font-semibold">

              {card.title}

            </h3>

          </div>

        ))}

      </div>

    </section>

  );

}