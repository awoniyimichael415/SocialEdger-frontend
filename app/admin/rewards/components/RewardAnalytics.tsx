"use client";

interface Props {
  totalHive?: number;
  totalSet?: number;
  totalDaoCrat?: number;
  totalWithdrawals?: number;
  totalContributors?: number;
  averageReward?: number;
}

export default function RewardAnalytics({

  totalHive = 0,

  totalSet = 0,

  totalDaoCrat = 0,

  totalWithdrawals = 0,

  totalContributors = 0,

  averageReward = 0,

}: Props) {

  const cards = [

    {
      title: "Total HIVE Distributed",
      value: totalHive,
      icon: "🐝",
      color: "text-yellow-400",
    },

    {
      title: "Total SET Distributed",
      value: totalSet,
      icon: "⚡",
      color: "text-cyan-400",
    },

    {
      title: "Total DAOCRAT Distributed",
      value: totalDaoCrat,
      icon: "🏛",
      color: "text-purple-400",
    },

    {
      title: "Withdrawal Volume",
      value: totalWithdrawals,
      icon: "💸",
      color: "text-green-400",
    },

    {
      title: "Rewarded Contributors",
      value: totalContributors,
      icon: "👥",
      color: "text-pink-400",
    },

    {
      title: "Average Reward",
      value: averageReward,
      icon: "📊",
      color: "text-orange-400",
    },

  ];

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Reward Analytics

          </h2>

          <p className="text-gray-400 mt-2">

            Platform-wide reward distribution overview.

          </p>

        </div>

        <span className="text-5xl">

          📈

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

              <span
                className={`text-3xl font-bold ${card.color}`}
              >

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