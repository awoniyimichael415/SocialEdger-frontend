"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

type KYC = {
  _id: string;
  wallet: string;
  idType: string;
  idNumber: string;
  verificationType: string;
  status: string;
};

export default function AdminKYC() {
  const [data, setData] = useState<KYC[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/admin/kyc`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API}/api/admin/kyc/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen section max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">
        Admin KYC Dashboard
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="glass-card p-6 overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="p-3">Wallet</th>
                <th className="p-3">ID Type</th>
                <th className="p-3">ID Number</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-800"
                >

                  <td className="p-3 text-sm">
                    {item.wallet}
                  </td>

                  <td className="p-3 capitalize">
                    {item.idType.replace("_", " ")}
                  </td>

                  <td className="p-3">
                    {item.idNumber}
                  </td>

                  <td className="p-3">
                    {item.verificationType}
                  </td>

                  <td className="p-3">

                    <span
                      className={
                        item.status === "approved"
                          ? "text-green-400"
                          : item.status === "rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        updateStatus(item._id, "approved")
                      }
                      className="px-3 py-1 bg-green-600 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(item._id, "rejected")
                      }
                      className="px-3 py-1 bg-red-600 rounded"
                    >
                      Reject
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </main>
  );
}