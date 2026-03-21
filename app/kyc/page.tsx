"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function KYCPage() {
  const { address, isConnected } = useAccount();

  const [verificationType, setVerificationType] =
    useState("KYC");

  const [idType, setIdType] = useState("passport");
  const [idNumber, setIdNumber] = useState("");

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // Check verification status
  useEffect(() => {
    if (!address) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `${API}/api/kyc/status/${address}`
        );

        const data = await res.json();

        if (data.status) {
          setStatus(data.status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkStatus();
  }, [address]);

  const submitKYC = async () => {
    if (!isConnected) {
      setMessage("Connect wallet first.");
      return;
    }

    if (!idNumber) {
      setMessage("Enter ID number.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        `${API}/api/kyc/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wallet: address,
            idNumber,
            idType,
            verificationType,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Submission failed");
        return;
      }

      setStatus("pending");
      setMessage(
        "Verification submitted successfully."
      );
    } catch (err) {
      console.error(err);
      setMessage("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen section max-w-3xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">
        KYC / KYB Verification
      </h1>

      {!isConnected && (
        <div className="glass-card p-6 mb-6">
          <p className="text-red-400">
            Connect wallet to start verification.
          </p>
        </div>
      )}

      {status && (
        <div className="glass-card p-6 mb-6">

          <p className="text-gray-400 mb-2">
            Verification Status
          </p>

          <p className="text-xl font-semibold text-purple-400">
            {status.toUpperCase()}
          </p>

        </div>
      )}

      <div className="glass-card p-8 space-y-6">

        {/* Wallet */}
        <div>
          <label className="text-gray-400 text-sm">
            Wallet Address
          </label>

          <div className="mt-1 bg-black border border-gray-700 rounded px-4 py-2">
            {address || "Not connected"}
          </div>
        </div>

        {/* Verification Type */}
        <div>
          <label className="text-gray-400 text-sm">
            Verification Type
          </label>

          <select
            value={verificationType}
            onChange={(e) =>
              setVerificationType(e.target.value)
            }
            className="w-full mt-1 bg-black border border-gray-700 rounded px-4 py-2"
          >
            <option value="KYC">
              Individual (KYC)
            </option>

            <option value="KYB">
              Business (KYB)
            </option>
          </select>
        </div>

        {/* ID Type */}
        <div>
          <label className="text-gray-400 text-sm">
            ID Type
          </label>

          <select
            value={idType}
            onChange={(e) =>
              setIdType(e.target.value)
            }
            className="w-full mt-1 bg-black border border-gray-700 rounded px-4 py-2"
          >
            <option value="passport">
              Passport
            </option>

            <option value="national_id">
              National ID
            </option>

            <option value="driver_license">
              Driver License
            </option>

            <option value="business_registration">
              Business Registration
            </option>
          </select>
        </div>

        {/* ID Number */}
        <div>
          <label className="text-gray-400 text-sm">
            ID Number
          </label>

          <input
            type="text"
            value={idNumber}
            onChange={(e) =>
              setIdNumber(e.target.value)
            }
            placeholder="Enter ID number"
            className="w-full mt-1 bg-black border border-gray-700 rounded px-4 py-2"
          />
        </div>

        {/* Message */}
        {message && (
          <p className="text-yellow-400">
            {message}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={submitKYC}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading
            ? "Submitting..."
            : "Submit Verification"}
        </button>

      </div>

    </main>
  );
}