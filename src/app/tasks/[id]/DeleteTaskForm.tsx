"use client";

import { useFormStatus } from "react-dom";
import { deleteTask } from "@/server/task-actions";

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="tm-btn-danger">
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
      className="w-full sm:w-auto"
    >
      <input type="hidden" name="id" value={taskId} />
      <DeleteButton />
    </form>
  );
}
