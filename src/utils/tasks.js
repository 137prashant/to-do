import { isDateInWeek } from './date'
import { getWeekMonday, toDateKey } from './date'

const STORAGE_KEY = 'todo-app-tasks'

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function seedTasks() {
  const today = new Date()
  const monday = getWeekMonday(today)
  const dayOffset = (n) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + n)
    return toDateKey(d)
  }

  const wed = dayOffset(2)
  const thu = dayOffset(3)
  const todayKey = toDateKey(today)

  return [
    {
      id: createId(),
      title: 'Buy a cat food',
      description: 'Get dry food from the pet store',
      date: wed,
      startTime: '09:00',
      endTime: '10:00',
      priority: 'medium',
      status: 'completed',
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      title: 'My cat vaccination',
      description: 'Annual vet visit',
      date: wed,
      startTime: '11:00',
      endTime: '12:30',
      priority: 'high',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      title: 'Bake a bread',
      description: '',
      date: wed,
      startTime: '14:00',
      endTime: '16:00',
      priority: 'low',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      title: 'Homemade pasta',
      description: 'Try new recipe',
      date: wed,
      startTime: '18:00',
      endTime: '19:30',
      priority: 'medium',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      title: 'Finishing Wireframe',
      description: 'Complete mobile wireframes',
      date: thu,
      startTime: '10:00',
      endTime: '12:00',
      priority: 'high',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    },
    {
      id: createId(),
      title: 'Finish assignment',
      description: 'Submit GitHub repo',
      date: todayKey,
      startTime: '15:00',
      endTime: '17:00',
      priority: 'high',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    },
  ]
}

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedTasks()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      return seeded
    }
    return JSON.parse(raw)
  } catch {
    const seeded = seedTasks()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function getWeekStats(tasks, weekMonday) {
  const weekTasks = tasks.filter((t) => isDateInWeek(t.date, weekMonday))
  const completed = weekTasks.filter((t) => t.status === 'completed').length
  const pending = weekTasks.filter((t) => t.status === 'in-progress').length
  const total = weekTasks.length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { completed, pending, total, percent }
}
