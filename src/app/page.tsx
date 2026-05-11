import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="tm-page flex flex-col gap-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Task Manager</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          A simple place to organize tasks: set priority, track status, and add due dates. Sign in
          to manage your own list—each task stays private to your account.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {session?.user ? (
            <Link href="/tasks" className="tm-btn-primary w-full sm:w-auto">
              Go to tasks
            </Link>
          ) : (
            <>
              <Link href="/login" className="tm-btn-primary w-full sm:w-auto">
                Log in
              </Link>
              <Link href="/register" className="tm-btn-secondary w-full sm:w-auto">
                Create account
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="tm-card">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Built with
        </h2>
        <ul className="mt-4 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" aria-hidden />
            Next.js App Router + TypeScript
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" aria-hidden />
            Tailwind CSS
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" aria-hidden />
            Prisma + PostgreSQL
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" aria-hidden />
            Auth.js (credentials + sessions)
          </li>
        </ul>
      </section>
    </main>
  );
}
