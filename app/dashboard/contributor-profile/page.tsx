"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function ContributorProfilePage() {

  const { address, isConnected } = useAccount();

  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    displayName: "",
    username: "",
    bio: "",
    country: "",
    category: "",
    skills: "",
    website: "",
    linkedin: "",
    twitter: "",
    profileImage: "",
    membershipType: "Contributor",
    verified: false,
    portfolioLinks: [""],
  });

  useEffect(() => {

    if (!address) return;

    const loadProfile = async () => {

      try {

        const res = await fetch(
          `${API}/api/contributors`
        );

        const contributors =
          await res.json();

        const existing =
          contributors.find(
            (c: any) =>
              c.walletAddress?.toLowerCase() ===
              address.toLowerCase()
          );

        if (existing) {

          setProfileExists(true);

          setForm({
            displayName:
              existing.displayName || "",
            username:
              existing.username || "",
            bio:
              existing.bio || "",
            country:
              existing.country || "",
            category:
              existing.category || "",
            skills:
              existing.skills?.join(", ") || "",
            website:
              existing.website || "",
            linkedin:
              existing.linkedin || "",
            twitter:
              existing.twitter || "",
            profileImage:
              existing.profileImage || "",
            membershipType:
              existing.membershipType ||
              "Contributor",
            verified:
              existing.verified || false,
            portfolioLinks:
              existing.portfolioLinks?.length
                ? existing.portfolioLinks
                : [""],
          });

        }

      } catch (error) {

        console.error(error);

      }

    };

    loadProfile();

  }, [address]);

  const saveProfile = async () => {

    if (!address) return;

    try {

      setLoading(true);

      const payload = {
        walletAddress: address,
        displayName: form.displayName,
        username: form.username,
        bio: form.bio,
        country: form.country,
        category: form.category,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),

        website: form.website,
        linkedin: form.linkedin,
        twitter: form.twitter,
        profileImage:
          form.profileImage,

        portfolioLinks:
          form.portfolioLinks.filter(
            (item) => item.trim() !== ""
          ),
      };

      const allRes =
        await fetch(
          `${API}/api/contributors`
        );

      const all =
        await allRes.json();

      const exists =
        all.find(
          (c: any) =>
            c.walletAddress?.toLowerCase() ===
            address.toLowerCase()
        );

      if (exists) {

        await fetch(
          `${API}/api/contributors/${address}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

      } else {

        await fetch(
          `${API}/api/contributors`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

      }

      setProfileExists(true);
      setEditMode(false);

      alert(
        "Contributor profile saved successfully."
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to save profile."
      );

    } finally {

      setLoading(false);

    }

  };

  const addPortfolioLink = () => {

    setForm({
      ...form,
      portfolioLinks: [
        ...form.portfolioLinks,
        "",
      ],
    });

  };

  const removePortfolioLink = (
    index: number
  ) => {

    const updated =
      [...form.portfolioLinks];

    updated.splice(index, 1);

    setForm({
      ...form,
      portfolioLinks: updated,
    });

  };

  const updatePortfolioLink = (
    index: number,
    value: string
  ) => {

    const updated =
      [...form.portfolioLinks];

    updated[index] = value;

    setForm({
      ...form,
      portfolioLinks: updated,
    });

  };

  if (!isConnected) {

    return (
      <main className="min-h-screen section max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          Contributor Profile
        </h1>

        <div className="glass-card p-6">
          <p className="text-red-400">
            Connect your wallet first.
          </p>
        </div>

      </main>
    );
  }

  const readOnly =
    profileExists && !editMode;

  return (

    <main className="min-h-screen section max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">
        Contributor Profile
      </h1>

      {/* STATUS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-2">
            Profile Status
          </h3>

          <p className="text-green-400">
            {profileExists
              ? "Profile Created"
              : "Not Created"}
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-2">
            Verification
          </h3>

          <p>
            {form.verified
              ? "Verified ✅"
              : "Pending"}
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-2">
            Membership
          </h3>

          <p>
            {form.membershipType}
          </p>
        </div>

      </div>

      {/* WALLET */}
      <div className="glass-card p-6 mb-10">

        <h3 className="font-semibold mb-2">
          Connected Wallet
        </h3>

        <p className="text-purple-400 break-all">
          {address}
        </p>

      </div>

      {/* ACTION BUTTON */}
      {profileExists && !editMode && (

        <div className="mb-6">

          <button
            onClick={() =>
              setEditMode(true)
            }
            className="btn-primary"
          >
            Edit Profile
          </button>

        </div>

      )}

      <div className="glass-card p-8 space-y-6">

        <input
          type="text"
          placeholder="Display Name"
          disabled={readOnly}
          value={form.displayName}
          onChange={(e) =>
            setForm({
              ...form,
              displayName:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <input
          type="text"
          placeholder="Username"
          disabled={profileExists}
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <textarea
          rows={5}
          disabled={readOnly}
          placeholder="Bio"
          value={form.bio}
          onChange={(e) =>
            setForm({
              ...form,
              bio:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <input
          type="text"
          disabled={readOnly}
          placeholder="Country"
          value={form.country}
          onChange={(e) =>
            setForm({
              ...form,
              country:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <select
          disabled={readOnly}
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        >
          <option value="">
            Select Category
          </option>

          <option>
            Developer
          </option>

          <option>
            UI/UX Designer
          </option>

          <option>
            Graphic Designer
          </option>

          <option>
            Writer
          </option>

          <option>
            Content Creator
          </option>

          <option>
            Community Manager
          </option>

          <option>
            Researcher
          </option>

          <option>
            Educator
          </option>

          <option>
            Marketing Specialist
          </option>

          <option>
            Business Development
          </option>

          <option>
            Moderator
          </option>

          <option>
            Project Manager
          </option>

          <option>
            Other
          </option>
        </select>

        <input
          type="text"
          disabled={readOnly}
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={(e) =>
            setForm({
              ...form,
              skills:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <input
          type="text"
          disabled={readOnly}
          placeholder="Website"
          value={form.website}
          onChange={(e) =>
            setForm({
              ...form,
              website:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <input
          type="text"
          disabled={readOnly}
          placeholder="LinkedIn"
          value={form.linkedin}
          onChange={(e) =>
            setForm({
              ...form,
              linkedin:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <input
          type="text"
          disabled={readOnly}
          placeholder="Twitter / X"
          value={form.twitter}
          onChange={(e) =>
            setForm({
              ...form,
              twitter:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        <input
          type="text"
          disabled={readOnly}
          placeholder="Profile Image URL"
          value={form.profileImage}
          onChange={(e) =>
            setForm({
              ...form,
              profileImage:
                e.target.value,
            })
          }
          className="w-full bg-black border border-gray-700 rounded px-4 py-3"
        />

        {/* PORTFOLIO LINKS */}
        <div>

          <h3 className="text-xl font-semibold mb-4">
            Portfolio Links
          </h3>

          <div className="space-y-4">

            {form.portfolioLinks.map(
              (link, index) => (

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <input
                    type="text"
                    disabled={readOnly}
                    placeholder="Portfolio URL"
                    value={link}
                    onChange={(e) =>
                      updatePortfolioLink(
                        index,
                        e.target.value
                      )
                    }
                    className="flex-1 bg-black border border-gray-700 rounded px-4 py-3"
                  />

                  {!readOnly && (
                    <button
                      onClick={() =>
                        removePortfolioLink(
                          index
                        )
                      }
                      className="px-4 bg-red-500 rounded"
                    >
                      X
                    </button>
                  )}

                </div>

              )
            )}

          </div>

          {!readOnly && (
            <button
              onClick={addPortfolioLink}
              className="mt-4 btn-outline"
            >
              Add Portfolio Link
            </button>
          )}

        </div>

        {(!profileExists || editMode) && (

          <button
            onClick={saveProfile}
            disabled={loading}
            className="btn-primary"
          >
            {loading
              ? "Saving..."
              : profileExists
              ? "Save Changes"
              : "Create Profile"}
          </button>

        )}

      </div>

    </main>

  );
}