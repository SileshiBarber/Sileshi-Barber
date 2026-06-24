---
name: Vercel static frontend from pnpm monorepo
description: Pitfalls deploying ONE static Vite artifact from a multi-artifact pnpm monorepo to Vercel
---

# Deploying a static Vite frontend from a pnpm monorepo to Vercel

**Stale-deployment trap (the big one):** When a Vercel build FAILS, Vercel keeps
serving the last *successful* deployment on the production domain. So if an old
successful deploy created serverless functions (e.g. an `api/index.ts` that
imported a backend `src/app`), those broken functions keep serving 500s
(`ERR_UNSUPPORTED_DIR_IMPORT`, etc.) even after you delete the backend code —
because the *new* fixed builds are failing and never get promoted.
**How to apply:** When the same runtime error persists across "fixes", suspect the
production domain is pinned to an old deploy. Fix the build so it SUCCEEDS, then
redeploy with **Clear Build Cache** and confirm the new static deploy is promoted.

**Decouple the frontend from backend workspace packages.** A frontend artifact may
declare an unused `"@workspace/<lib>": "workspace:*"` dep + a tsconfig project
`references` entry left over from a full-stack scaffold. Even if never imported in
code, these couple the frontend build/install to backend libs and widen the
failure surface on Vercel. Remove both, run `pnpm install` to refresh the lockfile,
verify a standalone `vite build` still succeeds.
**Why:** vite build doesn't use tsconfig project references, and unused workspace
deps just add install/codegen steps that can break the deploy.

**Config that works (Root Directory = repo root):** root `vercel.json` with
`framework: null`, `buildCommand: pnpm --filter @workspace/<frontend> run build`,
`outputDirectory: artifacts/<frontend>/dist/public`, and a SPA rewrite
`/(.*) -> /index.html`. With no `api/` dir and `framework: null`, Vercel creates
zero functions. Two vercel.json files (root + artifact dir) don't conflict —
Vercel reads the one under the dashboard Root Directory setting.

**Do NOT** add a broad `.vercelignore` for the backend artifact as the primary fix:
`pnpm install --frozen-lockfile` still resolves the whole workspace and can fail
if a workspace package's files are excluded. It's unnecessary once there's no
`api/` dir and the root config is honored.

**vite.config for prod builds:** don't hard-`throw` on missing `PORT`/`BASE_PATH`
(Replit-only dev vars) — Vercel's build env lacks them. Use safe defaults
(`base: process.env.BASE_PATH ?? "/"`, `port: Number(process.env.PORT ?? 3000)`)
and load `@replit/vite-plugin-*` only when `NODE_ENV !== production && REPL_ID`.
