"use client";

interface Contributor {
  totalHiveEarned?: number;
  totalSetEarned?: number;
  totalDaoCratEarned?: number;
}

interface Props {
  contributor?: Contributor | null;
}

export default function RewardsCard({
  contributor,
}: Props) {

  const hive =
    contributor?.totalHiveEarned || 0;

  const set =
    contributor?.totalSetEarned || 0;

  const dao =
    contributor?.totalDaoCratEarned || 0;

  const total =
    hive + set + dao;

  return (

    <section className="glass-card p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Rewards Center
          </h2>

          <p className="text-gray-400 mt-2">
            Lifetime ecosystem rewards earned through your contributions.
          </p>

        </div>

        <span className="text-5xl">
          💰
        </span>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <RewardItem
          title="HIVE"
          value={hive}
          color="text-cyan-400"
          icon="🐝"
        />

        <RewardItem
          title="SET"
          value={set}
          color="text-purple-400"
          icon="⚡"
        />

        <RewardItem
          title="DAOCRAT"
          value={dao}
          color="text-yellow-400"
          icon="🏛"
        />

      </div>

      <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-gray-300">
              Total Rewards Earned
            </p>

            <h3 className="text-4xl font-bold mt-2 text-emerald-400">
              {total.toLocaleString()}
            </h3>

          </div>

          <div className="text-6xl">
            🏆
          </div>

        </div>

      </div>

    </section>

  );

}

function RewardItem({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: string;
}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div className="flex justify-between items-center mb-5">

        <span className="text-4xl">
          {icon}
        </span>

        <span className={`${color} text-2xl font-bold`}>
          {value.toLocaleString()}
        </span>

      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

    </div>

  );

}