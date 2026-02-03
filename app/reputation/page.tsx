export default function ReputationPage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          Proof of Reputation
        </h1>
        <p className="hero-sub text-gray-300 mt-6 max-w-3xl mx-auto">
          SocialEdger replaces traditional gatekeeping with a reputation-based
          system where participation, contribution, and engagement define growth.
        </p>
      </section>

      {/* WHAT IT IS */}
      <section className="section max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6">What is Proof of Reputation?</h2>
          <p className="text-gray-300">
            Proof of Reputation measures the value each participant brings into
            the SocialEdger ecosystem. Instead of exclusive access lists,
            members earn visibility and opportunity through verified activity.
          </p>
        </div>

        <div className="glass-card h-72 md:h-96 flex items-center justify-center">
          <span className="text-gray-400">Reputation System Diagram</span>
        </div>
      </section>

      {/* HOW REPUTATION GROWS */}
      <section className="section max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">
          How Reputation Grows
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Profile Completion",
            "Membership Ownership",
            "Shared Participation",
            "Contributor Activity",
            "Platform Engagement",
            "Community Interaction",
            "Consistency Over Time",
            "Verified Contributions",
          ].map((item) => (
            <div key={item} className="glass-card p-6 text-center">
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="section max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="glass-card p-8">
          <h3 className="text-2xl font-semibold mb-4">Why It Matters</h3>
          <p className="text-gray-300">
            Reputation influences contributor ranking, profile visibility,
            platform opportunities, and future reward mechanisms within
            SocialEdger’s ecosystem.
          </p>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-2xl font-semibold mb-4">Built From Day One</h3>
          <p className="text-gray-300">
            Unlike traditional systems where reputation starts after launch,
            SocialEdger integrates Proof of Reputation from inception,
            ensuring fairness and equal opportunity globally.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Start Building Your Reputation
        </h2>
        <p className="text-gray-400 mb-10">
          Every interaction within SocialEdger contributes to your digital trust score.
        </p>
        <button className="btn-primary">Join the Ecosystem</button>
      </section>

    </main>
  );
}
