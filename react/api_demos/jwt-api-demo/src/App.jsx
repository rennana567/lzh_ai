import {
  useState,
  useEffect
} from 'react'
import './App.css'
import {
  getTodos,
  getRepos
} from '@/api'

function App() {
  // const [todos, setTodos] = useState([])
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const todosResult =await getTodos()
      // console.log(todosResult)
      // setTodos(todosResult.data.data)
      const reposResult = await getRepos()
      setRepos(reposResult.data)
    }
    fetchData()
  },[])
  return (
    <>
      <h2>Todo List</h2>
      {/* <ul>
        {
          todos.map(todo => (
            <li key={todo.id}>
              {todo.title}
            </li>
          ))
        }
      </ul> */}
      <h2>Repos</h2>
      <ul>
        {
          repos.map(repo => (
            <li key={repo.id}>
              {repo.name}
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
