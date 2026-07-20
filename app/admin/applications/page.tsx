"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function AdminApplicationsPage() {

  const [applications, setApplications] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {

    try {

      const appRes = await fetch(
        `${API}/api/opportunity-applications`
      );

      const apps = await appRes.json();

      setApplications(apps);

      const oppRes = await fetch(
        `${API}/api/opportunities`
      );

      const opps = await oppRes.json();

      setOpportunities(opps);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {

    await fetch(
      `${API}/api/opportunity-applications/${id}`,
      {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),

      }
    );

    load();

  };

  return (

    <main className="min-h-screen section max-w-7xl mx-auto">

      <h1 className="text-5xl font-bold mb-12">

        Contributor Applications

      </h1>

      {loading ? (

        <p>Loading...</p>

      ) : applications.length === 0 ? (

        <div className="glass-card p-10 text-center">

          <h2 className="text-3xl">

            No Applications

          </h2>

        </div>

      ) : (

        <div className="space-y-8">

          {applications.map((app) => {

            const opportunity =
              opportunities.find(
                (o) =>
                  o._id === app.opportunityId
              );

            return (

              <div
                key={app._id}
                className="glass-card p-8"
              >

                <div className="flex justify-between items-start gap-8">

                  <div>

                    <h2 className="text-3xl font-bold">

                      {opportunity?.title}

                    </h2>

                    <p className="text-gray-400">

                      {opportunity?.category}

                    </p>

                  </div>

                  <span className="px-4 py-2 rounded-full bg-white/10">

                    {app.status}

                  </span>

                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8">

                  <div>

                    <h3 className="font-semibold mb-2">

                      Applicant

                    </h3>

                    <p>

                      {app.username}

                    </p>

                    <p className="break-all text-gray-400">

                      {app.walletAddress}

                    </p>

                  </div>

                  <div>

                    <h3 className="font-semibold mb-2">

                      Rewards

                    </h3>

                    <p>

                      HIVE:
                      {" "}
                      {opportunity?.hiveReward}

                    </p>

                    <p>

                      Reputation:
                      {" "}
                      {opportunity?.reputationReward}

                    </p>

                  </div>

                </div>

                {app.coverLetter && (

                  <div className="mt-8">

                    <h3 className="font-semibold mb-2">

                      Cover Letter

                    </h3>

                    <div className="bg-black/30 rounded-xl p-4">

                      {app.coverLetter}

                    </div>

                  </div>

                )}

                {app.adminFeedback && (

                  <div className="mt-8">

                    <h3 className="font-semibold mb-2">

                      Feedback

                    </h3>

                    <div className="bg-black/30 rounded-xl p-4">

                      {app.adminFeedback}

                    </div>

                  </div>

                )}

                <div className="flex flex-wrap gap-4 mt-10">

                  <button
                    onClick={() =>
                      updateStatus(
                        app._id,
                        "Approved"
                      )
                    }
                    className="btn-primary"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        app._id,
                        "Assigned"
                      )
                    }
                    className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500"
                  >
                    Assign
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        app._id,
                        "Completed"
                      )
                    }
                    className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-500"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        app._id,
                        "Rejected"
                      )
                    }
                    className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500"
                  >
                    Reject
                  </button>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </main>

  );

}