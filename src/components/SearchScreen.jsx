import { useMemo, useState } from 'react'
import { todayKey } from '../utils/date'
import AppShell from './AppShell'
import { IconBack, IconSearch } from './Icons'
import TaskRow from './TaskRow'
import TaskSheet from './TaskSheet'

export default function SearchScreen({
  tasks,
  onBack,
  onUpdate,
  onDelete,
  onToggle,
}) {
  const [query, setQuery] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)),
    )
  }, [tasks, query])

  const openEdit = (task) => {
    setEditingTask(task)
    setSheetOpen(true)
  }

  const handleSave = (data) => {
    if (editingTask) onUpdate(editingTask.id, data)
  }

  return (
    <AppShell>
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col pb-8 pt-5 sm:pt-6 lg:pt-8">
        <div className="flex w-full items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-50"
            aria-label="Back"
          >
            <IconBack />
          </button>
          <div className="relative min-w-0 flex-1">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              autoFocus
              className="search-input w-full rounded-2xl border border-gray-200 bg-white py-3 pl-4 pr-11 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-gray-400">
              <IconSearch />
            </span>
          </div>
        </div>

        <div className="mt-4 w-full flex-1 sm:mt-5">
          {query.trim() === '' ? (
            <p className="py-12 text-center text-sm text-gray-400">
              Type to search by title or description
            </p>
          ) : results.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-400">No tasks found</p>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {results.map((task, index) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onToggle={onToggle}
                  onEdit={openEdit}
                  onDelete={onDelete}
                  variant="list"
                  showDivider={index < results.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <TaskSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSave={handleSave}
        editingTask={editingTask}
        defaultDate={editingTask?.date || todayKey()}
      />
    </AppShell>
  )
}
