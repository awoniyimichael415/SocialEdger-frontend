"use client";

import { useState } from "react";

export default function PhaseManager() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    phaseId: "",

    name: "",

    rate: "",

    startTime: "",

    endTime: "",

  });

  async function createPhase() {

    try {

      setLoading(true);

      const response = await fetch(

        "http://localhost:5000/api/presale/create-phase",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            phaseId: Number(form.phaseId),

            name: form.name,

            rate: Number(form.rate),

            startTime: Math.floor(
              new Date(form.startTime).getTime() / 1000
            ),

            endTime: Math.floor(
              new Date(form.endTime).getTime() / 1000
            ),

          }),

        }

      );

      const data = await response.json();

      alert(data.message);

    } catch (err) {

      console.error(err);

      alert("Failed to create phase.");

    } finally {

      setLoading(false);

    }

  }

  async function activatePhase() {

    try {

      setLoading(true);

      const response = await fetch(

        "http://localhost:5000/api/presale/activate-phase",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            phaseId: Number(form.phaseId),

          }),

        }

      );

      const data = await response.json();

      alert(data.message);

    } catch (err) {

      console.error(err);

      alert("Failed to activate phase.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <section className="rounded-3xl border border-cyan-500/20 bg-[#111827] p-8">

      <h2 className="text-3xl font-bold mb-8">

        Phase Manager

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="number"
          placeholder="Phase ID"
          className="rounded-xl bg-[#1b2432] p-4"
          value={form.phaseId}
          onChange={(e) =>
            setForm({
              ...form,
              phaseId: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Phase Name"
          className="rounded-xl bg-[#1b2432] p-4"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Rate (SET per ETH)"
          className="rounded-xl bg-[#1b2432] p-4"
          value={form.rate}
          onChange={(e) =>
            setForm({
              ...form,
              rate: e.target.value,
            })
          }
        />

        <input
          type="datetime-local"
          className="rounded-xl bg-[#1b2432] p-4"
          value={form.startTime}
          onChange={(e) =>
            setForm({
              ...form,
              startTime: e.target.value,
            })
          }
        />

        <input
          type="datetime-local"
          className="rounded-xl bg-[#1b2432] p-4"
          value={form.endTime}
          onChange={(e) =>
            setForm({
              ...form,
              endTime: e.target.value,
            })
          }
        />

      </div>

      <div className="flex gap-6 mt-8">

        <button
          onClick={createPhase}
          disabled={loading}
          className="rounded-xl bg-cyan-600 px-8 py-4 font-semibold"
        >
          Create Phase
        </button>

        <button
          onClick={activatePhase}
          disabled={loading}
          className="rounded-xl bg-purple-600 px-8 py-4 font-semibold"
        >
          Activate Phase
        </button>

      </div>

    </section>

  );

}