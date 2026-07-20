"use client";

interface Props {
  multiplier?: number;
  totalMined?: number;
  todayMined?: number;
}

export default function MiningCard({
  multiplier = 1,
  totalMined = 0,
  todayMined = 0,
}: Props) {

  return (

    <section className="glass-card p-8 h-full">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Mining Center
          </h2>

          <p className="text-gray-400 mt-2">
            Your mining performance and token generation.
          </p>

        </div>

        <span className="text-5xl">
          ⛏
        </span>

      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">

        <Stat
          title="Multiplier"
          value={`${multiplier}×`}
        />

        <Stat
          title="Today"
          value={todayMined}
        />

        <Stat
          title="Lifetime"
          value={totalMined}
        />

      </div>

      <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-5">

        <p className="text-cyan-300 text-sm">

          Primary Members receive the highest mining multiplier,
          while contributor activity can unlock additional mining
          bonuses in future updates.

        </p>

      </div>

    </section>

  );

}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {

  return (

    <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h3 className="text-2xl font-bold mt-2">
        {value}
      </h3>

    </div>

  );

}