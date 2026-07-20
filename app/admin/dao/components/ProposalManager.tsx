"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

export default function ProposalManager() {
  const { address } = useAccount();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Governance");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
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
          description,
          category,
        }
      );

      alert(response.message || "Proposal created successfully.");

      setTitle("");
      setDescription("");
      setCategory("Governance");
    } catch (error: any) {
      alert(error.message || "Unable to create proposal.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Create Proposal
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
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
            className="w-full rounded-lg border p-3"
            placeholder="Enter proposal title"
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
            className="w-full rounded-lg border p-3"
          >
            <option>Governance</option>
            <option>Treasury</option>
            <option>Membership</option>
            <option>Rewards</option>
            <option>Protocol Upgrade</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-lg border p-3"
            placeholder="Describe your proposal..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
        >
          {submitting
            ? "Submitting..."
            : "Submit Proposal"}
        </button>
      </form>
    </div>
  );
}