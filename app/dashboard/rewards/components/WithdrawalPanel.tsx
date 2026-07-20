"use client";

import { useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface Props {
  wallet: any;
  walletAddress: string;
  onSuccess?: () => void;
}

export default function WithdrawalPanel({
  wallet,
  walletAddress,
  onSuccess,
}: Props) {

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  async function submitWithdrawal() {

    setMessage("");
    setError("");

    if (!amount) {

      setError(
        "Please enter a withdrawal amount."
      );

      return;

    }

    try {

      setLoading(true);

      const res = await fetch(

        `${API}/api/rewards/withdrawals`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            walletAddress,

            amount: Number(amount),

          }),

        }

      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(
          data.error ||
          "Withdrawal request failed."
        );

      }

      setMessage(
        "Withdrawal request submitted successfully."
      );

      setAmount("");

      if (onSuccess) {

        onSuccess();

      }

    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            SET Withdrawal

          </h2>

          <p className="text-gray-400 mt-2">

            Request a withdrawal from your
            available SET rewards.

          </p>

        </div>

        <span className="text-5xl">

          💸

        </span>

      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        <div>

          <p className="text-gray-400">

            Available SET

          </p>

          <h3 className="text-5xl font-bold text-cyan-400 mt-3">

            {wallet?.setPending || 0}

          </h3>

          <p className="text-gray-500 mt-4">

            Only available SET can be
            requested for withdrawal.

          </p>

        </div>

        <div className="space-y-5">

          <input

            type="number"

            placeholder="Withdrawal Amount"

            value={amount}

            onChange={(e) =>
              setAmount(e.target.value)
            }

            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4"

          />

          <button

            onClick={submitWithdrawal}

            disabled={loading}

            className="btn-primary w-full"

          >

            {loading
              ? "Submitting..."
              : "Request Withdrawal"}

          </button>

          {message && (

            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">

              <p className="text-green-400">

                {message}

              </p>

            </div>

          )}

          {error && (

            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">

              <p className="text-red-400">

                {error}

              </p>

            </div>

          )}

        </div>

      </div>

    </section>

  );

}