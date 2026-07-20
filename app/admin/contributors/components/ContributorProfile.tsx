"use client";

interface Contributor {

  _id: string;

  displayName: string;

  username: string;

  walletAddress: string;

  email?: string;

  country?: string;

  category?: string;

  bio?: string;

  skills?: string[];

  portfolio?: string[];

  reputation?: number;

  membership?: string;

  verified?: boolean;

  createdAt?: string;

}

interface Props {

  contributor: Contributor | null;

}

export default function ContributorProfile({

  contributor,

}: Props) {

  if (!contributor) {

    return (

      <section className="glass-card p-10 mb-10 text-center">

        <div className="text-7xl mb-6">

          👤

        </div>

        <h2 className="text-2xl font-bold">

          No Contributor Selected

        </h2>

        <p className="text-gray-400 mt-4">

          Select a contributor from the directory to view their complete profile.

        </p>

      </section>

    );

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center gap-6 mb-10">

        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-4xl font-bold">

          {contributor.displayName?.charAt(0).toUpperCase()}

        </div>

        <div>

          <h2 className="text-3xl font-bold">

            {contributor.displayName}

          </h2>

          <p className="text-gray-400">

            @{contributor.username}

          </p>

          <div className="mt-3">

            {contributor.verified ? (

              <span className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">

                Verified Contributor

              </span>

            ) : (

              <span className="px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">

                Pending Verification

              </span>

            )}

          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        <InfoCard
          title="Wallet Address"
          value={contributor.walletAddress}
        />

        <InfoCard
          title="Membership"
          value={contributor.membership || "User"}
        />

        <InfoCard
          title="Country"
          value={contributor.country || "-"}
        />

        <InfoCard
          title="Category"
          value={contributor.category || "-"}
        />

        <InfoCard
          title="Reputation"
          value={String(contributor.reputation || 0)}
        />

        <InfoCard
          title="Email"
          value={contributor.email || "-"}
        />

      </div>

      <div className="mt-10">

        <h3 className="text-xl font-semibold mb-3">

          Biography

        </h3>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          <p className="text-gray-300">

            {contributor.bio || "No biography available."}

          </p>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <div>

          <h3 className="text-xl font-semibold mb-4">

            Skills

          </h3>

          <div className="flex flex-wrap gap-3">

            {contributor.skills?.length ? (

              contributor.skills.map((skill) => (

                <span

                  key={skill}

                  className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"

                >

                  {skill}

                </span>

              ))

            ) : (

              <p className="text-gray-400">

                No skills added.

              </p>

            )}

          </div>

        </div>

        <div>

          <h3 className="text-xl font-semibold mb-4">

            Portfolio Links

          </h3>

          <div className="space-y-3">

            {contributor.portfolio?.length ? (

              contributor.portfolio.map((link) => (

                <a

                  key={link}

                  href={link}

                  target="_blank"

                  rel="noreferrer"

                  className="block text-cyan-400 hover:underline break-all"

                >

                  {link}

                </a>

              ))

            ) : (

              <p className="text-gray-400">

                No portfolio links available.

              </p>

            )}

          </div>

        </div>

      </div>

    </section>

  );

}

function InfoCard({

  title,

  value,

}: {

  title: string;

  value: string;

}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <p className="text-sm text-gray-400">

        {title}

      </p>

      <h3 className="mt-3 font-semibold break-all">

        {value}

      </h3>

    </div>

  );

}