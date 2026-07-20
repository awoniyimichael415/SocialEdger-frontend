"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAccount } from "wagmi";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function OpportunityDetailsPage() {

  const { id } = useParams();

  const { address, isConnected } = useAccount();

  const [opportunity, setOpportunity] = useState<any>(null);
  const [contributor, setContributor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {

    if (!id) return;

    const loadOpportunity = async () => {

      try {

        const res = await fetch(
          `${API}/api/opportunities/${id}`
        );

        const data = await res.json();

        setOpportunity(data);

        if (address) {

          const contributors =
            await fetch(
              `${API}/api/contributors`
            );

          const list =
            await contributors.json();

          const me =
            list.find(
              (c: any) =>
                c.walletAddress?.toLowerCase() ===
                address.toLowerCase()
            );

          setContributor(me);

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    loadOpportunity();

  }, [id, address]);

  const apply = async () => {

    if (!address) {

      alert(
        "Connect your wallet first."
      );

      return;

    }

    if (!contributor) {

      alert(
        "Please complete your Contributor Profile before applying."
      );

      return;

    }

    try {

      setApplying(true);

      const res = await fetch(

        `${API}/api/opportunities/${id}/apply`,

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            walletAddress: address,

            username:
              contributor.username,

          }),

        }

      );

      const result =
        await res.json();

      if (result.error) {

        alert(result.error);

        return;

      }

      alert(
        "Application submitted successfully."
      );

      setOpportunity(result);

    } catch (error) {

      console.error(error);

      alert(
        "Application failed."
      );

    } finally {

      setApplying(false);

    }

  };

  if (loading) {

    return (

      <main className="min-h-screen section max-w-6xl mx-auto">

        <p className="text-gray-400">
          Loading opportunity...
        </p>

      </main>

    );

  }

  if (!opportunity) {

    return (

      <main className="min-h-screen section max-w-6xl mx-auto">

        <div className="glass-card p-10">

          <h1 className="text-3xl font-bold mb-4">
            Opportunity Not Found
          </h1>

        </div>

      </main>

    );

  }

  const alreadyApplied =
    opportunity.applicants?.find(
      (a: any) =>
        a.walletAddress?.toLowerCase() ===
        address?.toLowerCase()
    );

  return (

    <main className="min-h-screen section max-w-7xl mx-auto">

      <section className="glass-card p-10 mb-10">

        <div className="flex justify-between items-start gap-8">

          <div>

            <h1 className="text-5xl font-bold mb-6">
              {opportunity.title}
            </h1>

            <p className="text-gray-300 leading-relaxed">
              {opportunity.description}
            </p>

          </div>

          <div className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400">
            {opportunity.status}
          </div>

        </div>

      </section>

      <section className="grid lg:grid-cols-2 gap-8 mb-10">

        <div className="glass-card p-8">

          <h2 className="text-2xl font-bold mb-6">
            Opportunity Details
          </h2>

          <div className="space-y-4">

            <p>
              <strong>Category:</strong>{" "}
              {opportunity.category}
            </p>

            <p>
              <strong>Difficulty:</strong>{" "}
              {opportunity.difficulty}
            </p>

            <p>
              <strong>Contributors Needed:</strong>{" "}
              {opportunity.contributorsNeeded}
            </p>

            <p>
              <strong>Current Applicants:</strong>{" "}
              {opportunity.applicants?.length || 0}
            </p>

            <p>
              <strong>Created By:</strong>{" "}
              {opportunity.createdBy}
            </p>

          </div>

        </div>

        <div className="glass-card p-8">

          <h2 className="text-2xl font-bold mb-6">
            Rewards
          </h2>

          <div className="space-y-6">

            <div>

              <p className="text-gray-400">
                HIVE Reward
              </p>

              <p className="text-4xl font-bold text-green-400">
                {opportunity.hiveReward}
              </p>

            </div>

            <div>

              <p className="text-gray-400">
                Reputation Reward
              </p>

              <p className="text-4xl font-bold text-purple-400">
                +{opportunity.reputationReward}
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="glass-card p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Required Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {opportunity.requiredSkills?.map(
            (skill: string) => (

              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-white/10"
              >
                {skill}
              </span>

            )
          )}

        </div>

      </section>

      <section className="glass-card p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Reference Links
        </h2>

        {opportunity.referenceLinks?.length ? (

          <div className="space-y-4">

            {opportunity.referenceLinks.map(
              (
                link: string,
                index: number
              ) => (

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
            No reference links.
          </p>

        )}

      </section>

      <section className="text-center">

        {!isConnected ? (

          <button
            disabled
            className="btn-primary opacity-50"
          >
            Connect Wallet to Apply
          </button>

        ) : alreadyApplied ? (

          <button
            disabled
            className="btn-primary opacity-50"
          >
            Application Submitted ✓
          </button>

        ) : (

          <button
            onClick={apply}
            disabled={applying}
            className="btn-primary"
          >
            {applying
              ? "Submitting..."
              : "Apply For Opportunity"}
          </button>

        )}

      </section>

    </main>

  );

}