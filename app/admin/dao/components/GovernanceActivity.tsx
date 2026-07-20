"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

interface Activity {
  _id: string;
  action: string;
  description: string;
  createdAt: string;
}

export default function GovernanceActivity() {
  const { address } = useAccount();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const loadActivities = async () => {
      try {
        const response = await DAOApi.activity(address);
        setActivities(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [address]);

  if (loading) {
    return (
      <div className="rounded-xl border p-6">
        Loading governance activity...
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="rounded-xl border p-6">
        No governance activity found.
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Governance Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {activity.action}
              </h3>

              <span className="text-sm text-gray-500">
                {new Date(activity.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="mt-2 text-gray-600">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}