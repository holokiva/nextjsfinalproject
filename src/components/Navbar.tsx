import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Task Manager
        </Link>
        <ul className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/tasks"
              className="hover:text-zinc-900 dark:hover:text-zinc-200"
            >
              Tasks
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
