import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TodoApp from './components/TodoApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' w-[100vw] h-[100vh]'>
      <TodoApp/>
    </div>
  )
}

export default App
