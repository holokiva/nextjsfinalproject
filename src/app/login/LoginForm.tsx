"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

function safeCallbackUrl(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/tasks";
  return raw;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "1";
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"));

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    if (typeof email !== "string" || typeof password !== "string") {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    if (res?.ok) {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="tm-form-card">
      {registered ? (
        <p className="tm-alert-success">Account created. You can log in below.</p>
      ) : null}

      {error ? (
        <p className="tm-alert-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="tm-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={loading}
          className="tm-input"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="tm-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={loading}
          className="tm-input"
        />
      </div>

      <button type="submit" disabled={loading} className="tm-btn-primary w-full">
        {loading ? "Signing in…" : "Log in"}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/register" className="font-medium underline underline-offset-2">
          Create an account
        </Link>
        <span className="mx-2 text-zinc-300 dark:text-zinc-600">·</span>
        <Link href="/" className="font-medium underline underline-offset-2">
          Home
        </Link>
      </p>
    </form>
  );
}
