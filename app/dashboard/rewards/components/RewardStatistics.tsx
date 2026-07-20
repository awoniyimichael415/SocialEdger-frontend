"use client";

interface Props {
  wallet: any;
}

export default function RewardStatistics({
  wallet,
}: Props) {

  const stats = [

    {
      title: "Lifetime HIVE",
      value: wallet?.totalHiveEarned || 0,
      color: "text-yellow-400",
      icon: "🐝",
    },

    {
      title: "Lifetime SET",
      value: wallet?.totalSetEarned || 0,
      color: "text-cyan-400",
      icon: "⚡",
    },

    {
      title: "Lifetime DAOCRAT",
      value: wallet?.totalDaoCratEarned || 0,
      color: "text-purple-400",
      icon: "🏛",
    },

    {
      title: "Withdrawn SET",
      value: wallet?.setWithdrawn || 0,
      color: "text-green-400",
      icon: "💸",
    },

  ];

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Reward Statistics
          </h2>

          <p className="text-gray-400 mt-2">
            Lifetime performance across the SocialEdger ecosystem.
          </p>

        </div>

        <span className="text-5xl">
          📊
        </span>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (

          <StatCard
            key={item.title}
            {...item}
          />

        ))}

      </div>

    </section>

  );

}

function StatCard({
  title,
  value,
  color,
  icon,
}: any) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div className="flex justify-between items-center mb-5">

        <span className="text-4xl">

          {icon}

        </span>

        <span className={`text-2xl font-bold ${color}`}>

          {Number(value).toLocaleString()}

        </span>

      </div>

      <h3 className="font-semibold">

        {title}

      </h3>

    </div>

  );

}