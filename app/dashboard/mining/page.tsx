"use client";

import { useAccount } from "wagmi";
import { useState } from "react";

const API =
process.env.NEXT_PUBLIC_BACKEND_URL ||
"http://localhost:5000";

export default function MiningPage() {

const { address } = useAccount();

const [reward, setReward] = useState(0);
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [miningStarted, setMiningStarted] = useState(false);

const startMining = async () => {

if (!address) {
  setMessage("Connect wallet first.");
  return;
}

try {

  setLoading(true);
  setMessage("");

  const res = await fetch(`${API}/api/mining/start`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      wallet: address
    })

  });

  const data = await res.json();

  setMiningStarted(true);

  setMessage("⛏️ Mining started successfully!");

} catch (error) {

  console.error(error);
  setMessage("Failed to start mining.");

} finally {

  setLoading(false);

}

};

const claimReward = async () => {

if (!address) {
  setMessage("Connect wallet first.");
  return;
}

try {

  setLoading(true);
  setMessage("");

  const res = await fetch(`${API}/api/mining/claim`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      wallet: address
    })

  });

  const data = await res.json();

  setReward(data.reward || 0);

  setMessage("✅ Reward claimed!");

} catch (error) {

  console.error(error);
  setMessage("Failed to claim reward.");

} finally {

  setLoading(false);

}

};

return (

<main className="max-w-6xl mx-auto section">

  <h1 className="text-4xl font-bold mb-10">

    Token Mining

  </h1>

  <div className="glass-card p-8 space-y-6">

    {message && (
      <p className="text-yellow-400">
        {message}
      </p>
    )}

    <button
      onClick={startMining}
      disabled={loading || miningStarted}
      className="btn-primary"
    >
      {miningStarted
        ? "Mining Active"
        : loading
        ? "Starting..."
        : "Start Mining"}
    </button>

    <button
      onClick={claimReward}
      disabled={loading}
      className="btn-outline"
    >
      {loading ? "Processing..." : "Claim Rewards"}
    </button>

    <p className="text-purple-400">
      Last reward: {reward} SET
    </p>

  </div>

</main>

);

}