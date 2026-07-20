"use client";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface Withdrawal {
  _id: string;
  walletAddress: string;
  amount: number;
  token: string;
  status: string;
  createdAt: string;
}

interface Props {
  withdrawals: Withdrawal[];
  onRefresh?: () => void;
}

export default function WithdrawalRequests({
  withdrawals,
  onRefresh,
}: Props) {

  async function approve(id: string) {

    try {

      await fetch(

        `${API}/api/rewards/withdrawals/${id}/approve`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            admin: "Administrator",

          }),

        }

      );

      onRefresh?.();

    } catch (error) {

      console.error(error);

    }

  }

  async function reject(id: string) {

    try {

      await fetch(

        `${API}/api/rewards/withdrawals/${id}/reject`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            admin: "Administrator",

            note: "Rejected by administrator.",

          }),

        }

      );

      onRefresh?.();

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Withdrawal Requests

          </h2>

          <p className="text-gray-400 mt-2">

            Review and process contributor withdrawal requests.

          </p>

        </div>

        <span className="text-5xl">

          💳

        </span>

      </div>

      {withdrawals.length === 0 ? (

        <div className="text-center py-12 text-gray-400">

          No withdrawal requests found.

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

                  Amount

                </th>

                <th className="text-left py-4">

                  Status

                </th>

                <th className="text-right py-4">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {withdrawals.map((item) => (

                <tr
                  key={item._id}
                  className="border-b border-white/5"
                >

                  <td className="py-5 break-all">

                    {item.walletAddress}

                  </td>

                  <td>

                    {item.amount} {item.token}

                  </td>

                  <td>

                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">

                      {item.status}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-end gap-3">

                      {item.status ===
                      "Pending" && (

                        <>

                          <button
                            onClick={() =>
                              approve(item._id)
                            }
                            className="btn-primary"
                          >

                            Approve

                          </button>

                          <button
                            onClick={() =>
                              reject(item._id)
                            }
                            className="px-5 py-2 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition"
                          >

                            Reject

                          </button>

                        </>

                      )}

                    </div>

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