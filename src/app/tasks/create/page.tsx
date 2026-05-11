import Link from "next/link";
import { CreateTaskForm } from "./CreateTaskForm";

export default function CreateTaskPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New task</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/tasks" className="underline underline-offset-2">
            Back to tasks
          </Link>
        </p>
      </div>
      <CreateTaskForm />
    </main>
  );
}
