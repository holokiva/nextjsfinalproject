export default function TasksLoading() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-10">
      <div className="h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </main>
  );
}
