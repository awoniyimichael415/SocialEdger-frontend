"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { DAOApi } from "@/src/lib/daoApi";

interface TreasuryData {
  totalFunds: number;
  allocatedFunds: number;
  availableFunds: number;
  totalExpenses: number;
}

export default function TreasuryOverview() {
  const { address } = useAccount();

  const [treasury, setTreasury] = useState<TreasuryData>({
    totalFunds: 0,
    allocatedFunds: 0,
    availableFunds: 0,
    totalExpenses: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const loadTreasury = async () => {
      try {
        const response = await DAOApi.treasury(address);
        setTreasury(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTreasury();
  }, [address]);

  if (loading) {
    return (
      <div className="rounded-xl border p-6">
        Loading Treasury...
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Treasury Overview
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div>
          <p className="text-sm text-gray-500">
            Total Funds
          </p>
          <p className="mt-2 text-2xl font-bold">
            ${treasury.totalFunds.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Allocated
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            ${treasury.allocatedFunds.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Available
          </p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            ${treasury.availableFunds.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Total Expenses
          </p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            ${treasury.totalExpenses.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}