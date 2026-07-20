"use client";

interface Props {
  totalDistributed?: number;
  pendingWithdrawals?: number;
  approvedWithdrawals?: number;
  rewardedContributors?: number;
}

export default function RewardSummary({

  totalDistributed = 0,

  pendingWithdrawals = 0,

  approvedWithdrawals = 0,

  rewardedContributors = 0,

}: Props) {

  const cards = [

    {
      title: "Rewards Distributed",
      value: totalDistributed,
      color: "text-cyan-400",
      icon: "💰",
    },

    {
      title: "Pending Withdrawals",
      value: pendingWithdrawals,
      color: "text-yellow-400",
      icon: "⏳",
    },

    {
      title: "Approved Withdrawals",
      value: approvedWithdrawals,
      color: "text-green-400",
      icon: "✅",
    },

    {
      title: "Rewarded Contributors",
      value: rewardedContributors,
      color: "text-purple-400",
      icon: "👥",
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

            <span
              className={`text-3xl font-bold ${card.color}`}
            >

              {Number(card.value).toLocaleString()}

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