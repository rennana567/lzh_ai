import { 
  useState,
  useEffect,
  useCallback,
  useMemo // 缓存一个复杂计算的值
} from 'react'
import './App.css'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(0)

  console.log('App render')

  const expensiveComputation = (n) => {
    console.log('expensiveComputation')
    // 复杂计算  开销大
    for(let i = 0;i < 100000; i++){
      i++
    }
    return n*2
  }
  
  const result = useMemo(() => expensiveComputation(number), [number])

  useEffect(() => {
    console.log('count',count)
  },[count])
  useEffect(() => {
    console.log('number',number)
  },[number])
  
  // rerender 重新生成
  // 不要重新生成，和useEffect [] 一样
  // callback 回调函数 缓存
  const handleClick = useCallback(() => {
    console.log('handleClick')
  },[number])

  return (
    <>
      <div>{result}</div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>count增加</button>
      <br />
      <button onClick={() => setNumber(number + 1)}>number增加</button>
      <br />
      <Button number={number} onClick={handleClick}>number点击</Button>
    </>
  )
}

export default App
