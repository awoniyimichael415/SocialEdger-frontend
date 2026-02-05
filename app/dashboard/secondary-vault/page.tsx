export default function SecondaryVault() {
  return (
    <main className="min-h-screen section max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">Secondary Membership Vault</h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Linked Membership</h3>
          <p className="text-gray-400">NFT ID: #0001</p>
          <p className="text-gray-400">Status: Shared Access</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-2">Participation Reputation</h3>
          <p className="text-3xl font-bold text-purple-400">317</p>
        </div>

        <div className="glass-card p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Access Level</h3>
          <p className="text-gray-400">
            Access provided through shared membership agreement.
          </p>
        </div>

      </div>
    </main>
  );
}
