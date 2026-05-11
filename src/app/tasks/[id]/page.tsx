import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { formatDueDate, priorityLabel, statusLabel } from "../labels";
import { DeleteTaskForm } from "./DeleteTaskForm";

type Props = { params: Promise<{ id: string }> };

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) notFound();

  return (
    <main className="tm-page flex flex-col gap-8">
      <nav className="text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/tasks" className="tm-nav-link inline-block px-0 font-medium text-zinc-700 dark:text-zinc-300">
          ← Tasks
        </Link>
      </nav>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{task.title}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last updated {task.updatedAt.toLocaleString()}
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap lg:w-auto lg:shrink-0">
          <Link
            href={`/tasks/${task.id}/edit`}
            className="tm-btn-primary w-full text-center sm:w-auto sm:flex-1 lg:flex-none"
          >
            Edit task
          </Link>
          <DeleteTaskForm taskId={task.id} />
        </div>
      </div>

      <section className="tm-card space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Description
        </h2>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
          {task.description.trim() ? task.description : "No description added."}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Task info
        </h2>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Priority", value: priorityLabel[task.priority] },
            { label: "Status", value: statusLabel[task.status] },
            { label: "Due date", value: formatDueDate(task.dueDate) },
            { label: "Created", value: task.createdAt.toLocaleString() },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-lg border border-zinc-200/80 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950/50"
            >
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
