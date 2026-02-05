export default function PrimaryVault() {
  return (
    <main className="min-h-screen section max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">Primary Membership Vault</h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Membership NFT</h3>
          <p className="text-gray-400">NFT ID: #0001</p>
          <p className="text-gray-400">Ownership Status: Primary</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Reputation Score</h3>
          <p className="text-3xl font-bold text-purple-400">842</p>
        </div>

        <div className="glass-card p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Ecosystem Access</h3>
          <p className="text-gray-400">
            Access to presale, contributor system, and platform utilities.
          </p>
        </div>

      </div>
    </main>
  );
}
