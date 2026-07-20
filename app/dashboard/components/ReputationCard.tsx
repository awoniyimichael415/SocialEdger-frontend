"use client";

interface Level {
  level: number;
  title: string;
  progress: number;
  nextLevel: number | null;
  reputationRemaining: number;
  maxLevel?: boolean;
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-gray-400">
            Reputation Score
          </p>

          <h2 className="mt-2 text-5xl font-bold text-cyan-400">
            {totalReputation.toLocaleString()}
          </h2>

          <p className="mt-2 text-gray-400">
            Proof of Reputation
          </p>
        </div>

        <div className="text-6xl">⭐</div>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex justify-between">
          <span className="font-semibold">
            Level {level.level}
          </span>

          <span className="text-cyan-400">
            {level.progress}%
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-700"
            style={{
              width: `${level.progress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-400">
          {level.maxLevel ||
          level.nextLevel === null
            ? "Maximum Level Achieved"
            : `${level.reputationRemaining.toLocaleString()} reputation until Level ${level.level + 1}`}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">
            Current Title
          </p>

          <h3 className="mt-2 font-semibold">
            {level.title}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">
            DAO Voting Weight
          </p>

          <h3 className="mt-2 font-semibold">
            {daoVotingWeight}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">
            Global Rank
          </p>

          <h3 className="mt-2 font-semibold">
            {globalRank ? `#${globalRank}` : "--"}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-gray-400">
            Reputation Sources
          </p>

          <h3 className="mt-2 font-semibold">
            4 Modules
          </h3>
        </div>
      </div>

      <div>
        <h3 className="mb-5 text-lg font-semibold">
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
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <span>{title}</span>

      <span className="font-semibold text-cyan-400">
        +{value}
      </span>
    </div>
  );
}
