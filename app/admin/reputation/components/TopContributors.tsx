type Contributor = {
  wallet: string;
  totalReputation: number;
  contributorLevel: string;
  badges: string[];
  daoVotingWeight: number;
};

type Props = {
  contributors: Contributor[];
};

export default function TopContributors({
  contributors,
}: Props) {
  const topContributors = [...contributors]
    .sort((a, b) => b.totalReputation - a.totalReputation)
    .slice(0, 5);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            🏆 Top Contributors
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Highest reputation contributors across the platform.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {topContributors.map((user, index) => (
          <div
            key={user.wallet}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-blue-500"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                #{index + 1}
              </div>

              <div>
                <p className="font-semibold text-white">
                  {user.wallet.slice(0, 6)}...
                  {user.wallet.slice(-4)}
                </p>

                <p className="text-sm text-zinc-400">
                  {user.contributorLevel}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-xs uppercase text-zinc-500">
                  Reputation
                </p>

                <p className="font-bold text-white">
                  {user.totalReputation}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-zinc-500">
                  Badges
                </p>

                <p className="font-bold text-white">
                  {user.badges.length}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-zinc-500">
                  DAO Weight
                </p>

                <p className="font-bold text-white">
                  {user.daoVotingWeight}
                </p>
              </div>
            </div>

            <button className="rounded-lg border border-blue-500 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}