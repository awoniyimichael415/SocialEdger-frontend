"use client";

interface Props {
  wallet: any;
  history: any[];
  withdrawals: any[];
}

export default function RewardAnalytics({
  wallet,
  history,
  withdrawals,
}: Props) {

  const hive =
    wallet?.totalHiveEarned || 0;

  const set =
    wallet?.totalSetEarned || 0;

  const dao =
    wallet?.totalDaoCratEarned || 0;

  const rewards = [
    {
      name: "HIVE",
      value: hive,
    },
    {
      name: "SET",
      value: set,
    },
    {
      name: "DAOCRAT",
      value: dao,
    },
  ];

  const highestReward =
    rewards.reduce((a, b) =>
      a.value > b.value ? a : b
    );

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Reward Analytics
          </h2>

          <p className="text-gray-400 mt-2">
            Overview of your reward activity across the ecosystem.
          </p>

        </div>

        <span className="text-5xl">
          📈
        </span>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <AnalyticsCard
          title="Reward Transactions"
          value={history?.length || 0}
          icon="🎁"
          color="text-cyan-400"
        />

        <AnalyticsCard
          title="Withdrawal Requests"
          value={withdrawals?.length || 0}
          icon="💸"
          color="text-yellow-400"
        />

        <AnalyticsCard
          title="Highest Reward"
          value={highestReward.name}
          icon="🏆"
          color="text-green-400"
        />

        <AnalyticsCard
          title="Last Reward"
          value={
            history?.length
              ? new Date(
                  history[0].createdAt
                ).toLocaleDateString()
              : "-"
          }
          icon="🕒"
          color="text-purple-400"
        />

      </div>

    </section>

  );

}

function AnalyticsCard({
  title,
  value,
  icon,
  color,
}: any) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div className="flex justify-between items-center mb-5">

        <span className="text-4xl">

          {icon}

        </span>

      </div>

      <p className="text-gray-400 text-sm">

        {title}

      </p>

      <h3 className={`text-2xl font-bold mt-3 ${color}`}>

        {value}

      </h3>

    </div>

  );

}