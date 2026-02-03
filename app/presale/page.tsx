export default function PresalePage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          SocialEdger Token Presale
        </h1>
        <p className="hero-sub text-gray-300 mt-6 max-w-3xl mx-auto">
          Participate in the early growth of the SocialEdger ecosystem and
          support a reputation-driven Web3 platform built for global inclusion.
        </p>
      </section>

      {/* PRESALE CARD */}
      <section className="section max-w-4xl mx-auto">
        <div className="glass-card p-10 text-center">
          <h2 className="text-2xl font-semibold mb-6">Presale Participation</h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <p className="text-gray-400">Token Price</p>
              <p className="text-xl font-semibold">0.00X ETH</p>
            </div>

            <div>
              <p className="text-gray-400">Presale Allocation</p>
              <p className="text-xl font-semibold">XX%</p>
            </div>

            <div>
              <p className="text-gray-400">Accepted Currency</p>
              <p className="text-xl font-semibold">ETH / Stablecoin</p>
            </div>

            <div>
              <p className="text-gray-400">Presale Phase</p>
              <p className="text-xl font-semibold">Phase 1</p>
            </div>
          </div>

          <div className="mt-10">
            <button className="btn-primary w-full md:w-auto px-12">
              Connect Wallet to Participate
            </button>
          </div>
        </div>
      </section>

      {/* WHY PARTICIPATE */}
      <section className="section max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Why Participate in Presale?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Early Ecosystem Access",
            "Support Reputation Infrastructure",
            "Community Growth Participation",
            "Future Platform Governance",
          ].map((item) => (
            <div key={item} className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="section text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Transparent & Secure</h2>
        <p className="text-gray-400">
          Smart contracts will govern token distribution, ensuring transparency,
          fairness, and security for all participants.
        </p>
      </section>

    </main>
  );
}
