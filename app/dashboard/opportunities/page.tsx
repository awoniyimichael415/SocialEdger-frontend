"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function DashboardOpportunitiesPage() {

  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(true);

  const [applications, setApplications] = useState<any[]>([]);

  const [opportunities, setOpportunities] = useState<any[]>([]);

  useEffect(() => {

    if (!address) return;

    const load = async () => {

      try {

        const appRes = await fetch(
          `${API}/api/opportunity-applications/wallet/${address}`
        );

        const appData = await appRes.json();

        setApplications(appData);

        const oppRes = await fetch(
          `${API}/api/opportunities`
        );

        const oppData = await oppRes.json();

        setOpportunities(oppData);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    load();

  }, [address]);

  if (!isConnected) {

    return (

      <main className="min-h-screen section max-w-6xl mx-auto">

        <div className="glass-card p-8">

          <h1 className="text-4xl font-bold mb-4">
            My Opportunities
          </h1>

          <p className="text-red-400">
            Connect your wallet to continue.
          </p>

        </div>

      </main>

    );

  }

  const stats = {

    pending:
      applications.filter(
        (a) => a.status === "Pending"
      ).length,

    approved:
      applications.filter(
        (a) => a.status === "Approved"
      ).length,

    assigned:
      applications.filter(
        (a) => a.status === "Assigned"
      ).length,

    completed:
      applications.filter(
        (a) => a.status === "Completed"
      ).length,

  };

  return (

    <main className="min-h-screen section max-w-7xl mx-auto">

      <h1 className="text-5xl font-bold mb-12">

        My Opportunities

      </h1>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <div className="glass-card p-6">

          <p className="text-gray-400">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-400">
            {stats.pending}
          </h2>

        </div>

        <div className="glass-card p-6">

          <p className="text-gray-400">
            Approved
          </p>

          <h2 className="text-4xl font-bold text-cyan-400">
            {stats.approved}
          </h2>

        </div>

        <div className="glass-card p-6">

          <p className="text-gray-400">
            Assigned
          </p>

          <h2 className="text-4xl font-bold text-purple-400">
            {stats.assigned}
          </h2>

        </div>

        <div className="glass-card p-6">

          <p className="text-gray-400">
            Completed
          </p>

          <h2 className="text-4xl font-bold text-green-400">
            {stats.completed}
          </h2>

        </div>

      </div>

      {/* Applications */}

      <div className="glass-card p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">

            My Applications

          </h2>

          <Link
            href="/opportunities"
            className="btn-primary"
          >
            Browse Opportunities
          </Link>

        </div>

        {loading ? (

          <p className="text-gray-400">

            Loading...

          </p>

        ) : applications.length === 0 ? (

          <div className="text-center py-16">

            <h3 className="text-2xl font-semibold mb-4">

              No Applications Yet

            </h3>

            <p className="text-gray-400 mb-8">

              Start contributing by applying for ecosystem opportunities.

            </p>

            <Link
              href="/opportunities"
              className="btn-primary"
            >
              View Opportunities
            </Link>

          </div>

        ) : (

          <div className="space-y-6">

            {applications.map((application) => {

              const opportunity =
                opportunities.find(
                  (o) =>
                    o._id ===
                    application.opportunityId
                );

              return (

                <div
                  key={application._id}
                  className="border border-white/10 rounded-2xl p-6 bg-black/30"
                >

                  <div className="flex justify-between items-start gap-8">

                    <div>

                      <h3 className="text-2xl font-bold mb-2">

                        {opportunity?.title ||
                          "Opportunity"}

                      </h3>

                      <p className="text-gray-400">

                        {opportunity?.category}

                      </p>

                    </div>

                    <span className="px-4 py-2 rounded-full bg-white/10">

                      {application.status}

                    </span>

                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div>

                      <p className="text-gray-500">

                        HIVE Reward

                      </p>

                      <p className="text-green-400 font-semibold">

                        {opportunity?.hiveReward}

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">

                        Reputation

                      </p>

                      <p className="text-purple-400 font-semibold">

                        +{opportunity?.reputationReward}

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">

                        Difficulty

                      </p>

                      <p>

                        {opportunity?.difficulty}

                      </p>

                    </div>

                  </div>

                  {application.adminFeedback && (

                    <div className="mt-6 p-4 rounded-xl bg-white/5">

                      <p className="text-sm text-gray-400 mb-2">

                        Admin Feedback

                      </p>

                      <p>

                        {application.adminFeedback}

                      </p>

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        )}

      </div>

    </main>

  );

}