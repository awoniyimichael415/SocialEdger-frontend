import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          SocialEdger Documentation
        </h1>
        <p className="hero-sub text-gray-300 mt-6 max-w-3xl mx-auto">
          Transparency and structure power the SocialEdger ecosystem.
        </p>
      </section>

      <section className="section max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* TOKENOMICS */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-3">Tokenomics</h2>
          <p className="text-gray-300 mb-6">
            Token supply, allocation, presale structure, and ecosystem utility.
          </p>
          <Link href="/docs/tokenomics">
            <button className="btn-outline">Learn More</button>
          </Link>
        </div>

        {/* REPUTATION */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-3">Proof of Reputation</h2>
          <p className="text-gray-300 mb-6">
            Reputation-based ranking system replacing traditional gatekeeping.
          </p>
          <Link href="/reputation">
            <button className="btn-outline">Learn More</button>
          </Link>
        </div>

        {/* MEMBERSHIP */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-3">Membership System</h2>
          <p className="text-gray-300 mb-6">
            NFT membership, shared membership, and vault structure.
          </p>
          <Link href="/membership">
            <button className="btn-outline">Learn More</button>
          </Link>
        </div>

        {/* ROADMAP */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-3">Roadmap</h2>
          <p className="text-gray-300 mb-6">
            Development phases and ecosystem expansion.
          </p>
          <Link href="/docs/roadmap">
            <button className="btn-outline">Learn More</button>
          </Link>
        </div>

        {/* INFTO */}
        <div className="glass-card p-8 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-3">INFTO Agreement</h2>
          <p className="text-gray-300 mb-6">
            Participation agreement and ecosystem terms.
          </p>
          <Link href="/docs/infto">
            <button className="btn-outline">Learn More</button>
          </Link>
        </div>

      </section>
    </main>
  );
}
