"use client";

interface Props {
  wallet: any;
}

export default function RewardBalances({
  wallet,
}: Props) {

  return (

    <section className="grid md:grid-cols-3 gap-8 mb-10">

      <BalanceCard
        title="HIVE"
        value={wallet?.hiveBalance || 0}
        icon="🐝"
        color="text-yellow-400"
      />

      <BalanceCard
        title="SET"
        value={wallet?.setPending || 0}
        icon="⚡"
        color="text-cyan-400"
      />

      <BalanceCard
        title="DAOCRAT"
        value={wallet?.daoCratBalance || 0}
        icon="🏛"
        color="text-purple-400"
      />

    </section>

  );

}

function BalanceCard({
  title,
  value,
  icon,
  color,
}: any) {

  return (

    <div className="glass-card p-8 text-center">

      <div className="text-6xl mb-5">

        {icon}

      </div>

      <h2 className="text-2xl font-bold">

        {title}

      </h2>

      <div
        className={`text-5xl font-bold mt-6 ${color}`}
      >

        {Number(value).toLocaleString()}

      </div>

    </div>

  );

}