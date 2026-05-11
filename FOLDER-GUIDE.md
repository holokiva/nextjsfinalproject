# Where is everything? (simple map)

Use this when you want to **find a file by what it does**, not by framework jargon.

---

## Top level (project root)

| Name | What it is |
|------|------------|
| **`README.md`** | How to install, run, and what the project uses |
| **`DEVLOG.md`** | Short diary: what was built step by step |
| **`FOLDER-GUIDE.md`** | This file — where to look for things |
| **`package.json`** | List of libraries and commands (`npm run dev`, etc.) |
| **`prisma/`** | **Database shape** — the `schema.prisma` file defines tables (User, Task) |

---

## `src/app/` — **screens and website addresses**

Next.js ties **folders to URLs**. If you see a folder, it is usually part of the address in the browser.

| Path | URL in the browser | What you see |
|------|--------------------|----------------|
| `app/page.tsx` | `/` | Home page |
| `app/login/` | `/login` | Log in |
| `app/register/` | `/register` | Sign up |
| `app/tasks/page.tsx` | `/tasks` | Task list |
| `app/tasks/create/` | `/tasks/create` | New task form |
| `app/tasks/[id]/page.tsx` | `/tasks/___` | One task (details) |
| `app/tasks/[id]/edit/` | `/tasks/___/edit` | Edit that task |
| `app/api/auth/` | `/api/auth/...` | Behind-the-scenes login (you rarely open this) |

**Files you might edit for looks:** `page.tsx` files, `globals.css` (colors and shared button/input styles).

**Note:** `[id]` means “any task id here” — that is normal; it is not a typo.

---

## `src/components/` — **reusable pieces of the layout**

| File | Role |
|------|------|
| `Navbar.tsx` | Top bar with links (Home, Tasks, New task, Log out) |
| `LogoutButton.tsx` | Log out button |
| `AuthSessionProvider.tsx` | Thin wrapper so login/logout work from the client |

---

## `src/auth/` — **login system configuration**

| File | Role |
|------|------|
| `index.ts` | Main Auth.js setup (who can log in, session rules) |
| `config.ts` | Extra session / page settings |
| `next-auth.d.ts` | Small TypeScript note so `session.user.id` is allowed |

---

## `src/database/` — **talking to PostgreSQL**

| File | Role |
|------|------|
| `prisma.ts` | Opens **one** database connection for the app (Prisma client) |

---

## `src/server/` — **save / update / delete on the server**

These are **server actions** (they run on the server, not in the browser).

| File | Role |
|------|------|
| `task-actions.ts` | Create, update, delete tasks (and validation) |
| `register-actions.ts` | Create a new user account |

---

## `src/proxy.ts` — **“are you logged in?” for `/tasks`**

If you are not logged in and you open something under **`/tasks`**, this file sends you to **login** first. You usually do not need to change it unless you add new private sections.

---

## Quick “I want to change…”

| I want to… | Look in… |
|--------------|-----------|
| Change home text or buttons | `src/app/page.tsx` |
| Change login / register forms | `src/app/login/`, `src/app/register/` |
| Change task list or empty state | `src/app/tasks/page.tsx` |
| Change new task form | `src/app/tasks/create/CreateTaskForm.tsx` |
| Change task detail layout | `src/app/tasks/[id]/page.tsx` |
| Change how tasks are saved | `src/server/task-actions.ts` |
| Change how sign-up saves users | `src/server/register-actions.ts` |
| Change colors / buttons globally | `src/app/globals.css` |
| Change database tables | `prisma/schema.prisma` then run `npm run db:push` |

---

## Why are there so many folders?

**`app/`** must follow Next.js rules so each **URL** works.  
Everything else is grouped by **job**: **auth**, **database**, **server** actions, **components** — so names match what they do.

If you are lost, start with **`FOLDER-GUIDE.md`** (this file) and **`README.md`**.
