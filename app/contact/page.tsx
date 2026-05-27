"use client";

import { useState } from "react";

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = () => {

    if (
      !form.name ||
      !form.email ||
      !form.subject ||
      !form.message
    ) {
      alert("Please fill all fields.");
      return;
    }

    const body = `
Full Name: ${form.name}

Email Address: ${form.email}

Message:
${form.message}
    `;

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=SocialEdger_Official@socialedger.io&su=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

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
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            />

          </div>

          <div className="mt-6">

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject: e.target.value,
                })
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            />

          </div>

          <div className="mt-6">

            <textarea
              placeholder="Your Message"
              rows={6}
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white"
            ></textarea>

          </div>

          <div className="mt-8 text-center">

            <button
              onClick={handleSubmit}
              className="btn-primary px-12"
            >
              Send Message
            </button>

          </div>

          {/* BUSINESS EMAIL */}
          <div className="mt-10 text-center border-t border-white/10 pt-8">

            <p className="text-gray-400 mb-3">
              Prefer direct communication?
            </p>

            <a
              href="mailto:SocialEdger_Official@socialedger.io"
              className="text-cyan-400 hover:text-cyan-300 transition text-lg font-semibold break-all"
            >
              SocialEdger_Official@socialedger.io
            </a>

            <p className="text-gray-500 text-sm mt-3">
              Contact us for partnerships, membership inquiries,
              support, collaborations, or ecosystem opportunities.
            </p>

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
