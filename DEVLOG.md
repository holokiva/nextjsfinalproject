# Development log

Short notes on how this project grew and what we fixed along the way.

## Stage 1 — Project setup

- Scaffolded Next.js (App Router, TypeScript, Tailwind).
- Added Prisma with PostgreSQL, a first `Task` model, and a single shared `PrismaClient` (now in `src/database/prisma.ts`).
- Built a minimal home page, navbar, and a placeholder `/tasks` route so `npm run dev` always worked.

## Stage 2 — Authentication

- Added a `User` model and **credentials** auth with **bcryptjs** password hashing.
- Wired **Auth.js** (`next-auth` v5): JWT sessions, `/api/auth/[...nextauth]`, login/register pages, logout.
- Protected `/tasks` with **Next.js 16 `proxy.ts`** (replaces the older `middleware.ts` name): unauthenticated users go to login; logged-in users skip the auth pages.
- **SessionProvider** wrapper for client `signIn` / `signOut`.

**Problems solved**

- Chose **JWT + credentials** so we did not need database session tables on day one.
- Auth lives under **`src/auth/`** (`index.ts` + `config.ts`); the app uses one **`auth()`** helper for pages and `src/proxy.ts` after Next 16 introduced the proxy file.

## Stage 3 — Task CRUD

- Expanded `Task`: title, description, priority, status, optional `dueDate`, **`userId`** foreign key, `onDelete: Cascade`.
- Routes: list, create, `[id]` detail, `[id]` edit; server actions for create/update/delete.
- **Ownership**: every query and mutation includes `userId` from `auth()`; wrong id → `notFound()` so other users’ tasks are not revealed.
- **Validation** in server actions (length limits, enum checks, due date parsing).
- List uses a **table on desktop** and **cards on small screens** for readability.

**Problems solved**

- Avoided trusting any id from the URL without matching it to the current user in Prisma `where` clauses.

## Stage 4 — UI polish and docs

- Added shared **utility classes** in `globals.css` (`tm-input`, `tm-btn-primary`, `tm-form-card`, etc.) so forms and buttons stay consistent without a heavy component library.
- **Sticky navbar** with blur, clearer mobile actions (compact “New” on small screens), larger tap targets.
- Improved **empty states**, loading skeleton for `/tasks`, and a clearer **task detail** layout (description block + info cards).
- Wrote **`README.md`** (setup, stack, auth/Prisma/user-flow summaries) and this **`DEVLOG.md`**.

**Problems solved**

- Aligned spacing and typography across auth forms and task forms so the app feels finished without a big refactor.

## Stage 5 — Easier folder names (find things faster)

- Grouped files by **job**: **`src/auth/`** (login), **`src/database/`** (Prisma), **`src/server/`** (save/update/delete tasks + register).
- Added **`FOLDER-GUIDE.md`** at the project root so non-coders can match “what I want to change” → “which file”.

**Problems solved**

- Fewer mystery files at `src/` root; names read closer to plain English (“database”, “server”, “auth”).
