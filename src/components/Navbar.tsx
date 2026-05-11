import Link from "next/link";
import { auth } from "@/auth";
import { LogoutButton } from "./LogoutButton";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/90 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Task Manager
          </Link>
          {session?.user ? (
            <Link
              href="/tasks/create"
              className="tm-btn-primary shrink-0 px-3 py-2 text-xs sm:hidden"
            >
              New
            </Link>
          ) : null}
        </div>

        <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm sm:gap-x-2">
          <li>
            <Link href="/" className="tm-nav-link px-2 py-2">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tasks" className="tm-nav-link px-2 py-2">
              Tasks
            </Link>
          </li>
          {session?.user ? (
            <>
              <li className="hidden sm:block">
                <Link
                  href="/tasks/create"
                  className="tm-btn-primary px-3 py-2 text-xs font-medium"
                >
                  New task
                </Link>
              </li>
              <li className="max-w-[10rem] truncate text-xs text-zinc-500 sm:max-w-[14rem] sm:text-sm">
                <span className="hidden sm:inline">{session.user.email}</span>
                <span className="sm:hidden" title={session.user.email ?? ""}>
                  {session.user.email?.split("@")[0]}
                </span>
              </li>
              <li>
                <LogoutButton />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="tm-nav-link px-2 py-2">
                  Log in
                </Link>
              </li>
              <li>
                <Link href="/register" className="tm-nav-link px-2 py-2">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
