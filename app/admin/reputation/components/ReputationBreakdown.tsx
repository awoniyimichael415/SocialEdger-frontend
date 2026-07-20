type Props = {
  breakdown: {
    membership: number;
    contributor: number;
    opportunities: number;
    rewards: number;
  };
};

export default function ReputationBreakdown({
  breakdown,
}: Props) {
  const rows = [
    {
      title: "Membership",
      value: breakdown.membership,
    },
    {
      title: "Contributor",
      value: breakdown.contributor,
    },
    {
      title: "Opportunities",
      value: breakdown.opportunities,
    },
    {
      title: "Rewards",
      value: breakdown.rewards,
    },
  ];

  const total =
    breakdown.membership +
    breakdown.contributor +
    breakdown.opportunities +
    breakdown.rewards;

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 px-5 py-4">
        <h3 className="text-lg font-semibold text-white">
          Reputation Breakdown
        </h3>
      </div>

      <div className="divide-y divide-zinc-800">
        {rows.map((row) => {
          const percentage =
            total > 0
              ? (row.value / total) * 100
              : 0;

          return (
            <div
              key={row.title}
              className="space-y-3 px-5 py-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">
                  {row.title}
                </span>

                <span className="font-semibold text-white">
                  {row.value}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}