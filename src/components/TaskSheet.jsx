import { useEffect, useState } from 'react'
import { formatDisplayDate, todayKey } from '../utils/date'
import { IconCalendar, IconClock, IconClose } from './Icons'

const emptyForm = (defaultDate) => ({
  title: '',
  description: '',
  date: defaultDate,
  startTime: '09:00',
  endTime: '10:00',
  priority: 'medium',
})

export default function TaskSheet({ open, onClose, onSave, editingTask, defaultDate }) {
  const [form, setForm] = useState(emptyForm(defaultDate))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || '',
        date: editingTask.date,
        startTime: editingTask.startTime,
        endTime: editingTask.endTime,
        priority: editingTask.priority || 'medium',
      })
    } else {
      setForm(emptyForm(defaultDate || todayKey()))
    }
    setError('')
  }, [open, editingTask, defaultDate])

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Title is required')
      return
    }
    if (!form.date || !form.startTime || !form.endTime) {
      setError('Date and time are required')
      return
    }
    if (form.endTime <= form.startTime) {
      setError('End time must be after start time')
      return
    }
    onSave({
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      priority: form.priority,
    })
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-gray-900">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <IconClose />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Doing Homework"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Start</label>
              <div className="relative">
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => set('startTime', e.target.value)}
                  className="input-field w-full rounded-xl border border-gray-200 py-3 pl-4 pr-10 text-[15px] outline-none focus:border-brand"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IconClock />
                </span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Ends</label>
              <div className="relative">
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => set('endTime', e.target.value)}
                  className="input-field w-full rounded-xl border border-gray-200 py-3 pl-4 pr-10 text-[15px] outline-none focus:border-brand"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <IconClock />
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Set Date</label>
            <div className="relative">
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className="input-field w-full rounded-xl border border-gray-200 py-3 pl-4 pr-10 text-[15px] outline-none focus:border-brand"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <IconCalendar />
              </span>
            </div>
            {form.date && (
              <p className="mt-1 text-xs text-gray-400">{formatDisplayDate(form.date)}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Add Description"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Priority</label>
            <div className="flex flex-wrap gap-2">
              {['low', 'medium', 'high'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set('priority', p)}
                  className={`min-w-[5.5rem] flex-1 rounded-xl border py-2.5 text-sm font-medium capitalize transition-colors sm:flex-none sm:px-6 ${
                    form.priority === p
                      ? 'border-brand bg-brand text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-brand/40'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="sticky bottom-0 w-full rounded-2xl bg-brand py-4 text-base font-semibold text-white shadow-fab transition hover:bg-brand-dark active:scale-[0.99]"
          >
            {editingTask ? 'Save' : 'Create task'}
          </button>
        </form>
      </div>
    </div>
  )
}
