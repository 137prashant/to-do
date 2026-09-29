# To-Do List Mobile App

React + Tailwind CSS to-do app for the SDE-1 assignment. Tasks are stored in **localStorage** (no MongoDB / backend).

## Features

- Get Started splash screen (Figma)
- Home: week calendar (Mon–Sun), complete/pending cards, weekly progress, task list
- Create / edit / delete tasks with title, description, date, time, priority
- Mark tasks completed or in progress
- Search by title or description
- Swipe left on a task row to delete (mobile)

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deploy on Netlify

1. Push this repo to GitHub.
2. In Netlify: **Add new site** → **Import from Git** → select the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`

Or drag-and-drop the `dist` folder after `npm run build`.

## Project structure

```
src/
  components/   # UI screens and pieces
  hooks/        # useTasks + localStorage
  utils/        # dates and task helpers
```
