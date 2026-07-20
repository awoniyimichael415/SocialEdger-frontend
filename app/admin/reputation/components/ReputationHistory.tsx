type HistoryItem = {
  title: string;
  reputation: number;
};

type Props = {
  history: HistoryItem[];
};

export default function ReputationHistory({
  history,
}: Props) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 px-5 py-4">
        <h3 className="text-lg font-semibold text-white">
          Reputation History
        </h3>
      </div>

      <div className="divide-y divide-zinc-800">
        {history.length === 0 ? (
          <div className="px-5 py-10 text-center text-zinc-500">
            No reputation history available.
          </div>
        ) : (
          history.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="font-medium text-white">
                  {item.title}
                </p>
              </div>

              <span className="rounded-lg bg-blue-600/20 px-3 py-1 text-sm font-semibold text-blue-300">
                +{item.reputation}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}