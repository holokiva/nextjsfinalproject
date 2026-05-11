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
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/tasks" className="underline underline-offset-2">
              ← All tasks
            </Link>
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{task.title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/tasks/${task.id}/edit`}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Edit
          </Link>
          <DeleteTaskForm taskId={task.id} />
        </div>
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Details
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-zinc-500">Description</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">
              {task.description.trim() ? task.description : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500">Priority</dt>
            <dd className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
              {priorityLabel[task.priority]}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500">Status</dt>
            <dd className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
              {statusLabel[task.status]}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500">Due date</dt>
            <dd className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
              {formatDueDate(task.dueDate)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500">Created</dt>
            <dd className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
              {task.createdAt.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500">Last updated</dt>
            <dd className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
              {task.updatedAt.toLocaleString()}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
