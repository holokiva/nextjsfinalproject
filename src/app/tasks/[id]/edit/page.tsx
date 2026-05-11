import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/database/prisma";
import { EditTaskForm } from "./EditTaskForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditTaskPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) notFound();

  return (
    <main className="tm-page-narrow flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Edit task</h1>
        <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href={`/tasks/${task.id}`}
            className="font-medium text-zinc-800 underline underline-offset-2 dark:text-zinc-200"
          >
            ← Task
          </Link>
          <span className="text-zinc-300 dark:text-zinc-600" aria-hidden>
            ·
          </span>
          <Link href="/tasks" className="font-medium text-zinc-800 underline underline-offset-2 dark:text-zinc-200">
            All tasks
          </Link>
        </p>
      </div>
      <EditTaskForm task={task} />
    </main>
  );
}
