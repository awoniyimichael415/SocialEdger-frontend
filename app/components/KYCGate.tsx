"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function KYCGate() {

  const { address, isConnected } = useAccount();
  const router = useRouter();

  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!isConnected || !address) return;

    const checkKYC = async () => {

      try {

        setLoading(true);

        const res = await fetch(
          `${API}/api/kyc/status/${address}`
        );

        const data = await res.json();

        if (
          data.status === "approved" ||
          data.status === "pending"
        ) {
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }

      } catch (err) {

        console.error("KYC check failed:", err);
        setShowBanner(true);

      } finally {

        setLoading(false);

      }

    };

    checkKYC();

  }, [address, isConnected]);

  if (!showBanner) return null;

  return (

    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-6 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <p className="font-semibold">

          Complete your KYC verification to continue using the platform.

        </p>

        <button
          onClick={() => router.push("/kyc")}
          className="bg-white text-black px-4 py-2 rounded"
        >
          Continue with KYC
        </button>

      </div>

    </div>

  );

}