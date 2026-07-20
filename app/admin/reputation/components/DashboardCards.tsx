type Dashboard = {
  totalContributors: number;
  verifiedContributors: number;
  premiumMembers: number;
  totalReputation: number;
  averageReputation: number;
  totalBadges: number;
  totalVotingWeight: number;
};

type Props = {
  dashboard: Dashboard | null;
};

const cards = [
  {
    key: "totalContributors",
    title: "Total Contributors",
    color: "border-blue-500",
  },
  {
    key: "verifiedContributors",
    title: "Verified Contributors",
    color: "border-green-500",
  },
  {
    key: "premiumMembers",
    title: "Premium Members",
    color: "border-purple-500",
  },
  {
    key: "totalReputation",
    title: "Total Reputation",
    color: "border-amber-500",
  },
  {
    key: "averageReputation",
    title: "Average Reputation",
    color: "border-cyan-500",
  },
  {
    key: "totalBadges",
    title: "Total Badges",
    color: "border-pink-500",
  },
  {
    key: "totalVotingWeight",
    title: "DAO Voting Weight",
    color: "border-orange-500",
  },
] as const;

export default function DashboardCards({
  dashboard,
}: Props) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`rounded-2xl border ${card.color} bg-zinc-900 p-6 shadow-sm transition-all hover:shadow-lg`}
        >
          <p className="text-sm font-medium text-zinc-400">
            {card.title}
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white">
            {dashboard?.[card.key] ?? 0}
          </h2>
        </div>
      ))}
    </section>
  );
}
