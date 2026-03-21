"use client";

import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function INFTOAgreementModal({ onAccepted }: any) {

  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const agreementMessage = `
SOCIALEDGER INFTO PARTICIPATION AGREEMENT

By signing this message you acknowledge that you have read
and accepted the SocialEdger INFTO participation agreement.

You understand that this agreement is legally binding
and connected to your wallet address.

Wallet: ${address}

Timestamp: ${new Date().toISOString()}
`;

  const signAgreement = async () => {

    if (!checked) {
      alert("You must accept the agreement.");
      return;
    }

    try {

      setLoading(true);

      const signature = await signMessageAsync({
        message: agreementMessage
      });

      await fetch(`${API}/api/agreement/sign`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          wallet: address,
          signature,
          message: agreementMessage
        })

      });

      onAccepted();

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      <div className="bg-[#0f0f1a] max-w-3xl w-full rounded-xl p-8">

        <h2 className="text-2xl font-bold mb-4">
          SocialEdger INFTO Agreement
        </h2>

        <div className="h-64 overflow-y-scroll text-sm text-gray-300 border border-white/10 p-4 rounded mb-6">

          <p className="mb-4">

            The SocialEdger INFTO Membership NFT grants the holder
            access to the SocialEdger ecosystem including governance,
            reputation scoring, token mining privileges, and ecosystem
            participation.

          </p>

          <p className="mb-4">

            By accepting this agreement you confirm that you understand
            participation in the SocialEdger ecosystem involves digital
            assets, decentralized governance structures, and blockchain
            recorded activity.

          </p>

          <p className="mb-4">

            Your wallet address will be used as your unique identity
            within the SocialEdger ecosystem. All activities including
            token mining, governance participation, and membership
            privileges are permanently associated with your wallet.

          </p>

          <p>

            Signing this agreement generates a cryptographic signature
            that proves your acceptance of the SocialEdger INFTO
            Participation Agreement.

          </p>

        </div>

        <div className="flex items-center gap-3 mb-6">

          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />

          <span>
            I have read and accept the INFTO Agreement
          </span>

        </div>

        <button
          onClick={signAgreement}
          disabled={loading}
          className="btn-primary w-full"
        >

          {loading
            ? "Signing Agreement..."
            : "Sign Agreement"}

        </button>

      </div>

    </div>

  );

}