"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

export default function CreateProposal() {
  const { address } = useAccount();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Governance");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!address) {
      alert("Please connect your wallet.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await DAOApi.createProposal(
        address,
        {
          title,
          category,
          description,
        }
      );

      alert(
        response.message ||
          "Proposal submitted successfully."
      );

      setTitle("");
      setCategory("Governance");
      setDescription("");
    } catch (error: any) {
      alert(
        error.message ||
          "Unable to submit proposal."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Create New Proposal
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Proposal Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter proposal title"
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 outline-none"
          >
            <option value="Governance">
              Governance
            </option>

            <option value="Membership">
              Membership
            </option>

            <option value="Rewards">
              Rewards
            </option>

            <option value="Treasury">
              Treasury
            </option>

            <option value="Protocol Upgrade">
              Protocol Upgrade
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Proposal Description
          </label>

          <textarea
            rows={8}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Describe your proposal..."
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 p-3 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting
            ? "Submitting..."
            : "Submit Proposal"}
        </button>
      </form>
    </div>
  );
}