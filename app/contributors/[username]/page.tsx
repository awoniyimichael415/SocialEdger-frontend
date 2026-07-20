"use client";

import { use, useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function ContributorProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);

  const [contributor, setContributor] = useState<any>(null);
  const [reputation, setReputation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContributor = async () => {
      try {
        const res = await fetch(
          `${API}/api/contributors/${username}`
        );

        if (!res.ok) {
          setContributor(null);
          return;
        }

        const contributorData = await res.json();

        if (!contributorData) {
          setContributor(null);
          return;
        }

        setContributor(contributorData);

        if (contributorData.walletAddress) {
          const repRes = await fetch(
            `${API}/api/reputation/${contributorData.walletAddress}`
          );

          if (repRes.ok) {
            const repData = await repRes.json();
            setReputation(repData);
          }
        }
      } catch (error) {
        console.error("Failed to load contributor:", error);
        setContributor(null);
      } finally {
        setLoading(false);
      }
    };

    loadContributor();
  }, [username]);

  if (loading) {
    return (
      <main className="min-h-screen section max-w-6xl mx-auto">
        <p className="text-gray-400">
          Loading contributor profile...
        </p>
      </main>
    );
  }

  if (!contributor) {
    return (
      <main className="min-h-screen section max-w-6xl mx-auto">
        <div className="glass-card p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Contributor Not Found
          </h1>

          <p className="text-gray-400">
            This contributor profile does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen section max-w-7xl mx-auto">

      <section className="glass-card p-10 mb-10">
        <div className="flex flex-col lg:flex-row gap-10">

          <div>
            {contributor.profileImage ? (
              <img
                src={contributor.profileImage}
                alt={contributor.displayName}
                className="w-48 h-48 rounded-3xl object-cover"
              />
            ) : (
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center text-6xl">
                👤
              </div>
            )}
          </div>

          <div className="flex-1">

            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-5xl font-bold">
                {contributor.displayName}
              </h1>

              {contributor.verified && (
                <span className="text-cyan-400 text-2xl">
                  ✔
                </span>
              )}
            </div>

            <p className="text-xl text-gray-400 mb-2">
              @{contributor.username}
            </p>

            <p className="text-gray-400 mb-2">
              {contributor.category}
            </p>

            <p className="text-gray-400 mb-8">
              {contributor.country}
            </p>

            <p className="text-gray-300 leading-relaxed">
              {contributor.bio || "No bio available."}
            </p>

          </div>

        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-10">

        <div className="glass-card p-8">
          <h3 className="font-semibold mb-3">
            Membership
          </h3>

          <p className="text-cyan-400">
            {contributor.membershipType}
          </p>
        </div>

        <div className="glass-card p-8">
          <h3 className="font-semibold mb-3">
            Reputation Score
          </h3>

          <p className="text-3xl font-bold text-purple-400">
            {reputation?.reputation ?? 0}
          </p>
        </div>

        <div className="glass-card p-8">
          <h3 className="font-semibold mb-3">
            Contributor Status
          </h3>

          <p className="text-green-400">
            {contributor.accountStatus || "Active"}
          </p>
        </div>

      </section>

      <section className="glass-card p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {contributor.skills?.length ? (
            contributor.skills.map((skill: string) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-white/10"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-400">
              No skills added yet.
            </p>
          )}
        </div>

      </section>

      <section className="glass-card p-8 mb-10">

        <h2 className="text-3xl font-bold mb-8">
          Portfolio Links
        </h2>

        {contributor.portfolioLinks?.length ? (
          <div className="space-y-4">
            {contributor.portfolioLinks.map(
              (link: string, index: number) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-cyan-400 hover:underline break-all"
                >
                  {link}
                </a>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-400">
            No portfolio links added yet.
          </p>
        )}

      </section>

      <section className="glass-card p-8">

        <h2 className="text-3xl font-bold mb-8">
          Social & Professional Links
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {contributor.website && (
            <a
              href={contributor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-center"
            >
              Website
            </a>
          )}

          {contributor.linkedin && (
            <a
              href={contributor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-center"
            >
              LinkedIn
            </a>
          )}

          {contributor.twitter && (
            <a
              href={contributor.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-center"
            >
              Twitter / X
            </a>
          )}

        </div>

      </section>

    </main>
  );
}
