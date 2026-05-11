import { auth } from "@/auth";

export default async function TasksPage() {
  const session = await auth();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Signed in as{" "}
        <span className="font-medium text-zinc-800 dark:text-zinc-200">
          {session?.user?.email}
        </span>
      </p>
      <p className="text-zinc-600 dark:text-zinc-400">
        Placeholder page. Task list and forms will be added later.
      </p>
    </main>
  );
}
