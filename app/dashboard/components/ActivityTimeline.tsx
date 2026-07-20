"use client";

interface HistoryItem {
  title: string;
  reputation: number;
  type: string;
  createdAt?: string;
}

interface Props {
  history?: HistoryItem[];
}

export default function ActivityTimeline({
  history = [],
}: Props) {

  return (

    <section className="glass-card p-8 h-full">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Reputation Activity
          </h2>

          <p className="text-gray-400 mt-2">
            Your latest reputation changes across the SocialEdger ecosystem.
          </p>

        </div>

        <span className="text-5xl">
          📜
        </span>

      </div>

      {history.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">

          <p className="text-gray-400">
            No reputation activity yet.
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Start participating in the ecosystem to earn reputation.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {history.map((item, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-5"
            >

              <div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">

                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Recently"}

                </p>

              </div>

              <div
                className={`text-xl font-bold ${
                  item.reputation >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >

                {item.reputation >= 0 ? "+" : ""}
                {item.reputation}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}