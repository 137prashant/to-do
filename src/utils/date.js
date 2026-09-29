const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function parseDateKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isSameDay(a, b) {
  return toDateKey(a) === toDateKey(b)
}

/** Monday 00:00 of the week containing `date` */
export function getWeekMonday(date) {
  const d = startOfDay(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

export function getWeekDays(monday) {
  return DAY_LABELS.map((label, i) => {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    return { label, date: day }
  })
}

export function isDateInWeek(dateKey, weekMonday) {
  const d = parseDateKey(dateKey)
  const start = startOfDay(weekMonday)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const t = startOfDay(d)
  return t >= start && t <= end
}

export function formatDisplayDate(dateKey) {
  const d = parseDateKey(dateKey)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${days[d.getDay()]} ${d.getDate()}, ${months[d.getMonth()]}`
}

export function todayKey() {
  return toDateKey(new Date())
}
