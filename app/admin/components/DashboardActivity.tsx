"use client";

import { useEffect, useState } from "react";

export default function DashboardActivity() {

  const [activities, setActivities] = useState<any[]>([]);

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

        fetch("http://localhost:5000/api/contributors"),

        fetch("http://localhost:5000/api/rewards/admin/transactions"),

        fetch("http://localhost:5000/api/opportunities"),

      ]);

      const contributors = await contributorRes.json();

      const rewards = await rewardRes.json();

      const opportunities = await opportunityRes.json();

      const feed = [];

      contributors
        ?.slice(0, 3)
        .forEach((item: any) => {

          feed.push({

            title:
              `${item.fullName || item.name} joined as a contributor`,

            time: "Recently",

            type: "Contributor",

          });

        });

      rewards
        ?.slice(0, 3)
        .forEach((item: any) => {

          feed.push({

            title:
              `Reward distributed (${item.type})`,

            time: "Recently",

            type: "Reward",

          });

        });

      opportunities
        ?.slice(0, 3)
        .forEach((item: any) => {

          feed.push({

            title:
              `Opportunity published: ${item.title}`,

            time: "Recently",

            type: "Opportunity",

          });

        });

      setActivities(feed);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

      <h2 className="text-2xl font-bold mb-8">

        Live Ecosystem Activity

      </h2>

      <div className="space-y-6">

        {activities.length === 0 ? (

          <p className="text-gray-400">

            No recent activity available.

          </p>

        ) : (

          activities.map((activity, index) => (

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

                  <span>

                    {activity.type}

                  </span>

                  <span>

                    {activity.time}

                  </span>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );

}