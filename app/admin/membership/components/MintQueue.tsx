"use client";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface MintRequest {

  _id: string;

  walletAddress: string;

  tokenId: number;

  agreementSigned: boolean;

  paymentStatus: string;

  queueStatus: string;

  requestedAt?: string;

}

interface Props {

  requests: MintRequest[];

  onRefresh?: () => void;

}

export default function MintQueue({

  requests,

  onRefresh,

}: Props) {

  async function updateStatus(

    id: string,

    action: "approve" | "reject"

  ) {

    try {

      const res = await fetch(

        `${API}/api/membership/queue/${id}/${action}`,

        {

          method: "PUT",

        }

      );

      if (!res.ok) {

        throw new Error("Failed to update queue.");

      }

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

            Membership Mint Queue

          </h2>

          <p className="text-gray-400 mt-2">

            Review pending membership mint requests before blockchain minting.

          </p>

        </div>

        <span className="text-5xl">

          ⏳

        </span>

      </div>

      {requests.length === 0 ? (

        <div className="text-center py-12 text-gray-400">

          No pending mint requests.

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="text-left py-4">

                  Wallet

                </th>

                <th className="text-center">

                  NFT ID

                </th>

                <th className="text-center">

                  Agreement

                </th>

                <th className="text-center">

                  Payment

                </th>

                <th className="text-center">

                  Status

                </th>

                <th className="text-right">

                  Action

                </th>

              </tr>

            </thead>

            <tbody>

              {requests.map((item) => (

                <tr

                  key={item._id}

                  className="border-b border-white/5 hover:bg-white/5"

                >

                  <td className="py-5 break-all">

                    {item.walletAddress}

                  </td>

                  <td className="text-center">

                    #{item.tokenId}

                  </td>

                  <td className="text-center">

                    {item.agreementSigned ? (

                      <span className="text-green-400">

                        ✅ Signed

                      </span>

                    ) : (

                      <span className="text-red-400">

                        ❌ Pending

                      </span>

                    )}

                  </td>

                  <td className="text-center">

                    {item.paymentStatus}

                  </td>

                  <td className="text-center">

                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">

                      {item.queueStatus}

                    </span>

                  </td>

                  <td>

                    <div className="flex justify-end gap-3">

                      <button

                        onClick={() =>

                          updateStatus(

                            item._id,

                            "approve"

                          )

                        }

                        className="btn-primary"

                      >

                        Approve

                      </button>

                      <button

                        onClick={() =>

                          updateStatus(

                            item._id,

                            "reject"

                          )

                        }

                        className="px-5 py-2 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition"

                      >

                        Reject

                      </button>

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