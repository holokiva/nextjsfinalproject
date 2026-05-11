import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/database/prisma";
import { formatDueDate, priorityLabel, statusLabel } from "./labels";

export default async function TasksPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <main className="tm-page flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tasks</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Signed in as{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {session.user.email}
            </span>
          </p>
        </div>
        <Link
          href="/tasks/create"
          className="tm-btn-primary w-full shrink-0 text-center sm:w-auto"
        >
          New task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="tm-card flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">No tasks yet</p>
          <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            Create your first task to get started. You can set priority, status, and an optional due
            date.
          </p>
          <Link href="/tasks/create" className="tm-btn-primary w-full max-w-xs sm:w-auto">
            Create your first task
          </Link>
        </div>
      ) : (
        <>
          <ul className="grid gap-3 md:hidden">
            {tasks.map((task) => (
              <li key={task.id}>
                <Link
                  href={`/tasks/${task.id}`}
                  className="tm-card flex flex-col gap-2 transition hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-700"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">{task.title}</span>
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                      {priorityLabel[task.priority]}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                      {statusLabel[task.status]}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                      Due {formatDueDate(task.dueDate)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto rounded-xl border border-zinc-200/90 shadow-sm dark:border-zinc-800 md:block">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Priority</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
                {tasks.map((task) => (
                  <tr key={task.id} className="transition hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50">
                    <td className="px-5 py-3">
                      <Link
                        href={`/tasks/${task.id}`}
                        className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
                      >
                        {task.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                      {priorityLabel[task.priority]}
                    </td>
                    <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                      {statusLabel[task.status]}
                    </td>
                    <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                      {formatDueDate(task.dueDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
