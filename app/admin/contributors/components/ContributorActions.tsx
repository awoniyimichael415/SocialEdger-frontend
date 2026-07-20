"use client";

const API =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface Contributor {
  _id: string;
  displayName: string;
  walletAddress: string;
  verified?: boolean;
}

interface Props {
  contributor: Contributor | null;
  onRefresh?: () => void;
}

export default function ContributorActions({
  contributor,
  onRefresh,
}: Props) {

  if (!contributor) {

    return (

      <section className="glass-card p-8 mb-10">

        <h2 className="text-2xl font-bold">

          Contributor Actions

        </h2>

        <p className="text-gray-400 mt-4">

          Select a contributor to access administrative actions.

        </p>

      </section>

    );

  }

  async function executeAction(
    action: string
  ) {

    try {

      let body: any = {};

      if (action === "suspend") {

        body.reason =
          "Suspended by Administrator";

      }

      const res = await fetch(

        `${API}/api/contributors/id/${contributor._id}/${action}`,

        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify(body),

        }

      );

      const data =
        await res.json();

      if (!res.ok) {

        throw new Error(

          data.error ||
          "Action failed."

        );

      }

      onRefresh?.();

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <section className="glass-card p-8 mb-10">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Contributor Actions

          </h2>

          <p className="text-gray-400 mt-2">

            Administrative controls for the selected contributor.

          </p>

        </div>

        <span className="text-5xl">

          🛠️

        </span>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        <button
          onClick={() =>
            executeAction("verify")
          }
          className="btn-primary"
        >

          ✅ Verify Contributor

        </button>

        <button
          onClick={() =>
            executeAction("suspend")
          }
          className="btn-primary"
        >

          ⏸ Suspend Account

        </button>

        <button
          onClick={() =>
            executeAction("activate")
          }
          className="btn-primary"
        >

          🔓 Activate Account

        </button>

        <button
          onClick={() =>
            executeAction("reset-reputation")
          }
          className="btn-primary"
        >

          ⭐ Reset Reputation

        </button>

        <button
          className="btn-primary"

          disabled
        >

          💰 Reward History
          <span className="ml-2 text-xs opacity-70">
            (Coming Soon)
          </span>

        </button>

        <button
          className="btn-primary"

          disabled
        >

          📂 Opportunities
          <span className="ml-2 text-xs opacity-70">
            (Coming Soon)
          </span>

        </button>

      </div>

    </section>

  );

}