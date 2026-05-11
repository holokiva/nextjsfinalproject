"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTask, type TaskFormState } from "@/server/task-actions";

const initial: TaskFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="tm-btn-primary w-full">
      {pending ? "Saving…" : "Create task"}
    </button>
  );
}

export function CreateTaskForm() {
  const [state, formAction] = useFormState(createTask, initial);

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
          placeholder="What do you need to do?"
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
          placeholder="Optional details…"
          className="tm-input min-h-[6rem] resize-y"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="priority" className="tm-label">
            Priority
          </label>
          <select id="priority" name="priority" defaultValue="MEDIUM" className="tm-input">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="tm-label">
            Status
          </label>
          <select id="status" name="status" defaultValue="TODO" className="tm-input">
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
        <input id="dueDate" name="dueDate" type="datetime-local" className="tm-input" />
      </div>

      <SubmitButton />
    </form>
  );
}
