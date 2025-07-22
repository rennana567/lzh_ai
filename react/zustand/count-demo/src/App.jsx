import './App.css'
import Counter from './components/Counter'
import { useCounterStore } from './store/count'
import TodoList from './components/TodoList'
import RepoList from './components/RepoList'

function App() {
  const {count} = useCounterStore();
  return (
    <>
      App中的{count}
      <br />
      <Counter></Counter>
      <br />
      <TodoList></TodoList>
      <br />
      <RepoList></RepoList>
    </>
  )
}

export default App
