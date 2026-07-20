"use client";

import { useState } from "react";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface NFT {

  tokenId: number;

  owner: string;

  membershipType: string;

}

interface Props {

  nft: NFT | null;

  onRefresh?: () => void;

}

export default function MembershipActions({

  nft,

  onRefresh,

}: Props) {

  const [sharedWallet, setSharedWallet] =
    useState("");

  const [metadataURI, setMetadataURI] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!nft) {

    return (

      <section className="glass-card p-8 mb-10">

        <h2 className="text-2xl font-bold">

          Membership Actions

        </h2>

        <p className="text-gray-400 mt-4">

          Select a Membership NFT to manage it.

        </p>

      </section>

    );

  }

  async function executeAction(

    endpoint: string,

    body: any = {}

  ) {

    try {

      setLoading(true);

      const res = await fetch(

        `${API}${endpoint}`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify(body),

        }

      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(

          data.error ||

          "Action failed."

        );

      }

      onRefresh?.();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Membership Actions

          </h2>

          <p className="text-gray-400 mt-2">

            Manage Membership NFT #{nft.tokenId}

          </p>

        </div>

        <span className="text-5xl">

          ⚙️

        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <button

          disabled={loading}

          onClick={() =>

            executeAction(

              "/api/membership/mint",

              {

                tokenId:
                  nft.tokenId,

              }

            )

          }

          className="btn-primary"

        >

          Mint Membership NFT

        </button>

        <button

          disabled

          className="btn-primary opacity-60"

        >

          Lock Membership
          (Coming Soon)

        </button>

        <button

          disabled

          className="btn-primary opacity-60"

        >

          Unlock Membership
          (Coming Soon)

        </button>

        <button

          disabled

          className="btn-primary opacity-60"

        >

          View Contract
          (Coming Soon)

        </button>

      </div>

      <div className="mt-10">

        <h3 className="text-xl font-semibold mb-4">

          Add Shared Member

        </h3>

        <div className="flex gap-4">

          <input

            value={sharedWallet}

            onChange={(e) =>

              setSharedWallet(
                e.target.value
              )

            }

            placeholder="Wallet Address"

            className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3"

          />

          <button

            disabled={loading}

            onClick={() =>

              executeAction(

                "/api/membership/shared/add",

                {

                  tokenId:
                    nft.tokenId,

                  wallet:
                    sharedWallet,

                }

              )

            }

            className="btn-primary"

          >

            Add

          </button>

        </div>

      </div>

      <div className="mt-10">

        <h3 className="text-xl font-semibold mb-4">

          Update Metadata URI

        </h3>

        <div className="flex gap-4">

          <input

            value={metadataURI}

            onChange={(e) =>

              setMetadataURI(
                e.target.value
              )

            }

            placeholder="New Metadata URI"

            className="flex-1 rounded-xl border border-white/10 bg-black/40 px-4 py-3"

          />

          <button

            disabled={loading}

            onClick={() =>

              executeAction(

                "/api/membership/metadata",

                {

                  tokenId:
                    nft.tokenId,

                  metadataURI,

                }

              )

            }

            className="btn-primary"

          >

            Update

          </button>

        </div>

      </div>

    </section>

  );

}