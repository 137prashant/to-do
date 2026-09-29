# To-Do List App — Assignment Plan

SDE-1 (MERN Stack) take-home for Digiaccel Learning / Altera Institute.

## Decisions

- **No MongoDB.** Tasks live in the browser (`localStorage`).
- **No backend / no own API.** Frontend-only React app.
- **Figma-first UI.** Screens match the provided screenshot as closely as possible.
- **PDF features mixed in.** Assignment behavior is implemented inside the Figma layout (not a different home screen).

## Stack

- React (Vite)
- Tailwind CSS
- `localStorage` for persistence
- Deploy on Netlify (optional extra points)
- GitHub repo for submission

## Screens (from Figma)

### 1. Get Started

- Full-screen blue splash
- Pattern / decorative shapes
- Title: **Manage What To Do**
- Subtitle: *The best way to manage what you have to do, don't forget your plans*
- **Get Started** button → Home

### 2. Home

- Search bar: *Search for a task*
- Horizontal week date strip (days + dates)
- Selected day highlighted (blue)
- Summary cards:
  - **Task Complete** (count this week)
  - **Task Pending** (count this week)
- **Weekly Progress** bar (completed vs total this week)
- **Tasks Today** list with View All
- Each task: checkbox, title, edit icon, delete icon
- Completed tasks: checked + strikethrough
- Blue **+** button → Add Task sheet

### 3. Add / Edit Task

Bottom sheet (as in Figma):

- Title (required)
- Start time / End time (required)
- Date (required)
- Description (optional)
- **Priority:** Low / Medium / High (from PDF, not on Figma — shown as a simple row of options)
- **Create task** / **Save** button

### 4. Search

- Search by title or description
- Results with checkbox, edit, delete
- Empty state when nothing matches

## PDF features mixed into this UI

| PDF requirement | How it shows in the app |
| --- | --- |
| Create / edit / delete / search | Home, add sheet, search, edit/delete icons |
| Title, description, date & time | Add/Edit form (start + end time, like Figma) |
| Priority (Low, Medium, High) | Extra field on Add/Edit |
| Weeks Mon–Sun | Date strip + weekly counts use Mon–Sun |
| Open vs completed counts | Pending / Complete cards + progress bar |
| Expand a week | Tapping a day shows that day’s tasks; week cards stay as Figma summary cards |
| Completed / In Progress | Unchecked = In Progress, checked = Completed |
| Counts update when status changes | Cards + progress bar update live |
| Swipe left to delete | Supported on the task row, plus the trash icon from Figma |

Auth / login is **not** in the spec. Skip it.

## Task data (localStorage)

Each task:

```js
{
  id: "string",
  title: "string",          // required
  description: "string",    // optional
  date: "YYYY-MM-DD",       // required
  startTime: "HH:mm",       // required
  endTime: "HH:mm",         // required
  priority: "low" | "medium" | "high",
  status: "in-progress" | "completed",
  createdAt: "ISO string"
}
```

Week = Monday 00:00 → Sunday 23:59.

- **Completed** = `status === "completed"`
- **Pending / Open / In Progress** = `status === "in-progress"`
- Home list = tasks for the **selected date**
- Week cards / progress = tasks whose `date` falls in the selected week

## User flow

1. Splash → **Get Started** → Home (current week, today selected).
2. Tap a day → that day’s tasks.
3. **+** → fill form → **Create task** → appears on that date / week.
4. Pencil → same sheet, prefilled → **Save**.
5. Trash or swipe left → **Delete**.
6. Checkbox → Completed / In Progress; week counts update.
7. Search → filter by keyword → view / complete / edit / delete from results.

## Out of scope

- MongoDB, Express API, login
- Pixel-perfect desktop dashboard (layout is **mobile-first**, still usable on larger screens)
- Push notifications, reminders, attachments

## Implementation notes

- Keep code simple and readable. No over-engineering.
- Match Figma colors, spacing, and type as closely as possible from the screenshot.
- Responsive with Tailwind; designed for mobile, usable on tablet/desktop (centered phone-width column is fine).
- Seed a few sample tasks so Home is not empty on first load.
