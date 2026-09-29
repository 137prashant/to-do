import { useRef, useState } from 'react'
import { IconCheck, IconEdit, IconTrash } from './Icons'

export default function TaskRow({
  task,
  onToggle,
  onEdit,
  onDelete,
  showActions = true,
  variant = 'card',
  showDivider = false,
}) {
  const [offset, setOffset] = useState(0)
  const startX = useRef(0)
  const isDone = task.status === 'completed'
  const isList = variant === 'list'

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const onTouchMove = (e) => {
    const diff = startX.current - e.touches[0].clientX
    if (diff > 0) setOffset(Math.min(diff, 80))
    else setOffset(0)
  }

  const onTouchEnd = () => {
    if (offset > 50) onDelete(task.id)
    setOffset(0)
  }

  return (
    <div
      className={`relative overflow-hidden ${
        isList ? '' : 'rounded-xl border border-transparent hover:border-gray-100'
      }`}
    >
      <div className="absolute inset-y-0 right-0 flex w-20 items-center justify-center bg-red-500 text-xs font-medium text-white md:hidden">
        Delete
      </div>
      <div
        className={`relative flex min-h-[52px] items-center gap-3 transition-transform ${
          isList
            ? `bg-white px-4 py-2 ${showDivider ? 'border-b border-gray-100' : ''}`
            : 'rounded-xl bg-white py-3 pl-2 pr-1 sm:px-3'
        }`}
        style={{ transform: `translateX(-${offset}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            isDone
              ? 'border-brand bg-brand text-white'
              : 'border-brand bg-white text-transparent'
          }`}
          aria-label={isDone ? 'Mark in progress' : 'Mark complete'}
        >
          <IconCheck />
        </button>
        <p
          className={`min-w-0 flex-1 py-1 text-[15px] font-medium leading-snug text-gray-800 ${
            isDone ? 'text-gray-400 line-through' : ''
          }`}
        >
          {task.title}
        </p>
        {showActions && (
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 hover:text-red-500"
              aria-label="Delete task"
            >
              <IconTrash />
            </button>
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 hover:text-brand"
              aria-label="Edit task"
            >
              <IconEdit />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
