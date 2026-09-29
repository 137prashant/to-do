import { useState } from 'react'
import GetStarted from './components/GetStarted'
import Home from './components/Home'
import SearchScreen from './components/SearchScreen'
import { useTasks } from './hooks/useTasks'

export default function App() {
  const [screen, setScreen] = useState('splash')
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks()

  if (screen === 'splash') {
    return <GetStarted onStart={() => setScreen('home')} />
  }

  if (screen === 'search') {
    return (
      <SearchScreen
        tasks={tasks}
        onBack={() => setScreen('home')}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onToggle={toggleComplete}
      />
    )
  }

  return (
    <Home
      tasks={tasks}
      onAdd={addTask}
      onUpdate={updateTask}
      onDelete={deleteTask}
      onToggle={toggleComplete}
      onOpenSearch={() => setScreen('search')}
    />
  )
}
