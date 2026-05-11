import Link from "next/link";
import { CreateTaskForm } from "./CreateTaskForm";

export default function CreateTaskPage() {
  return (
    <main className="tm-page-narrow flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">New task</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/tasks" className="font-medium text-zinc-800 underline underline-offset-2 dark:text-zinc-200">
            ← Back to tasks
          </Link>
        </p>
      </div>
      <CreateTaskForm />
    </main>
  );
}
