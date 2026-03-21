"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useEffect, useState } from "react";

const API =
process.env.NEXT_PUBLIC_BACKEND_URL ||
"http://localhost:5000";

export default function DashboardHome() {

const { address, isConnected } = useAccount();
const { connect } = useConnect();
const { disconnect } = useDisconnect();

const [agreementExists, setAgreementExists] = useState(false);
const [checkingAgreement, setCheckingAgreement] = useState(false);

useEffect(() => {

if (!address) return;

const checkAgreement = async () => {

try {

setCheckingAgreement(true);

const res = await fetch(
  `${API}/api/agreement/check/${address}`
);

const data = await res.json();

setAgreementExists(data.exists);

} catch (err) {

console.error("Agreement check failed:", err);

} finally {

setCheckingAgreement(false);

}

};

checkAgreement();

}, [address]);

return (

<main className="min-h-screen section max-w-6xl mx-auto">  <h1 className="text-4xl font-bold mb-6">
    Member Dashboard
  </h1>{/* Wallet Section */}

  <div className="glass-card p-6 mb-10"><h2 className="text-xl font-semibold mb-3">
  Wallet Connection
</h2>

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

  </div>{/* INFTO Agreement */}
{isConnected && (

<div className="glass-card p-6 mb-10">

  <h2 className="text-xl font-semibold mb-3">
    INFTO Agreement
  </h2>

  {checkingAgreement ? (

    <p className="text-gray-400">
      Checking agreement status...
    </p>

  ) : agreementExists ? (

    <div className="space-y-4">

      <p className="text-green-400">
        Agreement Signed ✅
      </p>

      <a
        href={`${API}/api/agreement/download/${address}`}
        target="_blank"
        className="btn-primary inline-block"
      >
        Download INFTO Agreement
      </a>

    </div>

  ) : (

    <p className="text-yellow-400">
      You have not signed the INFTO agreement yet.
      This will be required when minting your membership NFT.
    </p>

  )}

</div>

)}

{/* Vault Navigation */}

  <div className="grid md:grid-cols-2 gap-10 mb-10"><div className="glass-card p-8">

  <h2 className="text-2xl font-semibold mb-3">
    Primary Vault
  </h2>

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

  <h2 className="text-2xl font-semibold mb-3">
    Secondary Vault
  </h2>

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

  </div>{/* Mining Section */}
{isConnected && (

<div className="glass-card p-8">

  <h2 className="text-2xl font-semibold mb-3">
    Token Mining
  </h2>

  <p className="text-gray-300 mb-6">
    Mine SocialEdger tokens using your wallet.
    Membership NFT holders receive increased mining power.
  </p>

  <ul className="text-gray-400 mb-6 list-disc list-inside">

    <li>Primary Member: 5× Mining Power</li>
    <li>Secondary Member: 2× Mining Power</li>
    <li>Standard User: 1× Mining Power</li>

  </ul>

  <Link
    href="/dashboard/mining"
    className="btn-primary inline-block"
  >
    Open Mining Panel
  </Link>

</div>

)}

</main>);

}