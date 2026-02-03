import Link from "next/link";

export default function MembershipPage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          NFT-Powered Membership
        </h1>
        <p className="hero-sub text-gray-300 mt-6 max-w-3xl mx-auto">
          Each SocialEdger membership is secured by a unique NFT,
          granting access to platform privileges, contributor visibility,
          and reputation growth inside the ecosystem.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="section max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Membership Benefits
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "On-Chain Membership Identity",
            "Reputation Score Boost",
            "Access to Member Vault",
            "Early Ecosystem Opportunities",
          ].map((item) => (
            <div key={item} className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <ul className="space-y-4 text-gray-300">
            <li>• Purchase or mint a SocialEdger Membership NFT</li>
            <li>• NFT links to your membership vault</li>
            <li>• Your participation builds Proof of Reputation</li>
            <li>• Membership unlocks ecosystem features</li>
          </ul>
        </div>

        <div className="glass-card h-72 md:h-96 flex items-center justify-center">
          <span className="text-gray-400">NFT Visual Preview</span>
        </div>
      </section>

      {/* MEMBERSHIP STRUCTURE */}
      <section className="section max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Membership Structure
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-4">Single Membership</h3>
            <p className="text-gray-300">
              A membership NFT linked to one primary wallet,
              giving full platform access and personal vault control.
            </p>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-4">Shared Membership</h3>
            <p className="text-gray-300 mb-6">
              One NFT, two linked members. Both access separate vault
              dashboards while ownership remains clearly defined.
            </p>

            {/* LEARN MORE BUTTON ADDED */}
            <Link href="/shared-membership">
              <button className="btn-outline">Learn More</button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Secure Your Membership
        </h2>
        <p className="text-gray-400 mb-10">
          Become part of a reputation-driven Web3 ecosystem designed for growth.
        </p>
        <button className="btn-primary">Get Membership</button>
      </section>

    </main>
  );
}
