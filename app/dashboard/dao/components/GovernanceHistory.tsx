"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

interface GovernanceActivity {
  _id: string;
  type: "Proposal" | "Vote";
  title: string;
  action: string;
  status: string;
  createdAt: string;
}

export default function GovernanceHistory() {
  const { address } = useAccount();

  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<GovernanceActivity[]>([]);

  useEffect(() => {
    if (!address) return;

    const loadHistory = async () => {
      try {
        const response = await DAOApi.governanceHistory(address);

        setActivities(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [address]);

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        Loading governance history...
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
        <h2 className="text-2xl font-bold">
          No Governance Activity
        </h2>

        <p className="mt-3 text-gray-400">
          Your proposal submissions and voting history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900">
      <div className="border-b border-neutral-800 p-6">
        <h2 className="text-2xl font-bold">
          Governance History
        </h2>

        <p className="mt-2 text-gray-400">
          Review your DAO participation and governance activity.
        </p>
      </div>

      <div className="divide-y divide-neutral-800">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {activity.type} • {activity.action}
              </p>
            </div>

            <div className="text-right">
              <span className="rounded-lg bg-indigo-600 px-3 py-1 text-sm font-medium text-white">
                {activity.status}
              </span>

              <p className="mt-2 text-sm text-gray-500">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}