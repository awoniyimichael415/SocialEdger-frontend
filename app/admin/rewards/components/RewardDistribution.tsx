"use client";

import { useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface Contributor {
  _id: string;
  displayName: string;
  username: string;
  walletAddress: string;
}

interface Props {
  contributor: Contributor | null;
  onRewardSent?: () => void;
}

export default function RewardDistribution({
  contributor,
  onRewardSent,
}: Props) {

  const [hive, setHive] = useState("");
  const [set, setSet] = useState("");
  const [daoCrat, setDaoCrat] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function distributeReward() {

    if (!contributor) return;

    try {

      setLoading(true);

      setMessage("");

      const res = await fetch(

        `${API}/api/rewards/distribute`,

        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            walletAddress:
              contributor.walletAddress,

            hive: Number(hive) || 0,

            set: Number(set) || 0,

            daoCrat:
              Number(daoCrat) || 0,

            type:
              "Admin Adjustment",

            description,

            contributorId:
              contributor._id,

          }),

        }

      );

      const data = await res.json();

      if (!res.ok) {

        throw new Error(
          data.error ||
            "Reward distribution failed."
        );

      }

      setMessage(
        "Reward distributed successfully."
      );

      setHive("");
      setSet("");
      setDaoCrat("");
      setDescription("");

      if (onRewardSent) {

        onRewardSent();

      }

    } catch (err: any) {

      setMessage(err.message);

    } finally {

      setLoading(false);

    }

  }

  if (!contributor) {

    return (

      <section className="glass-card p-8">

        <h2 className="text-2xl font-bold mb-4">

          Reward Distribution

        </h2>

        <p className="text-gray-400">

          Select a contributor from the
          search panel to distribute
          rewards.

        </p>

      </section>

    );

  }

  return (

    <section className="glass-card p-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold">

          Reward Distribution

        </h2>

        <p className="text-gray-400 mt-2">

          Selected Contributor

        </p>

      </div>

      <div className="rounded-xl border border-white/10 p-5 mb-8">

        <h3 className="text-xl font-semibold">

          {contributor.displayName}

        </h3>

        <p className="text-gray-400">

          @{contributor.username}

        </p>

        <p className="text-sm text-gray-500 break-all mt-2">

          {contributor.walletAddress}

        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <input
          type="number"
          placeholder="HIVE"
          value={hive}
          onChange={(e) =>
            setHive(e.target.value)
          }
          className="rounded-xl border border-white/10 bg-black/40 p-4"
        />

        <input
          type="number"
          placeholder="SET"
          value={set}
          onChange={(e) =>
            setSet(e.target.value)
          }
          className="rounded-xl border border-white/10 bg-black/40 p-4"
        />

        <input
          type="number"
          placeholder="DAOCRAT"
          value={daoCrat}
          onChange={(e) =>
            setDaoCrat(e.target.value)
          }
          className="rounded-xl border border-white/10 bg-black/40 p-4"
        />

      </div>

      <textarea
        rows={5}
        placeholder="Reward description..."
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="w-full mt-6 rounded-xl border border-white/10 bg-black/40 p-4"
      />

      <button
        onClick={distributeReward}
        disabled={loading}
        className="btn-primary mt-6"
      >

        {loading
          ? "Distributing..."
          : "Distribute Reward"}

      </button>

      {message && (

        <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">

          {message}

        </div>

      )}

    </section>

  );

}