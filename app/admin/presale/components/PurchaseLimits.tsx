"use client";

import { useEffect, useState } from "react";

export default function PurchaseLimits() {

  const [loading, setLoading] = useState(false);

  const [minimum, setMinimum] = useState("");

  const [maximum, setMaximum] = useState("");

  useEffect(() => {

    loadLimits();

  }, []);

  async function loadLimits() {

    try {

      const response = await fetch(

        "http://localhost:5000/api/presale/summary"

      );

      const data = await response.json();

      setMinimum(
        (Number(data[4]) / 1e18).toString()
      );

      setMaximum(
        (Number(data[5]) / 1e18).toString()
      );

    } catch (error) {

      console.error(error);

    }

  }

  async function saveLimits() {

    try {

      setLoading(true);

      const response = await fetch(

        "http://localhost:5000/api/presale/purchase-limits",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            minimum:
              Number(minimum) * 1e18,

            maximum:
              Number(maximum) * 1e18,

          }),

        }

      );

      const result = await response.json();

      alert(result.message);

    } catch (error) {

      console.error(error);

      alert("Failed to update purchase limits.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <section className="rounded-3xl border border-cyan-500/20 bg-[#111827] p-8">

      <h2 className="text-3xl font-bold mb-8">

        Purchase Limits

      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <label className="block mb-3 text-gray-400">

            Minimum Purchase (ETH)

          </label>

          <input

            type="number"

            value={minimum}

            onChange={(e) =>
              setMinimum(e.target.value)
            }

            className="w-full rounded-xl bg-[#1b2432] p-4"

          />

        </div>

        <div>

          <label className="block mb-3 text-gray-400">

            Maximum Purchase (ETH)

          </label>

          <input

            type="number"

            value={maximum}

            onChange={(e) =>
              setMaximum(e.target.value)
            }

            className="w-full rounded-xl bg-[#1b2432] p-4"

          />

        </div>

      </div>

      <button

        onClick={saveLimits}

        disabled={loading}

        className="mt-8 rounded-xl bg-cyan-600 px-8 py-4 font-semibold disabled:opacity-50"

      >

        {loading

          ? "Updating..."

          : "Update Purchase Limits"}

      </button>

    </section>

  );

}