import type { Contributor } from "@/src/lib/reputationApi";

type Props = {
  contributors: Contributor[];
  onSelect: (wallet: string) => void;
};

export default function Leaderboard({
  contributors,
  onSelect,
}: Props) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">
          Top Contributors
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Top 20 contributors ranked by reputation.
        </p>
      </div>

      <div className="divide-y divide-zinc-800">
        {contributors.map((user, index) => {
          const displayName =
            user.displayName ||
            user.fullName ||
            user.name ||
            "Unknown";

          const wallet =
            user.walletAddress ||
            user.wallet ||
            "";

          return (
            <div
              key={user._id ?? wallet ?? index}
              className="flex items-center justify-between px-6 py-4 transition hover:bg-zinc-800/40"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 text-center font-bold text-zinc-500">
                  #{index + 1}
                </div>

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={displayName}
                    className="h-12 w-12 rounded-full border border-zinc-700 object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-white">
                    {displayName}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    @{user.username ?? "unknown"}
                  </p>

                  <p className="text-xs text-zinc-500">
                    {wallet
                      ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                      : "No wallet"}
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-8 md:flex">
                <div className="text-center">
                  <p className="text-xs uppercase text-zinc-500">
                    Reputation
                  </p>

                  <p className="font-semibold text-white">
                    {user.totalReputation ??
                      user.reputation ??
                      0}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs uppercase text-zinc-500">
                    Level
                  </p>

                  <p className="font-semibold text-white">
                    {user.contributorLevel ?? 0}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs uppercase text-zinc-500">
                    DAO Weight
                  </p>

                  <p className="font-semibold text-white">
                    {user.daoVotingWeight ?? 0}
                  </p>
                </div>

                <button
                  onClick={() => onSelect(wallet)}
                  disabled={!wallet}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}

        {contributors.length === 0 && (
          <div className="px-6 py-12 text-center text-zinc-500">
            No contributors found.
          </div>
        )}
      </div>
    </section>
  );
}
