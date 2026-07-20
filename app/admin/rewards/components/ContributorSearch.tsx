"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface Contributor {
  _id: string;
  displayName: string;
  username: string;
  walletAddress: string;
  profileImage?: string;
  category?: string;
}

interface Props {
  onSelect: (contributor: Contributor) => void;
}

export default function ContributorSearch({
  onSelect,
}: Props) {

  const [contributors, setContributors] =
    useState<Contributor[]>([]);

  const [filtered, setFiltered] =
    useState<Contributor[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadContributors();

  }, []);

  useEffect(() => {

    if (!search) {

      setFiltered(contributors);

      return;

    }

    const keyword =
      search.toLowerCase();

    setFiltered(

      contributors.filter((c) =>

        c.displayName
          ?.toLowerCase()
          .includes(keyword) ||

        c.username
          ?.toLowerCase()
          .includes(keyword) ||

        c.walletAddress
          ?.toLowerCase()
          .includes(keyword)

      )

    );

  }, [search, contributors]);

  async function loadContributors() {

    try {

      const res = await fetch(

        `${API}/api/contributors`

      );

      const data =
        await res.json();

      setContributors(data);

      setFiltered(data);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">

            Contributor Search

          </h2>

          <p className="text-gray-400 mt-2">

            Search contributors and select one to distribute rewards.

          </p>

        </div>

        <span className="text-5xl">

          🔍

        </span>

      </div>

      <input

        type="text"

        placeholder="Search by display name, username or wallet..."

        value={search}

        onChange={(e) =>
          setSearch(e.target.value)
        }

        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 mb-8"

      />

      <div className="space-y-4 max-h-[450px] overflow-y-auto">

        {filtered.length === 0 ? (

          <div className="text-center text-gray-400 py-10">

            No contributors found.

          </div>

        ) : (

          filtered.map((item) => (

            <div

              key={item._id}

              onClick={() =>
                onSelect(item)
              }

              className="flex justify-between items-center rounded-2xl border border-white/10 bg-white/5 p-5 cursor-pointer hover:border-cyan-400 transition"

            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-xl font-bold">

                  {item.displayName
                    ?.charAt(0)
                    ?.toUpperCase() || "C"}

                </div>

                <div>

                  <h3 className="font-semibold">

                    {item.displayName}

                  </h3>

                  <p className="text-sm text-gray-400">

                    @{item.username}

                  </p>

                  <p className="text-xs text-gray-500 break-all">

                    {item.walletAddress}

                  </p>

                </div>

              </div>

              <button className="btn-primary">

                Select

              </button>

            </div>

          ))

        )}

      </div>

    </section>

  );

}