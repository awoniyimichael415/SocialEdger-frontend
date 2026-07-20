"use client";

interface Transaction {
  _id: string;
  walletAddress: string;
  token: string;
  amount: number;
  type: string;
  description: string;
  status: string;
  createdAt: string;
}

interface Props {
  transactions: Transaction[];
}

export default function RewardTransactions({
  transactions,
}: Props) {

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Reward Transactions
          </h2>

          <p className="text-gray-400 mt-2">
            Complete history of all rewards distributed across the platform.
          </p>

        </div>

        <span className="text-5xl">
          📋
        </span>

      </div>

      {transactions.length === 0 ? (

        <div className="text-center py-12 text-gray-400">

          No reward transactions found.

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="text-left py-4">
                  Wallet
                </th>

                <th className="text-left py-4">
                  Token
                </th>

                <th className="text-left py-4">
                  Type
                </th>

                <th className="text-left py-4">
                  Amount
                </th>

                <th className="text-left py-4">
                  Status
                </th>

                <th className="text-right py-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-white/5 hover:bg-white/5"
                >

                  <td className="py-5">

                    <div>

                      <p className="font-semibold break-all">

                        {item.walletAddress}

                      </p>

                      <p className="text-xs text-gray-500">

                        {item.description}

                      </p>

                    </div>

                  </td>

                  <td>

                    <span className="font-semibold">

                      {item.token}

                    </span>

                  </td>

                  <td>

                    {item.type}

                  </td>

                  <td className="font-bold text-green-400">

                    +{item.amount}

                  </td>

                  <td>

                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">

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