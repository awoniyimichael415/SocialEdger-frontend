"use client";

interface Level {
  level: number;
  title: string;
  progress: number;
  nextLevel: number | null;
  reputationRemaining: number;
}

interface Breakdown {
  membership: number;
  contributor: number;
  opportunities: number;
  rewards: number;
}

interface Props {
  totalReputation: number;
  level: Level;
  daoVotingWeight: number;
  breakdown: Breakdown;
  globalRank?: number;
}

export default function ReputationCard({
  totalReputation,
  level,
  daoVotingWeight,
  breakdown,
  globalRank,
}: Props) {
  return (
    <section className="glass-card p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <p className="text-gray-400">
            Reputation Score
          </p>

          <h2 className="text-5xl font-bold mt-2 text-cyan-400">
            {totalReputation.toLocaleString()}
          </h2>

          <p className="text-gray-400 mt-2">
            Proof of Reputation
          </p>

        </div>

        <div className="text-6xl">
          ⭐
        </div>

      </div>

      {/* Level */}

      <div className="mb-8">

        <div className="flex justify-between mb-3">

          <span className="font-semibold">
            Level {level.level}
          </span>

          <span className="text-cyan-400">
            {level.progress}%
          </span>

        </div>

        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-700"
            style={{
              width: `${level.progress}%`,
            }}
          />

        </div>

        <p className="text-gray-400 text-sm mt-3">

          {level.maxLevel
            ? "Maximum Level Achieved"
            : `${level.reputationRemaining.toLocaleString()} reputation until Level ${level.level + 1}`}

        </p>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-2 gap-5 mb-8">

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-gray-400 text-sm">
            Current Title
          </p>

          <h3 className="mt-2 font-semibold">
            {level.title}
          </h3>

        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-gray-400 text-sm">
            DAO Voting Weight
          </p>

          <h3 className="mt-2 font-semibold">
            {daoVotingWeight}
          </h3>

        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-gray-400 text-sm">
            Global Rank
          </p>

          <h3 className="mt-2 font-semibold">

            {globalRank
              ? `#${globalRank}`
              : "--"}

          </h3>

        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

          <p className="text-gray-400 text-sm">
            Reputation Sources
          </p>

          <h3 className="mt-2 font-semibold">
            4 Modules
          </h3>

        </div>

      </div>

      {/* Breakdown */}

      <div>

        <h3 className="text-lg font-semibold mb-5">
          Reputation Breakdown
        </h3>

        <div className="space-y-4">

          <BreakdownItem
            title="Membership"
            value={breakdown.membership}
          />

          <BreakdownItem
            title="Contributor"
            value={breakdown.contributor}
          />

          <BreakdownItem
            title="Opportunities"
            value={breakdown.opportunities}
          />

          <BreakdownItem
            title="Rewards"
            value={breakdown.rewards}
          />

        </div>

      </div>

    </section>
  );
}

function BreakdownItem({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="flex justify-between items-center rounded-xl bg-white/5 px-4 py-3 border border-white/10">

      <span>
        {title}
      </span>

      <span className="text-cyan-400 font-semibold">
        +{value}
      </span>

    </div>
  );
}