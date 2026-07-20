"use client";

import { useState } from "react";

export default function WithdrawPanel() {

  const [loading, setLoading] = useState(false);

  const [txHash, setTxHash] = useState("");

  async function withdrawETH() {

    const confirmed = window.confirm(
      "Withdraw all collected ETH from the Presale contract?"
    );

    if (!confirmed) return;

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/presale/withdraw-eth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Withdrawal failed.");
      }

      setTxHash(result.transactionHash || "");

      alert(result.message);

    } catch (error: any) {

      console.error(error);

      alert(error.message || "Withdrawal failed.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <section className="rounded-3xl border border-red-500/20 bg-[#111827] p-8">

      <h2 className="text-3xl font-bold mb-4">

        Treasury Withdrawal

      </h2>

      <p className="text-gray-400 mb-8">

        Withdraw all ETH currently held in the Presale smart contract.
        Only the contract owner can perform this action.

      </p>

      <button
        onClick={withdrawETH}
        disabled={loading}
        className="rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 disabled:opacity-50"
      >
        {loading
          ? "Processing Withdrawal..."
          : "Withdraw ETH"}
      </button>

      {txHash && (

        <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-6">

          <p className="text-green-400 font-semibold mb-2">

            Withdrawal Successful

          </p>

          <p className="text-sm break-all text-gray-300">

            Transaction Hash:

          </p>

          <p className="mt-2 break-all text-cyan-400">

            {txHash}

          </p>

        </div>

      )}

    </section>

  );

}