"use client";

interface NFT {

  tokenId: number;

  owner: string;

  membershipType: string;

  metadataURI?: string;

  transactionHash?: string;

  sharedMembers?: string[];

  mintedAt?: string;

  royalty?: string;

  status?: string;

}

interface Props {

  nft: NFT | null;

}

export default function NFTDetails({

  nft,

}: Props) {

  if (!nft) {

    return (

      <section className="glass-card p-10 mb-10 text-center">

        <div className="text-7xl mb-6">

          🖼️

        </div>

        <h2 className="text-2xl font-bold">

          No NFT Selected

        </h2>

        <p className="text-gray-400 mt-4">

          Select a membership NFT to view its complete information.

        </p>

      </section>

    );

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold">

            Membership NFT #{nft.tokenId}

          </h2>

          <p className="text-gray-400 mt-2">

            Detailed blockchain and membership information.

          </p>

        </div>

        <span className="text-6xl">

          🎟️

        </span>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <InfoCard
          title="Owner Wallet"
          value={nft.owner}
        />

        <InfoCard
          title="Membership Type"
          value={nft.membershipType}
        />

        <InfoCard
          title="Status"
          value={nft.status || "Active"}
        />

        <InfoCard
          title="Royalty"
          value={nft.royalty || "10%"}
        />

        <InfoCard
          title="Mint Date"
          value={
            nft.mintedAt
              ? new Date(
                  nft.mintedAt
                ).toLocaleString()
              : "-"
          }
        />

        <InfoCard
          title="Metadata URI"
          value={
            nft.metadataURI ||
            "Not Available"
          }
        />

      </div>

      <div className="mt-10">

        <h3 className="text-xl font-semibold mb-4">

          Shared Members

        </h3>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          {nft.sharedMembers &&
          nft.sharedMembers.length > 0 ? (

            <div className="space-y-3">

              {nft.sharedMembers.map(

                (member) => (

                  <div

                    key={member}

                    className="rounded-xl bg-black/30 p-3 break-all"

                  >

                    {member}

                  </div>

                )

              )}

            </div>

          ) : (

            <p className="text-gray-400">

              No shared members assigned.

            </p>

          )}

        </div>

      </div>

      <div className="mt-10">

        <h3 className="text-xl font-semibold mb-4">

          Blockchain Transaction

        </h3>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          <p className="break-all text-cyan-400">

            {nft.transactionHash ||

              "Transaction hash not available."}

          </p>

        </div>

      </div>

    </section>

  );

}

function InfoCard({

  title,

  value,

}: {

  title: string;

  value: string;

}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <p className="text-sm text-gray-400">

        {title}

      </p>

      <h3 className="mt-3 font-semibold break-all">

        {value}

      </h3>

    </div>

  );

}