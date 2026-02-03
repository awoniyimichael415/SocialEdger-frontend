export default function ContributorsPage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          Skill Contributors Network
        </h1>
        <p className="hero-sub text-gray-300 mt-6 max-w-3xl mx-auto">
          Discover skilled participants building their reputation through
          verified contributions, portfolio visibility, and ecosystem engagement.
        </p>
      </section>

      {/* FILTER / SEARCH UI (visual only) */}
      <section className="section max-w-6xl mx-auto">
        <div className="glass-card p-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search contributors..."
            className="w-full md:w-1/2 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
          />
          <select className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white">
            <option>Sort by Reputation</option>
            <option>Newest</option>
            <option>Most Active</option>
          </select>
        </div>
      </section>

      {/* CONTRIBUTORS GRID */}
      <section className="section max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Top Contributors
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="glass-card p-6">
              <div className="h-32 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-1">Contributor Name</h3>
              <p className="text-gray-400 text-sm mb-3">Skill Category</p>
              <div className="text-sm text-gray-300 mb-2">
                Reputation Score: <span className="text-white font-semibold">###</span>
              </div>
              <button className="btn-outline w-full">View Portfolio</button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="section text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Reputation-Driven Visibility
        </h2>
        <p className="text-gray-400">
          Contributors are ranked based on verified participation and activity,
          ensuring fair exposure and opportunity across the SocialEdger ecosystem.
        </p>
      </section>

    </main>
  );
}
