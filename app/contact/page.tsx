export default function ContactPage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold">Contact SocialEdger</h1>
        <p className="hero-sub text-gray-300 mt-6">
          Questions about membership, reputation, or the ecosystem?
          Our team is here to assist.
        </p>
      </section>

      {/* CONTACT FORM */}
      <section className="section max-w-4xl mx-auto">
        <div className="glass-card p-10">

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            />
          </div>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            />
          </div>

          <div className="mt-6">
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            ></textarea>
          </div>

          <div className="mt-8 text-center">
            <button className="btn-primary px-12">Send Message</button>
          </div>
        </div>
      </section>

      {/* INFO BLOCKS */}
      <section className="section max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <p className="text-gray-400">Assistance with platform usage</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Partnerships</h3>
          <p className="text-gray-400">Ecosystem collaborations</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">General Inquiries</h3>
          <p className="text-gray-400">Platform information & questions</p>
        </div>
      </section>

    </main>
  );
}
