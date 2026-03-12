"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function DashboardHome() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <main className="min-h-screen section max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">Member Dashboard</h1>

      {/* Wallet Section */}
      <div className="glass-card p-6 mb-10">
        <h2 className="text-xl font-semibold mb-3">Wallet Connection</h2>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            className="btn-primary"
          >
            Connect MetaMask
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-300">
              Connected Wallet:
            </p>
            <p className="text-purple-400 font-mono break-all">
              {address}
            </p>

            <button
              onClick={() => disconnect()}
              className="btn-primary"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Vault Navigation */}
      <div className="grid md:grid-cols-2 gap-10">

        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-3">Primary Vault</h2>
          <p className="text-gray-300 mb-6">
            Manage NFT membership ownership, wallet identity,
            and full ecosystem access.
          </p>
          <Link
            href="/dashboard/primary-vault"
            className="btn-primary inline-block"
          >
            Open Vault
          </Link>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-3">Secondary Vault</h2>
          <p className="text-gray-300 mb-6">
            Access shared membership privileges linked to
            a primary NFT owner.
          </p>
          <Link
            href="/dashboard/secondary-vault"
            className="btn-primary inline-block"
          >
            Access Vault
          </Link>
        </div>

      </div>
    </main>
  );
}
