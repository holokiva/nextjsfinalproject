import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Log in</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Use the email and password you registered with.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="tm-card animate-pulse space-y-4">
            <div className="h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-11 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
