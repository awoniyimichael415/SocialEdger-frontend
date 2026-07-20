"use client";

interface Badge {
  name: string;
  icon: string;
}

interface Level {
  level: number;
  title: string;
}

interface Contributor {
  displayName?: string;
  username?: string;
  profileImage?: string;
  verified?: boolean;
}

interface Props {
  wallet?: string;
  role?: string;
  contributor?: Contributor | null;
  level?: Level;
  badges?: Badge[];
}

export default function ProfileSummary({
  wallet,
  role,
  contributor,
  level,
  badges = [],
}: Props) {
  return (
    <section className="glass-card p-8 mb-10">

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

        <div className="flex items-center gap-6">

          {contributor?.profileImage ? (

            <img
              src={contributor.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500"
            />

          ) : (

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
              {(contributor?.displayName || "S")
                .charAt(0)
                .toUpperCase()}
            </div>

          )}

          <div>

            <h1 className="text-3xl font-bold">

              {contributor?.displayName || "SocialEdger Member"}

            </h1>

            <p className="text-gray-400 mt-1">

              @{contributor?.username || "username"}

            </p>

            <div className="flex flex-wrap gap-3 mt-4">

              {contributor?.verified && (

                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">

                  ✔ Verified

                </span>

              )}

              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">

                {role || "Member"}

              </span>

              {level && (

                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">

                  Level {level.level}

                </span>

              )}

            </div>

          </div>

        </div>

        <div className="text-left lg:text-right">

          <h2 className="text-xl font-semibold">

            {level?.title || "Contributor"}

          </h2>

          <p className="text-gray-400 mt-3 break-all">

            {wallet || "Wallet not connected"}

          </p>

        </div>

      </div>

      {badges.length > 0 && (

        <div className="mt-8 border-t border-white/10 pt-6">

          <h3 className="text-lg font-semibold mb-4">

            Earned Badges

          </h3>

          <div className="flex flex-wrap gap-3">

            {badges.map((badge) => (

              <div
                key={badge.name}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2"
              >

                <span className="text-xl">
                  {badge.icon}
                </span>

                <span className="text-sm">
                  {badge.name}
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

    </section>
  );
}