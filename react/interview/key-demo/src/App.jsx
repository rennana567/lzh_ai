import { 
  useState,
  useEffect
} from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' }
  ])
  useEffect(() => {
    setInterval(()=>{
      // setTodos(prev => prev.map(todo => {
      //   if(todo.id === 1)return {
      //     ...todo,
      //     name:'张三改'
      //   }
      //   return todo
      // }))
      // setTodos(prev => {
      //   return [
      //     ...prev,
      //     {
      //       id:4,
      //       name:'赵六'
      //     }
      //   ]
      // })
      setTodos(prev => {
        return [
          {
            id:new Date(),
            name:'赵六'+new Date(),
          },
          ...prev
        ]
      })
    },2000)
  },[])
  return (
    <>
      <ul>
        {
          todos.map(item => (
            <li key={item.id}>
              {item.name}
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
