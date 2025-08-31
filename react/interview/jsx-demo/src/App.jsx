import { 
  useState,
  createElement 
} from 'react'
import './App.css'
import React from 'react'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' }
  ])
  const element = <h1>Hello</h1>
  const element2 = createElement('h1',{className:'title',id:'title'},'hello')
  

  return (
    <>
      {element}
      {
        element2
      }
      <ul>
        {
          todos.map(todo => <li key={todo.id}>{todo.name}</li>)
        }

      </ul>

      <ul>
        {
          todos.map(todo => {
            return createElement('li', { key: todo.id }, todo.name)
          })
        }
      </ul>
    </>
  )
}

export default App
