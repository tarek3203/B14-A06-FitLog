# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with the Next.js App Router. Browse a
library of twelve lifts, open any one for full coaching detail, lock it into
today's plan, and watch the session's volume add up live.

**Live site:** _pending deployment_
**Repository:** https://github.com/tarek3203/B14-A06-FitLog

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 16 (App Router)** | Routing, server components, static pre-rendering |
| **TypeScript** | Typed workout model shared across every component |
| **Tailwind CSS 4** | Utility styling and the responsive layout system |
| **daisyUI 5** | Component primitives on top of Tailwind |
| **React Context API** | Shared plan / saved state across pages |
| **react-toastify** | Toast notifications for every plan action |
| **react-icons** | Stat, action, and navigation icons |

---

## ✨ Key Features

1. **Twelve-lift library with live sorting** — every workout is fetched from the
   FitLog API and rendered as a responsive card grid that re-sorts instantly by
   duration, calories, or rating.
2. **Detail page for every workout** — a two-column layout with a key-specs
   panel (equipment, difficulty, sets, reps, duration, calories, rating) and the
   full numbered instruction list, statically pre-rendered for all twelve ids.
3. **Today's Plan with a five-lift cap** — add a workout from its detail page and
   the navbar counter updates immediately; the plan refuses a sixth lift and
   blocks duplicates, each with its own toast.
4. **Live session metrics** — the My Plan page totals exercises, minutes, and
   calories from the current plan and recomputes them as items come and go.
5. **Save for later, mark as done, remove** — a separate Saved tab, a done state
   on any planned lift, and per-item removal, all confirmed by toasts.
6. **Survives a reload** — plan, saved list, and done state persist in
   `localStorage` and are rehydrated after mount, so refreshing any route keeps
   your session intact.
7. **Real 404 handling** — unknown routes *and* invalid workout ids both render
   the custom not-found page with a genuine 404 status.

---

## 🧭 Routes

| Route | Description |
| --- | --- |
| `/` | Hero + the full workout library with the sort control |
| `/workout/[id]` | Detail page for a single workout |
| `/my-plan` | Today's Plan and Saved tabs, metrics, and item actions |
| _anything else_ | Custom 404 page |

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📡 Data Source

All workout data comes from the FitLog API:

- All workouts — `https://api.abcz.workers.dev/api/fitlog`
- Single workout — `https://api.abcz.workers.dev/api/fitlog/:id`

---

Built by **Tariq Bin Bashar** for Programming Hero B14 — Assignment 6.
