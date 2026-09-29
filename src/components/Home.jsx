import { useMemo, useState } from 'react'
import {
  getWeekDays,
  getWeekMonday,
  isSameDay,
  toDateKey,
} from '../utils/date'
import { getWeekStats } from '../utils/tasks'
import AppShell from './AppShell'
import {
  IconPlus,
  IconSearch,
  IconTaskComplete,
  IconTaskPending,
} from './Icons'
import TaskRow from './TaskRow'
import TaskSheet from './TaskSheet'

function WeekStrip({ weekDays, selectedDate, onSelect }) {
  return (
    <div className="scrollbar-hide flex justify-between gap-1 overflow-x-auto px-1 sm:gap-2 lg:justify-center">
      {weekDays.map(({ label, date }) => {
        const active = isSameDay(date, selectedDate)
        const isToday = isSameDay(date, new Date())
        return (
          <button
            key={toDateKey(date)}
            type="button"
            onClick={() => onSelect(date)}
            className="flex min-w-[44px] flex-col items-center py-2 sm:min-w-[48px]"
          >
            <span className={`text-xs font-medium ${active ? 'text-brand' : 'text-gray-400'}`}>
              {label}
            </span>
            <span
              className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold sm:h-10 sm:w-10 ${
                active ? 'bg-brand text-white' : 'text-gray-700'
              }`}
            >
              {String(date.getDate()).padStart(2, '0')}
            </span>
            {(isToday || active) && (
              <span
                className={`mt-1 h-1 w-1 rounded-full ${active || isToday ? 'bg-brand' : 'bg-transparent'}`}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <div className="rounded-2xl bg-complete-bg p-4 shadow-card">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white sm:h-10 sm:w-10 sm:rounded-xl">
          <IconTaskComplete />
        </div>
        <p className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          {String(stats.completed).padStart(2, '0')}
        </p>
        <p className="text-sm font-semibold text-gray-800">Task Complete</p>
        <p className="mt-2 text-xs text-gray-400">This Week</p>
      </div>
      <div className="rounded-2xl bg-pending-bg p-4 shadow-card">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pending-icon text-white sm:h-10 sm:w-10 sm:rounded-xl">
          <IconTaskPending />
        </div>
        <p className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          {String(stats.pending).padStart(2, '0')}
        </p>
        <p className="text-sm font-semibold text-gray-800">Task Pending</p>
        <p className="mt-2 text-xs text-gray-400">This Week</p>
      </div>
    </div>
  )
}

function WeeklyProgress({ percent }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-800">Weekly Progress</p>
        <p className="text-xs text-gray-400">{percent}%</p>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-brand-light sm:h-3">
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default function Home({
  tasks,
  onAdd,
  onUpdate,
  onDelete,
  onToggle,
  onOpenSearch,
}) {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [showWeekTasks, setShowWeekTasks] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const weekMonday = useMemo(() => getWeekMonday(selectedDate), [selectedDate])
  const weekDays = useMemo(() => getWeekDays(weekMonday), [weekMonday])
  const stats = useMemo(() => getWeekStats(tasks, weekMonday), [tasks, weekMonday])

  const selectedKey = toDateKey(selectedDate)

  const listTasks = useMemo(() => {
    const filtered = showWeekTasks
      ? tasks.filter((t) => {
          const start = weekMonday
          const end = new Date(weekMonday)
          end.setDate(end.getDate() + 6)
          const d = new Date(t.date)
          return d >= start && d <= end
        })
      : tasks.filter((t) => t.date === selectedKey)

    return filtered.sort((a, b) => a.startTime.localeCompare(b.startTime))
  }, [tasks, selectedKey, showWeekTasks, weekMonday])

  const openCreate = () => {
    setEditingTask(null)
    setSheetOpen(true)
  }

  const openEdit = (task) => {
    setEditingTask(task)
    setSheetOpen(true)
  }

  const handleSave = (data) => {
    if (editingTask) onUpdate(editingTask.id, data)
    else onAdd(data)
  }

  const selectDay = (date) => {
    setSelectedDate(date)
    setShowWeekTasks(false)
  }

  return (
    <div className="relative min-h-[100dvh] pb-24 md:pb-8">
      <AppShell>
        <header className="flex flex-col gap-4 pt-5 sm:pt-6 lg:flex-row lg:items-center lg:justify-between lg:pt-8">
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-gray-900">To-Do List</h1>
            <p className="text-sm text-gray-500">Manage your tasks by week</p>
          </div>
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-brand/30 lg:ml-auto lg:max-w-md"
          >
            <span className="min-w-0 flex-1 truncate text-[15px] text-gray-400">
              Search for a task
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
              <IconSearch />
            </span>
          </button>
        </header>

        <div className="mt-5 lg:mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <aside className="space-y-5 lg:col-span-4 xl:col-span-4">
            <div className="rounded-2xl bg-white p-3 shadow-sm sm:p-4">
              <WeekStrip
                weekDays={weekDays}
                selectedDate={selectedDate}
                onSelect={selectDay}
              />
            </div>
            <StatsCards stats={stats} />
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <WeeklyProgress percent={stats.percent} />
            </div>
          </aside>

          <main className="mt-6 lg:col-span-8 lg:mt-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                {showWeekTasks ? 'Tasks This Week' : 'Tasks Today'}
              </h2>
              <button
                type="button"
                onClick={() => setShowWeekTasks((v) => !v)}
                className="shrink-0 text-sm font-medium text-brand hover:text-brand-dark"
              >
                {showWeekTasks ? 'Today only' : 'View All'}
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {listTasks.length === 0 ? (
                <p className="py-10 text-center text-sm text-gray-400">
                  No tasks for this {showWeekTasks ? 'week' : 'day'}
                </p>
              ) : (
                listTasks.map((task, index) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onEdit={openEdit}
                    onDelete={onDelete}
                    variant="list"
                    showDivider={index < listTasks.length - 1}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </AppShell>

      <button
        type="button"
        onClick={openCreate}
        className="fixed bottom-6 left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-brand text-white shadow-fab transition hover:bg-brand-dark active:scale-95 md:bottom-8 md:left-auto md:right-8 md:translate-x-0 lg:right-12"
        aria-label="Add task"
      >
        <IconPlus />
      </button>

      <TaskSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSave={handleSave}
        editingTask={editingTask}
        defaultDate={selectedKey}
      />
    </div>
  )
}
