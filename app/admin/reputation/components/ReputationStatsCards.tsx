type DashboardStats = {
  totalContributors: number;
  premiumMembers: number;
  verifiedContributors: number;
  averageReputation: number;
  totalReputation: number;
  totalBadges: number;
  totalVotingWeight: number;
};

type Props = {
  dashboard: DashboardStats;
};

export default function ReputationStatsCards({
  dashboard,
}: Props) {
  const cards = [
    {
      title: "Contributors",
      value: dashboard.totalContributors,
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Premium Members",
      value: dashboard.premiumMembers,
      icon: "💎",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Verified",
      value: dashboard.verifiedContributors,
      icon: "✔️",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Average Reputation",
      value: dashboard.averageReputation,
      icon: "⭐",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Total Reputation",
      value: dashboard.totalReputation,
      icon: "🏆",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Badges",
      value: dashboard.totalBadges,
      icon: "🎖️",
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "DAO Voting Weight",
      value: dashboard.totalVotingWeight,
      icon: "🗳️",
      color: "from-cyan-500 to-sky-500",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500"
        >
          <div
            className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.color}`}
          />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">
                {card.title}
              </p>

              <h2 className="mt-4 text-4xl font-bold text-white">
                {card.value}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800 text-2xl transition group-hover:scale-110">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}