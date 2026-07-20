export default function LoadingState() {
  return (
    <div className="space-y-6 animate-pulse">

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-2xl bg-zinc-900"
          />
        ))}
      </div>

      <div className="h-96 rounded-2xl bg-zinc-900" />

      <div className="h-[600px] rounded-2xl bg-zinc-900" />

    </div>
  );
}