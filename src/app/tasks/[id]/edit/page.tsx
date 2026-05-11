import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
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
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit task</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href={`/tasks/${task.id}`} className="underline underline-offset-2">
            Back to task
          </Link>
          {" · "}
          <Link href="/tasks" className="underline underline-offset-2">
            All tasks
          </Link>
        </p>
      </div>
      <EditTaskForm task={task} />
    </main>
  );
}
