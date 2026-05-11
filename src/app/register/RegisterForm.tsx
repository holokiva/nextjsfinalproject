"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { registerAction, type RegisterState } from "@/server/register-actions";

const initial: RegisterState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="tm-btn-primary w-full">
      {pending ? "Creating account…" : "Register"}
    </button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initial);

  return (
    <form action={formAction} className="tm-form-card">
      {state.error ? (
        <p className="tm-alert-error" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="tm-label">
          Name <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" className="tm-input" />
      </div>

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
          autoComplete="new-password"
          minLength={6}
          className="tm-input"
        />
        <p className="text-xs text-zinc-500">At least 6 characters.</p>
      </div>

      <SubmitButton />

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/" className="font-medium underline underline-offset-2">
          Back to home
        </Link>
      </p>
    </form>
  );
}
