# Task Manager

A small full-stack task manager built as a student-style assignment. You can register, log in, and maintain your own tasks (title, description, priority, status, optional due date). Tasks are private: you only see and edit what you created.

## Technologies

| Layer | Choice |
|--------|--------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| ORM | [Prisma](https://www.prisma.io/) |
| Database | PostgreSQL |
| Auth | [Auth.js](https://authjs.dev/) via `next-auth` (credentials, JWT sessions) |

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (LTS recommended)
- A PostgreSQL database (local or hosted, e.g. Neon)

## Setup

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd nextjsfinalproject
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and fill in:

   - `DATABASE_URL` — PostgreSQL connection string from Prisma’s [connection URL docs](https://www.prisma.io/docs/orm/reference/connection-urls).
   - `AUTH_SECRET` — long random string (generate with `npx auth secret`).
   - `AUTH_URL` — app base URL in dev, usually `http://localhost:3000`.

3. **Database schema**

   Push the Prisma schema to your database (good for local dev):

   ```bash
   npm run db:push
   ```

   Or use migrations in a team/production workflow:

   ```bash
   npm run db:migrate
   ```

4. **Run the app**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build (runs `prisma generate` first) |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:push` | Sync schema to DB (no migration files) |
| `npm run db:migrate` | Create/apply migrations |

## Authentication flow (short)

1. **Register** — A server action hashes the password (`bcryptjs`), stores the user in PostgreSQL via Prisma, then redirects to login.
2. **Login** — The browser calls `signIn("credentials", …)` (Auth.js). The credentials provider checks email + password hash and issues a **JWT session** (encrypted cookie).
3. **Protected routes** — `src/proxy.ts` runs before `/tasks` routes. If there is no session, the user is sent to `/login` with a `callbackUrl`. Logged-in users hitting `/login` or `/register` are redirected to `/tasks`.
4. **Logout** — `signOut` clears the session cookie.

Session data is read in Server Components and server actions with `auth()` from `src/auth.ts`.

## Prisma usage (short)

- **`prisma/schema.prisma`** defines `User` and `Task` (and enums for priority/status).
- **`src/lib/db.ts`** exports a single `PrismaClient` instance (avoids too many connections during Next.js dev hot reload).
- **Server actions** in `src/app/tasks/actions.ts` perform **create / update / delete** with `userId` from the session so rows are scoped per user.
- **Pages** use `prisma.task.findMany` / `findFirst` with the same `userId` filter for reads.

After changing the schema, run `npm run db:push` or `db:migrate`, and `npm run db:generate` if you need to refresh the client outside of `npm run build`.

## User flow (short)

1. Open the home page → **Register** or **Log in**.
2. After login → **Tasks** list (empty state invites you to create a task).
3. **New task** → fill the form → saved task opens on the **detail** page.
4. From details → **Edit** or **Delete** (delete asks for confirmation).
5. **Log out** from the navbar.

## Project layout (high level)

```
src/
  app/           # Routes, layouts, server actions
  auth.ts        # Auth.js config + credentials provider
  auth.config.ts # Shared session / page options
  proxy.ts       # Auth gate for /tasks routes (Next.js 16 “proxy”)
  lib/db.ts      # Prisma singleton
prisma/
  schema.prisma  # Data model
```

## Development log

See [`DEVLOG.md`](./DEVLOG.md) for stages, features, and problems solved during development.

## License

Use for learning or coursework unless your instructor specifies otherwise.
