type Contributor = {
  _id: string;
  walletAddress: string;
  displayName: string;
  username: string;
  profileImage: string;
  membershipType: string;
  verified: boolean;
  totalReputation: number;
  contributorLevel: number;
  daoVotingWeight: number;
};

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
        {contributors.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/40 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 text-center font-bold text-zinc-500">
                #{index + 1}
              </div>

              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.displayName}
                  className="h-12 w-12 rounded-full object-cover border border-zinc-700"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <h3 className="font-semibold text-white">
                  {user.displayName}
                </h3>

                <p className="text-sm text-zinc-400">
                  @{user.username}
                </p>

                <p className="text-xs text-zinc-500">
                  {user.walletAddress.slice(0, 6)}...
                  {user.walletAddress.slice(-4)}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase">
                  Reputation
                </p>

                <p className="font-semibold text-white">
                  {user.totalReputation}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase">
                  Level
                </p>

                <p className="font-semibold text-white">
                  {user.contributorLevel}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase">
                  DAO Weight
                </p>

                <p className="font-semibold text-white">
                  {user.daoVotingWeight}
                </p>
              </div>

              <button
                onClick={() =>
                  onSelect(user.walletAddress)
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {contributors.length === 0 && (
          <div className="px-6 py-12 text-center text-zinc-500">
            No contributors found.
          </div>
        )}
      </div>
    </section>
  );
}