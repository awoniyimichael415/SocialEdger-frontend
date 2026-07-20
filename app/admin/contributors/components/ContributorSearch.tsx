"use client";

import { useState } from "react";

interface Props {

  onSearch: (keyword: string) => void;

}

export default function ContributorSearch({

  onSearch,

}: Props) {

  const [keyword, setKeyword] =
    useState("");

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold">

            Contributor Search

          </h2>

          <p className="text-gray-400 mt-2">

            Search contributors by display name, username, wallet, country or category.

          </p>

        </div>

        <span className="text-5xl">

          🔎

        </span>

      </div>

      <div className="grid lg:grid-cols-4 gap-4">

        <div className="lg:col-span-3">

          <input

            type="text"

            value={keyword}

            onChange={(e) => {

              setKeyword(e.target.value);

              onSearch(e.target.value);

            }}

            placeholder="Search contributors..."

            className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4"

          />

        </div>

        <button

          onClick={() => onSearch(keyword)}

          className="btn-primary"

        >

          Search

        </button>

      </div>

    </section>

  );

}