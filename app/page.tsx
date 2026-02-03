export default function Home() {
  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24">

      {/* HERO SECTION */}
      <section className="py-24 text-center md:text-left max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">
          Where Reputation <br className="hidden sm:block"/> Meets Opportunity
        </h1>

        <p className="mt-6 text-[24px] text-gray-300 max-w-2xl mx-auto md:mx-0">
          SocialEdger is a Web3 ecosystem where contributors, members,
          and communities grow through verified reputation,
          NFT-powered memberships, and inclusive participation.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition">
            Explore Membership
          </button>
          <button className="px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition">
            Join Presale
          </button>
        </div>
      </section>

      {/* WHAT IS SOCIALEDGER */}
      <section className="py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl bg-white/5 backdrop-blur-lg p-8 border border-white/10">
          <h2 className="text-3xl font-semibold mb-4">What is SocialEdger?</h2>
          <p className="text-gray-300">
            SocialEdger connects diverse participants into a reputation-driven
            digital network. Our Proof of Reputation model replaces traditional
            gatekeeping, ensuring opportunity is earned through participation
            and contribution.
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 h-72 md:h-96"></div>
      </section>

      {/* FEATURES */}
      <section className="py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Platform Foundations
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "NFT-Based Membership",
            "Shared Membership System",
            "Proof of Reputation",
            "Token Presale",
            "Contributor Portfolios",
            "Dual Membership Vaults"
          ].map((item) => (
            <div key={item} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <h3 className="text-xl font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Join the SocialEdger Ecosystem</h2>
        <p className="text-gray-400 mb-10">
          Participate, contribute, and grow your digital reputation from day one.
        </p>
        <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition">
          Get Started
        </button>
      </section>

    </main>
  );
}
