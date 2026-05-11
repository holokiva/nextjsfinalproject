import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
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
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Signed in as{" "}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {session.user.email}
            </span>
          </p>
        </div>
        <Link
          href="/tasks/create"
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          New task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          No tasks yet.{" "}
          <Link href="/tasks/create" className="font-medium underline underline-offset-2">
            Create one
          </Link>
          .
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {tasks.map((task) => (
                <tr key={task.id} className="bg-white dark:bg-zinc-950">
                  <td className="px-4 py-3">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
                    >
                      {task.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {priorityLabel[task.priority]}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {statusLabel[task.status]}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {formatDueDate(task.dueDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
