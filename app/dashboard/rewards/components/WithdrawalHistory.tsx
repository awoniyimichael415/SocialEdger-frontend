"use client";

interface Withdrawal {
  _id: string;
  amount: number;
  token: string;
  status: string;
  transactionHash?: string;
  createdAt: string;
}

interface Props {
  withdrawals: Withdrawal[];
}

export default function WithdrawalHistory({
  withdrawals,
}: Props) {

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Withdrawal History
          </h2>

          <p className="text-gray-400 mt-2">
            Track all your SET withdrawal requests and their approval status.
          </p>

        </div>

        <span className="text-5xl">
          💸
        </span>

      </div>

      {withdrawals?.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">

          <p className="text-gray-400 text-lg">
            No withdrawal requests yet.
          </p>

          <p className="text-gray-500 mt-3">
            Your withdrawal requests will appear here.
          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="text-left py-4">
                  Amount
                </th>

                <th className="text-left py-4">
                  Token
                </th>

                <th className="text-center py-4">
                  Status
                </th>

                <th className="text-center py-4">
                  Transaction
                </th>

                <th className="text-right py-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {withdrawals.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-white/5 hover:bg-white/5"
                >

                  <td className="py-5 font-semibold">

                    {Number(item.amount).toLocaleString()}

                  </td>

                  <td>

                    {item.token}

                  </td>

                  <td className="text-center">

                    <StatusBadge
                      status={item.status}
                    />

                  </td>

                  <td className="text-center text-sm text-gray-400 break-all">

                    {item.transactionHash
                      ? `${item.transactionHash.slice(0, 12)}...`
                      : "-"}

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

function StatusBadge({
  status,
}: {
  status: string;
}) {

  const styles = {

    Pending:
      "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",

    Approved:
      "bg-blue-500/10 border-blue-500/20 text-blue-400",

    Rejected:
      "bg-red-500/10 border-red-500/20 text-red-400",

    Completed:
      "bg-green-500/10 border-green-500/20 text-green-400",

  } as Record<string, string>;

  return (

    <span
      className={`px-3 py-1 rounded-full border text-sm ${
        styles[status] ||
        "bg-gray-500/10 border-gray-500/20 text-gray-300"
      }`}
    >

      {status}

    </span>

  );

}