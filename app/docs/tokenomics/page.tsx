export default function TokenomicsPage() {
  return (
    <main className="min-h-screen">

      <section className="section text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold">Tokenomics</h1>
        <p className="hero-sub text-gray-300 mt-6">
          The SocialEdger token fuels participation, reputation mechanics,
          and long-term ecosystem growth.
        </p>
      </section>

      <section className="section max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Token Utility</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Membership & platform access</li>
            <li>• Reputation-driven incentives</li>
            <li>• Ecosystem participation</li>
            <li>• Future governance integration</li>
          </ul>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Token Allocation</h2>
          <ul className="space-y-2 text-gray-300">
            <li>• Presale Distribution</li>
            <li>• Ecosystem Rewards Pool</li>
            <li>• Development & Growth</li>
            <li>• Community Incentives</li>
          </ul>
        </div>

        <div className="glass-card p-8 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Ecosystem Flow</h2>
          <p className="text-gray-300">
            Tokens circulate through membership participation, contributor activity,
            and reputation-based engagement, forming a sustainable value loop
            within SocialEdger.
          </p>
        </div>
      </section>
    </main>
  );
}
