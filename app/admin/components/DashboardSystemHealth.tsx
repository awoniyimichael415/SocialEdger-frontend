"use client";

import { useEffect, useState } from "react";

export default function DashboardSystemHealth() {

  const [status, setStatus] = useState({

    backend: false,

    membership: false,

    presale: false,

    rewards: false,

    contributors: false,

    opportunities: false,

  });

  useEffect(() => {

    checkServices();

    const timer = setInterval(

      checkServices,

      30000

    );

    return () => clearInterval(timer);

  }, []);

  async function ping(url: string) {

    try {

      const response = await fetch(url);

      return response.ok;

    } catch {

      return false;

    }

  }

  async function checkServices() {

    const [

      membership,

      presale,

      rewards,

      contributors,

      opportunities,

    ] = await Promise.all([

      ping("https://api.socialedger.io/api/membership/admin/summary"),

      ping("https://api.socialedger.io/api/presale/summary"),

      ping("https://api.socialedger.io/api/rewards/admin/transactions"),

      ping("https://api.socialedger.io/api/contributors"),

      ping("https://api.socialedger.io/api/opportunities"),

    ]);

    setStatus({

      backend:

        membership ||

        presale ||

        rewards,

      membership,

      presale,

      rewards,

      contributors,

      opportunities,

    });

  }

  const services = [

    {

      name: "Backend API",

      online: status.backend,

    },

    {

      name: "Membership Service",

      online: status.membership,

    },

    {

      name: "Presale Service",

      online: status.presale,

    },

    {

      name: "Rewards Service",

      online: status.rewards,

    },

    {

      name: "Contributors Service",

      online: status.contributors,

    },

    {

      name: "Opportunities Service",

      online: status.opportunities,

    },

  ];

  return (

    <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

      <h2 className="text-2xl font-bold mb-8">

        System Health

      </h2>

      <div className="space-y-5">

        {services.map((service) => (

          <div

            key={service.name}

            className="flex items-center justify-between border-b border-white/5 pb-4"

          >

            <span>

              {service.name}

            </span>

            <span

              className={`font-semibold ${
                service.online

                  ? "text-green-400"

                  : "text-red-400"

              }`}

            >

              ●

              {" "}

              {service.online

                ? "Online"

                : "Offline"}

            </span>

          </div>

        ))}

      </div>

    </section>

  );

}
