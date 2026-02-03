export default function SharedMembershipPage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          Shared NFT Membership
        </h1>
        <p className="hero-sub text-gray-300 mt-6 max-w-3xl mx-auto">
          SocialEdger introduces collaborative membership — one NFT,
          two participants, and dual vault access designed for shared growth.
        </p>
      </section>

      {/* CONCEPT EXPLAINER */}
      <section className="section max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">How Shared Membership Works</h2>
          <ul className="space-y-4 text-gray-300">
            <li>• One NFT is minted as the membership identity</li>
            <li>• NFT is owned by a primary wallet</li>
            <li>• A secondary member is securely linked</li>
            <li>• Both members access separate vault dashboards</li>
            <li>• Reputation grows for both participants</li>
          </ul>
        </div>

        <div className="glass-card h-72 md:h-96 flex items-center justify-center">
          <span className="text-gray-400">Shared Membership Diagram</span>
        </div>
      </section>

      {/* DUAL VAULT SECTION */}
      <section className="section max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Dual Membership Vaults
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-4">Primary Vault</h3>
            <p className="text-gray-300">
              Controlled by the NFT owner. Handles membership authority,
              platform actions, and vault privileges.
            </p>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-4">Secondary Vault</h3>
            <p className="text-gray-300">
              Linked access for the second member. Gains platform benefits,
              participation rights, and reputation growth.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Why Shared Membership?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Collaborative Growth",
            "Dual Reputation Building",
            "Cost Sharing Opportunity",
            "Stronger Network Participation",
          ].map((item) => (
            <div key={item} className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Build Together. Grow Together.
        </h2>
        <p className="text-gray-400 mb-10">
          Shared membership unlocks collaborative access to the SocialEdger ecosystem.
        </p>
        <button className="btn-primary">Get Shared Membership</button>
      </section>

    </main>
  );
}
