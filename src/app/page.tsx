export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This is a student-style Task Manager app. The navbar links to placeholder
          pages; database and CRUD will be added in later steps.
        </p>
      </div>
      <section className="rounded-lg border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-medium text-zinc-800 dark:text-zinc-200">Stack</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>Next.js App Router + TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Prisma + PostgreSQL</li>
        </ul>
      </section>
    </main>
  );
}
