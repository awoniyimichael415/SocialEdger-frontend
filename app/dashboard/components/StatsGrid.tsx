"use client";

interface Contributor {
  totalCompleted?: number;
  activeOpportunities?: unknown[];
  totalApplications?: number;
  totalApproved?: number;
  totalRejected?: number;
  followers?: number;
  endorsements?: number;
  portfolioProjects?: unknown[];
  totalHiveEarned?: number;
  totalSetEarned?: number;
  totalDaoCratEarned?: number;
}

interface Props {
  contributor?: Contributor | null;
}

export default function StatsGrid({
  contributor,
}: Props) {

  const approvalRate =
    contributor &&
    (contributor.totalApplications || 0) > 0
      ? Math.round(
          ((contributor.totalApproved || 0) /
            (contributor.totalApplications || 1)) *
            100
        )
      : 0;

  const totalRewards =
    (contributor?.totalHiveEarned || 0) +
    (contributor?.totalSetEarned || 0) +
    (contributor?.totalDaoCratEarned || 0);

  const stats = [
    {
      title: "Completed Opportunities",
      value: contributor?.totalCompleted || 0,
      icon: "✅",
      color: "text-green-400",
    },
    {
      title: "Active Opportunities",
      value:
        contributor?.activeOpportunities?.length || 0,
      icon: "🚀",
      color: "text-cyan-400",
    },
    {
      title: "Applications",
      value:
        contributor?.totalApplications || 0,
      icon: "📄",
      color: "text-purple-400",
    },
    {
      title: "Approval Rate",
      value: `${approvalRate}%`,
      icon: "📈",
      color: "text-yellow-400",
    },
    {
      title: "Followers",
      value: contributor?.followers || 0,
      icon: "👥",
      color: "text-pink-400",
    },
    {
      title: "Endorsements",
      value:
        contributor?.endorsements || 0,
      icon: "❤️",
      color: "text-red-400",
    },
    {
      title: "Portfolio Projects",
      value:
        contributor?.portfolioProjects?.length || 0,
      icon: "💼",
      color: "text-indigo-400",
    },
    {
      title: "Total Rewards",
      value: totalRewards,
      icon: "💰",
      color: "text-emerald-400",
    },
  ];

  return (

    <section className="glass-card p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Contributor Statistics
          </h2>

          <p className="text-gray-400 mt-2">
            Your ecosystem performance at a glance.
          </p>

        </div>

        <span className="text-5xl">
          📊
        </span>

      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-cyan-500/40 transition"
          >

            <div className="flex justify-between items-center mb-5">

              <span className="text-3xl">
                {item.icon}
              </span>

              <span className={`${item.color} text-2xl font-bold`}>
                {item.value}
              </span>

            </div>

            <h3 className="text-sm text-gray-400 leading-6">
              {item.title}
            </h3>

          </div>

        ))}

      </div>

    </section>

  );

}