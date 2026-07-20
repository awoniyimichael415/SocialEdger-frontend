"use client";

interface Contributor {

  _id: string;

  displayName: string;

  username: string;

  walletAddress: string;

  country?: string;

  category?: string;

  reputation?: number;

  membership?: string;

  verified?: boolean;

}

interface Props {

  contributors: Contributor[];

  onSelect: (contributor: Contributor) => void;

}

export default function ContributorTable({

  contributors,

  onSelect,

}: Props) {

  if (contributors.length === 0) {

    return (

      <section className="glass-card p-12 mb-10 text-center">

        <div className="text-7xl mb-6">

          👥

        </div>

        <h2 className="text-2xl font-bold">

          No Contributors Found

        </h2>

        <p className="text-gray-400 mt-4">

          Contributors will appear here after they create their contributor profile.

        </p>

      </section>

    );

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Contributors Directory

          </h2>

          <p className="text-gray-400 mt-2">

            Browse and manage every contributor on the platform.

          </p>

        </div>

        <span className="text-5xl">

          🌍

        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="text-left py-4">

                Contributor

              </th>

              <th className="text-left">

                Category

              </th>

              <th className="text-left">

                Country

              </th>

              <th className="text-center">

                Reputation

              </th>

              <th className="text-center">

                Membership

              </th>

              <th className="text-center">

                Status

              </th>

              <th className="text-right">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {contributors.map((item) => (

              <tr

                key={item._id}

                className="border-b border-white/5 hover:bg-white/5 transition"

              >

                <td className="py-5">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xl">

                      {item.displayName?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                      <h3 className="font-semibold">

                        {item.displayName}

                      </h3>

                      <p className="text-gray-400 text-sm">

                        @{item.username}

                      </p>

                      <p className="text-xs text-gray-500 break-all">

                        {item.walletAddress}

                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  {item.category || "-"}

                </td>

                <td>

                  {item.country || "-"}

                </td>

                <td className="text-center text-cyan-400 font-bold">

                  {item.reputation || 0}

                </td>

                <td className="text-center">

                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">

                    {item.membership || "User"}

                  </span>

                </td>

                <td className="text-center">

                  {item.verified ? (

                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">

                      Verified

                    </span>

                  ) : (

                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">

                      Pending

                    </span>

                  )}

                </td>

                <td className="text-right">

                  <button

                    onClick={() => onSelect(item)}

                    className="btn-primary"

                  >

                    View

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );

}