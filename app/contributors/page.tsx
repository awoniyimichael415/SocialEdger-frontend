"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface Contributor {
  _id: string;
  walletAddress: string;
  displayName: string;
  username: string;
  bio: string;
  country: string;
  category: string;
  skills: string[];
  profileImage: string;
  verified: boolean;
  membershipType: string;
}

export default function ContributorsPage() {

  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [filtered, setFiltered] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const loadContributors = async () => {

      try {

        const res = await fetch(
          `${API}/api/contributors`
        );

        const data = await res.json();

        setContributors(data);
        setFiltered(data);

      } catch (error) {

        console.error(
          "Failed to load contributors:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadContributors();

  }, []);

  useEffect(() => {

    if (!search.trim()) {

      setFiltered(contributors);
      return;

    }

    const results = contributors.filter(
      (contributor) =>
        contributor.displayName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        contributor.category
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        contributor.country
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        contributor.skills?.some((skill) =>
          skill
            .toLowerCase()
            .includes(search.toLowerCase())
        )
    );

    setFiltered(results);

  }, [search, contributors]);

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-5xl mx-auto">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          Skill Contributors Network
        </h1>

        <p className="hero-sub text-gray-300 mt-6 max-w-3xl mx-auto">
          Discover skilled participants building their reputation
          through verified contributions, portfolio visibility,
          and ecosystem engagement.
        </p>

      </section>

      {/* SEARCH */}
      <section className="section max-w-6xl mx-auto">

        <div className="glass-card p-6 flex flex-col md:flex-row gap-4 justify-between items-center">

          <input
            type="text"
            placeholder="Search contributors..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-1/2 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
          />

          <div className="text-gray-400">
            {filtered.length} Contributors Found
          </div>

        </div>

      </section>

      {/* CONTRIBUTORS */}
      <section className="section max-w-7xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Ecosystem Contributors
        </h2>

        {loading ? (

          <div className="text-center text-gray-400">
            Loading contributors...
          </div>

        ) : filtered.length === 0 ? (

          <div className="glass-card p-10 text-center">
            <h3 className="text-xl font-semibold mb-3">
              No Contributors Found
            </h3>

            <p className="text-gray-400">
              Contributor profiles will appear here
              as members complete their profiles.
            </p>
          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filtered.map((contributor) => (

              <div
                key={contributor._id}
                className="glass-card p-6"
              >

                <div className="mb-5">

                  {contributor.profileImage ? (

                    <img
                      src={contributor.profileImage}
                      alt={contributor.displayName}
                      className="w-full h-52 object-cover rounded-xl"
                    />

                  ) : (

                    <div className="h-52 rounded-xl bg-gradient-to-br from-cyan-600/20 to-pink-600/20 flex items-center justify-center text-4xl">
                      👤
                    </div>

                  )}

                </div>

                <div className="flex items-center gap-2 mb-2">

                  <h3 className="text-xl font-semibold">
                    {contributor.displayName}
                  </h3>

                  {contributor.verified && (
                    <span className="text-cyan-400">
                      ✔
                    </span>
                  )}

                </div>

                <p className="text-gray-400 text-sm mb-3">
                  {contributor.category || "Contributor"}
                </p>

                <p className="text-gray-500 text-sm mb-4">
                  {contributor.country}
                </p>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {contributor.bio || "No bio added yet."}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">

                  {contributor.skills
                    ?.slice(0, 4)
                    .map((skill) => (

                      <span
                        key={skill}
                        className="text-xs bg-white/10 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>

                    ))}

                </div>

                <Link
                  href={`/contributors/${contributor.username}`}
                >
                  <button className="btn-outline w-full">
                    View Portfolio
                  </button>
                </Link>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* WHY THIS MATTERS */}
      <section className="section text-center max-w-4xl mx-auto">

        <h2 className="text-3xl font-semibold mb-6">
          Reputation-Driven Visibility
        </h2>

        <p className="text-gray-400">
          Contributors are ranked through participation,
          ecosystem engagement, reputation growth,
          and verified contributions — creating fair
          exposure and opportunity throughout SocialEdger.
        </p>

      </section>

    </main>
  );
}