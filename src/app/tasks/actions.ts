"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import type { TaskPriority, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

const PRIORITIES: TaskPriority[] = ["LOW", "MEDIUM", "HIGH"];
const STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

export type TaskFormState = {
  error?: string;
};

type ParsedTask = {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date | null;
};

async function getUserIdOrRedirect() {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) redirect("/login");
  return id;
}

function parsePriority(value: unknown): TaskPriority | null {
  if (typeof value !== "string") return null;
  return PRIORITIES.includes(value as TaskPriority)
    ? (value as TaskPriority)
    : null;
}

function parseStatus(value: unknown): TaskStatus | null {
  if (typeof value !== "string") return null;
  return STATUSES.includes(value as TaskStatus) ? (value as TaskStatus) : null;
}

function parseDueDate(value: unknown): Date | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const d = new Date(trimmed);
  return Number.isNaN(d.getTime()) ? null : d;
}

function validateTaskFields(formData: FormData): ParsedTask | { error: string } {
  const titleRaw = formData.get("title");
  const descriptionRaw = formData.get("description");
  const priorityRaw = formData.get("priority");
  const statusRaw = formData.get("status");
  const dueRaw = formData.get("dueDate");

  if (typeof titleRaw !== "string") {
    return { error: "Title is required." };
  }
  const title = titleRaw.trim();
  if (title.length < 1) {
    return { error: "Title cannot be empty." };
  }
  if (title.length > 200) {
    return { error: "Title must be 200 characters or less." };
  }

  const description =
    typeof descriptionRaw === "string" ? descriptionRaw.trim() : "";
  if (description.length > 2000) {
    return { error: "Description must be 2000 characters or less." };
  }

  const priority = parsePriority(priorityRaw);
  if (!priority) {
    return { error: "Pick a valid priority." };
  }

  const status = parseStatus(statusRaw);
  if (!status) {
    return { error: "Pick a valid status." };
  }

  const dueDate = parseDueDate(dueRaw);
  if (typeof dueRaw === "string" && dueRaw.trim() && dueDate === null) {
    return { error: "Due date is not a valid date." };
  }

  return { title, description, priority, status, dueDate };
}

export async function createTask(
  _prev: TaskFormState,
  formData: FormData,
): Promise<TaskFormState> {
  const userId = await getUserIdOrRedirect();
  const parsed = validateTaskFields(formData);
  if ("error" in parsed) return { error: parsed.error };

  const task = await prisma.task.create({
    data: {
      title: parsed.title,
      description: parsed.description,
      priority: parsed.priority,
      status: parsed.status,
      dueDate: parsed.dueDate,
      userId,
    },
  });

  revalidatePath("/tasks");
  redirect(`/tasks/${task.id}`);
}

export async function updateTask(
  taskId: string,
  _prev: TaskFormState,
  formData: FormData,
): Promise<TaskFormState> {
  const userId = await getUserIdOrRedirect();
  const parsed = validateTaskFields(formData);
  if ("error" in parsed) return { error: parsed.error };

  const result = await prisma.task.updateMany({
    where: { id: taskId, userId },
    data: {
      title: parsed.title,
      description: parsed.description,
      priority: parsed.priority,
      status: parsed.status,
      dueDate: parsed.dueDate,
    },
  });

  if (result.count === 0) notFound();

  revalidatePath("/tasks");
  revalidatePath(`/tasks/${taskId}`);
  revalidatePath(`/tasks/${taskId}/edit`);
  redirect(`/tasks/${taskId}`);
}

export async function deleteTask(formData: FormData): Promise<void> {
  const userId = await getUserIdOrRedirect();
  const idRaw = formData.get("id");
  if (typeof idRaw !== "string" || !idRaw.trim()) return;

  const result = await prisma.task.deleteMany({
    where: { id: idRaw.trim(), userId },
  });

  if (result.count === 0) notFound();

  revalidatePath("/tasks");
  redirect("/tasks");
}
