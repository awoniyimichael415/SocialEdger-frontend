"use client";

interface Props {
  history: any[];
}

export default function RewardHistory({
  history,
}: Props) {

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Reward History
          </h2>

          <p className="text-gray-400 mt-2">
            View every reward earned across the SocialEdger ecosystem.
          </p>

        </div>

        <span className="text-5xl">
          📜
        </span>

      </div>

      {history?.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

          <p className="text-gray-400 text-lg">

            No reward transactions yet.

          </p>

          <p className="text-gray-500 mt-3">

            Complete opportunities and participate in the ecosystem to start earning rewards.

          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="text-left py-4">
                  Token
                </th>

                <th className="text-left py-4">
                  Type
                </th>

                <th className="text-left py-4">
                  Description
                </th>

                <th className="text-center py-4">
                  Amount
                </th>

                <th className="text-center py-4">
                  Status
                </th>

                <th className="text-right py-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {history.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >

                  <td className="py-5 font-semibold">

                    {item.token}

                  </td>

                  <td>

                    {item.type}

                  </td>

                  <td className="text-gray-400">

                    {item.description || "-"}

                  </td>

                  <td className="text-center font-bold text-green-400">

                    +{Number(item.amount).toLocaleString()}

                  </td>

                  <td className="text-center">

                    <span className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-green-400 text-sm">

                      {item.status}

                    </span>

                  </td>

                  <td className="text-right text-gray-500">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </section>

  );

}