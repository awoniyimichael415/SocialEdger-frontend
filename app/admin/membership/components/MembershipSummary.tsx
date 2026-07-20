"use client";

interface Props {

  totalSupply?: number;

  mintedNFTs?: number;

  availableNFTs?: number;

  primaryMembers?: number;

  secondaryMembers?: number;

  sharedMemberships?: number;

}

export default function MembershipSummary({

  totalSupply = 20000,

  mintedNFTs = 0,

  availableNFTs = 20000,

  primaryMembers = 0,

  secondaryMembers = 0,

  sharedMemberships = 0,

}: Props) {

  const cards = [

    {
      title: "Total NFT Supply",
      value: totalSupply,
      icon: "🖼️",
      color: "text-cyan-400",
    },

    {
      title: "Minted NFTs",
      value: mintedNFTs,
      icon: "🎟️",
      color: "text-green-400",
    },

    {
      title: "Available NFTs",
      value: availableNFTs,
      icon: "📦",
      color: "text-yellow-400",
    },

    {
      title: "Primary Members",
      value: primaryMembers,
      icon: "👑",
      color: "text-purple-400",
    },

    {
      title: "Secondary Members",
      value: secondaryMembers,
      icon: "🤝",
      color: "text-blue-400",
    },

    {
      title: "Shared Memberships",
      value: sharedMemberships,
      icon: "🔗",
      color: "text-pink-400",
    },

  ];

  return (

    <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

      {cards.map((card) => (

        <div
          key={card.title}
          className="glass-card p-6"
        >

          <div className="flex justify-between items-center">

            <span className="text-5xl">
              {card.icon}
            </span>

            <span className={`text-3xl font-bold ${card.color}`}>
              {card.value.toLocaleString()}
            </span>

          </div>

          <h3 className="mt-6 text-lg font-semibold">
            {card.title}
          </h3>

        </div>

      ))}

    </section>

  );

}