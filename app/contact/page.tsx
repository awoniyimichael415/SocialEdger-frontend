export default function ContactPage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="section text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Contact SocialEdger
        </h1>

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
            <button className="btn-primary px-12">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="section max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-6">
          Connect With SocialEdger
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-14">
          Reach out to the SocialEdger community through our
          official social platforms for announcements,
          partnerships, support, ecosystem discussions,
          and community engagement.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/social.edger_official?igsh=dG1yOHF0YjhsMTEx"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-8 hover:scale-105 transition block"
          >

            <div className="text-5xl mb-5">
              📸
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Instagram
            </h3>

            <p className="text-gray-400">
              Follow SocialEdger updates, ecosystem news,
              visual announcements, and community highlights.
            </p>

          </a>

          {/* FACEBOOK */}
          <a
            href="https://www.facebook.com/share/1BCWyq4WvP/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-8 hover:scale-105 transition block"
          >

            <div className="text-5xl mb-5">
              🌐
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Facebook
            </h3>

            <p className="text-gray-400">
              Join the wider SocialEdger community discussions,
              ecosystem engagement, and future platform updates.
            </p>

          </a>

          {/* DISCORD */}
          <a
            href="https://discord.gg/Sk7KRRGf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-8 hover:scale-105 transition block"
          >

            <div className="text-5xl mb-5">
              💬
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Discord
            </h3>

            <p className="text-gray-400">
              Connect directly with contributors,
              builders, moderators, and the SocialEdger ecosystem community.
            </p>

          </a>

        </div>

      </section>

      {/* INFO BLOCKS */}
      <section className="section max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">
            Support
          </h3>

          <p className="text-gray-400">
            Assistance with platform usage
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">
            Partnerships
          </h3>

          <p className="text-gray-400">
            Ecosystem collaborations
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">
            General Inquiries
          </h3>

          <p className="text-gray-400">
            Platform information & questions
          </p>
        </div>

      </section>

    </main>
  );
}