"use client";

import { useState } from "react";

export default function ParticipantTable() {

  const [wallet, setWallet] = useState("");

  const [participant, setParticipant] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  async function searchParticipant() {

    if (!wallet) {

      alert("Enter a wallet address.");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(

        `http://localhost:5000/api/presale/participant/${wallet}`

      );

      const data = await response.json();

      setParticipant(data);

    } catch (error) {

      console.error(error);

      alert("Unable to fetch participant information.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <section className="rounded-3xl border border-cyan-500/20 bg-[#111827] p-8">

      <h2 className="text-3xl font-bold mb-8">

        Participant Lookup

      </h2>

      <div className="flex flex-col md:flex-row gap-4">

        <input

          type="text"

          placeholder="Wallet Address"

          value={wallet}

          onChange={(e) =>
            setWallet(e.target.value)
          }

          className="flex-1 rounded-xl bg-[#1b2432] p-4"

        />

        <button

          onClick={searchParticipant}

          disabled={loading}

          className="rounded-xl bg-cyan-600 px-8 py-4 font-semibold disabled:opacity-50"

        >

          {loading

            ? "Searching..."

            : "Search"}

        </button>

      </div>

      {participant && (

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">

          <table className="w-full">

            <thead className="bg-[#1b2432]">

              <tr>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  ETH Purchased
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t border-white/10">

                <td className="p-4">

                  {participant[0]
                    ? "Participated"
                    : "Not Participated"}

                </td>

                <td className="p-4">

                  {(
                    Number(participant[1]) /
                    1e18
                  ).toLocaleString()} ETH

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      )}

    </section>

  );

}