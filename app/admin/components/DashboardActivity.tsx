"use client";

import { useEffect, useState } from "react";

type ActivityItem = {
  title: string;
  time: string;
  type: string;
};

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function DashboardActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();

    const timer = setInterval(loadActivities, 30000);

    return () => clearInterval(timer);
  }, []);

  async function loadActivities() {
    try {
      const [
        contributorRes,
        rewardRes,
        opportunityRes,
      ] = await Promise.all([
        fetch(`${API}/api/contributors`, {
          cache: "no-store",
        }),
        fetch(`${API}/api/rewards/admin/transactions`, {
          cache: "no-store",
        }),
        fetch(`${API}/api/opportunities`, {
          cache: "no-store",
        }),
      ]);

      const contributors = contributorRes.ok
        ? await contributorRes.json()
        : [];

      const rewards = rewardRes.ok
        ? await rewardRes.json()
        : [];

      const opportunities = opportunityRes.ok
        ? await opportunityRes.json()
        : [];

      const feed: ActivityItem[] = [];

      contributors
        ?.slice(0, 3)
        .forEach((item: any) => {
          feed.push({
            title: `${item.displayName} joined the contributor network`,
            time: "Recently",
            type: "Contributor",
          });
        });

      rewards
        ?.slice(0, 3)
        .forEach((item: any) => {
          feed.push({
            title: `Reward distributed (${item.type || "Reward"})`,
            time: "Recently",
            type: "Reward",
          });
        });

      opportunities
        ?.slice(0, 3)
        .forEach((item: any) => {
          feed.push({
            title: `Opportunity published: ${item.title}`,
            time: "Recently",
            type: "Opportunity",
          });
        });

      setActivities(feed);
    } catch (error) {
      console.error(
        "Failed to load dashboard activity:",
        error
      );
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
      <h2 className="mb-8 text-2xl font-bold">
        Live Ecosystem Activity
      </h2>

      {loading ? (
        <p className="text-gray-400">
          Loading activity...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-gray-400">
          No recent activity available.
        </p>
      ) : (
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex gap-4 border-b border-white/5 pb-5"
            >
              <div className="mt-2 h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />

              <div className="flex-1">
                <p className="font-medium">
                  {activity.title}
                </p>

                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>{activity.type}</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
