"use client";

import type { Task } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { updateTask, type TaskFormState } from "../../actions";
import { toDatetimeLocalValue } from "../../labels";

const initial: TaskFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="tm-btn-primary w-full">
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
    <form action={formAction} className="tm-form-card">
      {state.error ? (
        <p className="tm-alert-error" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="tm-label">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          defaultValue={task.title}
          className="tm-input"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="tm-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={2000}
          defaultValue={task.description}
          className="tm-input min-h-[6rem] resize-y"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="priority" className="tm-label">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue={task.priority}
            className="tm-input"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="tm-label">
            Status
          </label>
          <select id="status" name="status" defaultValue={task.status} className="tm-input">
            <option value="TODO">To do</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="dueDate" className="tm-label">
          Due date <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="datetime-local"
          defaultValue={toDatetimeLocalValue(task.dueDate)}
          className="tm-input"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
