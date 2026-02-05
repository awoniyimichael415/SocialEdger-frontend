import Link from "next/link";

export default function DashboardHome() {
  return (
    <main className="min-h-screen section max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">Member Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-3">Primary Vault</h2>
          <p className="text-gray-300 mb-6">
            Manage NFT membership ownership, wallet identity,
            and full ecosystem access.
          </p>
          <Link href="/dashboard/primary-vault" className="btn-primary inline-block">
            Open Vault
          </Link>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-3">Secondary Vault</h2>
          <p className="text-gray-300 mb-6">
            Access shared membership privileges linked to
            a primary NFT owner.
          </p>
          <Link href="/dashboard/secondary-vault" className="btn-primary inline-block">
            Access Vault
          </Link>
        </div>

      </div>
    </main>
  );
}
