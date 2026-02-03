export default function RoadmapPage() {
  return (
    <main className="min-h-screen">

      <section className="section text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold">Platform Roadmap</h1>
        <p className="hero-sub text-gray-300 mt-6">
          SocialEdger evolves through structured development phases.
        </p>
      </section>

      <section className="section max-w-6xl mx-auto space-y-8">

        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold mb-3">Phase 1 — Foundation</h2>
          <p className="text-gray-300">
            NFT membership system, shared membership model,
            Proof of Reputation integration, and token presale launch.
          </p>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold mb-3">Phase 2 — Expansion</h2>
          <p className="text-gray-300">
            Contributor marketplace, mining logic integration,
            enhanced ranking mechanisms, and ecosystem scaling.
          </p>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold mb-3">Phase 3 — Governance</h2>
          <p className="text-gray-300">
            Community governance systems, token utility expansion,
            and cross-platform integrations.
          </p>
        </div>

      </section>
    </main>
  );
}
