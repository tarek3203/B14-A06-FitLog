# Fit Log

Fit Log is a workout library for the gym. You browse twelve lifts, open any one
to read the sets, reps and full instructions, then add it to today's plan or
save it for later. The plan page keeps a running total of how much work you have
lined up.

**Live site:** _add after deploy_

## Technology used

- Next.js 16 with the App Router
- TypeScript
- Tailwind CSS v4 + DaisyUI
- React Context for the plan and saved lists
- React Toastify
- React Icons

## Features

1. **Twelve lifts you can sort.** All the workout data comes from the Fit Log
   API and shows up as a card grid. The Sort By dropdown reorders the list by
   duration, calories or rating without reloading anything.
2. **A details page for every lift.** Each workout has its own page with the
   image, muscle group tags, a specs panel for equipment, difficulty, sets,
   reps, duration, calories and rating, plus the four numbered instructions.
3. **Today's plan with a five lift cap.** Adding a workout bumps the Plan
   counter in the navbar straight away. The same lift cannot go in twice and the
   sixth one is refused, both with a toast explaining why.
4. **Live totals.** The plan page adds up exercises, minutes and calories from
   whatever is in the plan, and the numbers change as soon as you add or remove
   something.
5. **Save for later, mark as done, remove.** Saved lifts get their own tab.
   Anything in today's plan can be ticked off or removed with the ✕ button, and
   each action shows a toast.
6. **It survives a refresh.** The plan, the saved list and the done ticks are
   kept in localStorage and read back after the page mounts, so reloading any
   route does not wipe your session.
7. **Proper 404s.** A bad URL and a workout id that does not exist both land on
   the same custom not found page.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Banner and the full workout library |
| `/workout/[id]` | Details for one workout |
| `/my-plan` | Today's Plan and Saved tabs with the totals |

## The API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- One workout: `https://api.abcz.workers.dev/api/fitlog/1`

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
