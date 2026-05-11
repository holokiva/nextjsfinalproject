export default function TasksLoading() {
  return (
    <main className="tm-page flex flex-col gap-6">
      <div className="h-9 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-11 w-full max-w-xs animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800 sm:w-40" />
      <div className="grid gap-3 md:hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-zinc-200/80 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
      <div className="hidden h-48 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800 md:block" />
    </main>
  );
}
