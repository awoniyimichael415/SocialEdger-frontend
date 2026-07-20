"use client";

interface NFT {

  tokenId: number;

  owner: string;

  membershipType: string;

  sharedMembers: number;

  status: string;

  mintedAt?: string;

}

interface Props {

  nfts: NFT[];

  onSelect: (nft: NFT) => void;

}

export default function MintedNFTs({

  nfts,

  onSelect,

}: Props) {

  if (nfts.length === 0) {

    return (

      <section className="glass-card p-10 mb-10 text-center">

        <div className="text-7xl mb-6">

          🎟️

        </div>

        <h2 className="text-2xl font-bold">

          No Minted NFTs

        </h2>

        <p className="text-gray-400 mt-4">

          Membership NFTs will appear here once they have been minted.

        </p>

      </section>

    );

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Minted Membership NFTs

          </h2>

          <p className="text-gray-400 mt-2">

            Browse every membership NFT minted within the SocialEdger ecosystem.

          </p>

        </div>

        <span className="text-5xl">

          🖼️

        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="text-left py-4">

                NFT ID

              </th>

              <th className="text-left">

                Owner

              </th>

              <th className="text-center">

                Membership

              </th>

              <th className="text-center">

                Shared Members

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

            {nfts.map((nft) => (

              <tr

                key={nft.tokenId}

                className="border-b border-white/5 hover:bg-white/5 transition"

              >

                <td className="py-5 font-semibold">

                  #{nft.tokenId}

                </td>

                <td>

                  <span className="break-all">

                    {nft.owner}

                  </span>

                </td>

                <td className="text-center">

                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">

                    {nft.membershipType}

                  </span>

                </td>

                <td className="text-center">

                  {nft.sharedMembers}

                </td>

                <td className="text-center">

                  <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">

                    {nft.status}

                  </span>

                </td>

                <td className="text-right">

                  <button

                    onClick={() => onSelect(nft)}

                    className="btn-primary"

                  >

                    View

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );

}