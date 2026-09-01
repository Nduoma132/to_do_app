/*
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  async function loadTodos() {
    const res = await fetch('/api/todos')
    setTodos(await res.json())
  }

  useEffect(() => { loadTodos() }, [])

  async function addTodo(event) {
    event.preventDefault()
    if (!title.trim()) return
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    setTitle('')
    loadTodos()
  }

  async function toggleTodo(id) {
    await fetch('/api/todos/' + id, { method: 'PATCH' })
    loadTodos()
  }

  async function deleteTodo(id) {
    await fetch('/api/todos/' + id, { method: 'DELETE' })
    loadTodos()
  }

  return (
    <div className="app">
      <h1>My To-Do List</h1>

      <form onSubmit={addTodo}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs doing?"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.is_done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className={todo.is_done ? 'done' : ''}>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>Nothing here yet. Add your first to-do.</p>}
    </div>
  )
}

export default App
*/

import { useState, useEffect } from 'react'
import './App.css'
function App() {
 const [todos, setTodos] = useState([])
 const [title, setTitle] = useState('')
 const [version, setVersion] = useState('')
 // fetch the list from the API
 async function loadTodos() {
 const res = await fetch('/api/todos')
 setTodos(await res.json())
 }
 useEffect(() => {
 loadTodos()
 fetch('/api/health')
 .then((res) => res.json())
 .then((data) => setVersion(data.version))
 }, [])
 async function addTodo(event) {
 event.preventDefault()
 if (!title.trim()) return
 await fetch('/api/todos', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ title })
 })

 setTitle('')
 loadTodos()
 }
 async function toggleTodo(id) {
 await fetch('/api/todos/' + id, { method: 'PATCH' })
 loadTodos()
 }
 async function deleteTodo(id) {
 await fetch('/api/todos/' + id, { method: 'DELETE' })
 loadTodos()
 }
 return (
 <div className="app">
 <h1>My To-Do List <span className="version">{version}</span></h1>
 <form onSubmit={addTodo}>
 <input
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 placeholder="What needs doing?"
 />
 <button type="submit">Add</button>
 </form>
 <ul>
 {todos.map((todo) => (
 <li key={todo.id}>
 <input
 type="checkbox"
 checked={todo.is_done}
 onChange={() => toggleTodo(todo.id)}
 />
 <span className={todo.is_done ? 'done' : ''}>{todo.title}</span>
 <button onClick={() => deleteTodo(todo.id)}>Delete</button>
 </li>
 ))}
 </ul>
 {todos.length === 0 && <p>Nothing here yet. Add your first to-do.</p>}
 </div>
 )
}
export default App