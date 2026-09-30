# To-Do List Mobile App

A responsive task-management web app inspired by the To-Do List mobile Figma design. Users can create, edit, delete, and search tasks, track weekly progress, and mark items as completed or in progress. All data is persisted in the browser via **localStorage**—no backend or database required.

## Live demo

**[https://calm-fairy-2971cc.netlify.app/](https://calm-fairy-2971cc.netlify.app/)**

## Tech stack

- **React** (Vite)
- **Tailwind CSS**
- **localStorage** for task persistence

## Features

- **Onboarding** — splash screen with Get Started flow
- **Home** — week calendar (Monday–Sunday), task summary cards, weekly progress bar, daily/weekly task list
- **Task management** — title, description, date, start/end time, and priority (low / medium / high)
- **Status** — mark tasks completed or in progress; counts update on the home screen
- **Search** — filter tasks by title or description
- **Responsive layout** — mobile-first UI that adapts for tablet and desktop
- **Gestures** — swipe left on a task row to delete (touch devices)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
git clone https://github.com/137prashant/to-do.git
cd to-do
npm install
```

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173` (or the port shown in the terminal).

### Production build

```bash
npm run build
npm run preview
```

`npm run build` outputs static files to `dist/`. `npm run preview` serves that build locally for verification.

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start development server       |
| `npm run build`   | Create production build        |
| `npm run preview` | Preview the production build   |

## Project structure

```
src/
  components/   # Screens and UI (Home, Search, TaskSheet, etc.)
  hooks/        # Task state and localStorage sync
  utils/        # Date/week helpers and seed data
```

## Data model

Tasks are stored as JSON in `localStorage` under the key `todo-app-tasks`. Each task includes id, title, optional description, date, start/end time, priority, status, and `createdAt`.
