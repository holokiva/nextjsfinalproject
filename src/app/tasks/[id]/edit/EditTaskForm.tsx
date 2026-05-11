"use client";

import type { Task } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { updateTask, type TaskFormState } from "../../actions";
import { toDatetimeLocalValue } from "../../labels";

const initial: TaskFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900"
    >
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

export function EditTaskForm({ task }: { task: Task }) {
  const [state, formAction] = useFormState(
    updateTask.bind(null, task.id),
    initial,
  );

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      {state.error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          defaultValue={task.title}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={2000}
          defaultValue={task.description}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="priority" className="text-sm font-medium">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue={task.priority}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={task.status}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950"
        >
          <option value="TODO">To do</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="dueDate" className="text-sm font-medium">
          Due date <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="datetime-local"
          defaultValue={toDatetimeLocalValue(task.dueDate)}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
