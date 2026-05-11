"use client";

import { useFormStatus } from "react-dom";
import { deleteTask } from "../actions";

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 disabled:opacity-60 dark:border-red-900 dark:text-red-400"
    >
      {pending ? "Deleting…" : "Delete task"}
    </button>
  );
}

export function DeleteTaskForm({ taskId }: { taskId: string }) {
  return (
    <form
      action={deleteTask}
      onSubmit={(e) => {
        if (!confirm("Delete this task? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="inline"
    >
      <input type="hidden" name="id" value={taskId} />
      <DeleteButton />
    </form>
  );
}
