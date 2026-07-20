"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function OpportunitiesPage() {

  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {

    const load = async () => {

      try {

        const res = await fetch(
          `${API}/api/opportunities`
        );

        const data = await res.json();

        setOpportunities(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    load();

  }, []);

  const categories = useMemo(() => {

    return [
      "All",
      ...new Set(
        opportunities.map(
          (o) => o.category
        )
      ),
    ];

  }, [opportunities]);

  const filtered = opportunities.filter((item) => {

    const matchesSearch =
      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      item.description
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return (
      matchesSearch &&
      matchesCategory
    );

  });

  return (

    <main className="min-h-screen section max-w-7xl mx-auto">

      <section className="text-center mb-16">

        <h1 className="text-5xl font-bold mb-6">
          SocialEdger Opportunities
        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto">
          Discover ecosystem opportunities, collaborate on meaningful
          projects, build your Proof of Reputation, and earn HIVE rewards.
        </p>

      </section>

      <section className="glass-card p-6 mb-12">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-black border border-gray-700 rounded-lg px-4 py-3"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="bg-black border border-gray-700 rounded-lg px-4 py-3"
          >

            {categories.map((cat) => (

              <option
                key={cat}
              >
                {cat}
              </option>

            ))}

          </select>

        </div>

      </section>

      {loading ? (

        <div className="text-center py-20 text-gray-400">
          Loading opportunities...
        </div>

      ) : filtered.length === 0 ? (

        <div className="glass-card p-12 text-center">

          <h2 className="text-2xl font-semibold mb-4">
            No Opportunities Available
          </h2>

          <p className="text-gray-400">
            Check back later for new ecosystem opportunities.
          </p>

        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-8">

          {filtered.map((item) => (

            <div
              key={item._id}
              className="glass-card p-8"
            >

              <div className="flex justify-between items-start mb-4">

                <h2 className="text-2xl font-bold">
                  {item.title}
                </h2>

                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                  {item.status}
                </span>

              </div>

              <p className="text-gray-400 mb-6">
                {item.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">

                <div>

                  <p className="text-gray-500 text-sm">
                    Category
                  </p>

                  <p>
                    {item.category}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Difficulty
                  </p>

                  <p>
                    {item.difficulty}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    HIVE Reward
                  </p>

                  <p className="text-green-400 font-semibold">
                    {item.hiveReward}
                  </p>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Reputation
                  </p>

                  <p className="text-purple-400 font-semibold">
                    +{item.reputationReward}
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-2 mb-6">

                {item.requiredSkills?.map(
                  (
                    skill: string
                  ) => (

                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white/10 text-sm"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

              <Link
                href={`/opportunities/${item._id}`}
                className="btn-primary inline-block"
              >
                View Opportunity
              </Link>

            </div>

          ))}

        </div>

      )}

    </main>

  );

}