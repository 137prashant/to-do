import { useCallback, useEffect, useState } from 'react'
import { createId, loadTasks, saveTasks } from '../utils/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState(() => loadTasks())

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = useCallback((task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: createId(),
        status: task.status || 'in-progress',
        createdAt: new Date().toISOString(),
      },
    ])
  }, [])

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toggleComplete = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'completed' ? 'in-progress' : 'completed',
            }
          : t,
      ),
    )
  }, [])

  return { tasks, addTask, updateTask, deleteTask, toggleComplete }
}
