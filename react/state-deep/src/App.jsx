import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('hello')
  const [color, setColor] = useState('red')
  const handleClick = () => {
    // 异步 不是同步
    // react 性能优化  合并多次更新  统一处理

    // 页面重绘重排
    // 数据绑定  界面更新
    // JS 引擎 V8  渲染引擎 Blink
    // 重绘重排
    // setState 函数式更新
    // 保证每个更新都基于上一个最新的更新
    // 界面的更新合并为一次的，

    setCount(count => count + 1)
    setCount( count + 100)
    setCount(count => count + 1)
    
    setColor(color==='blue'?'red':'blue')
    setTitle(title==='world'?'hello':'world')
  }

  return (
    <>
      <h1>{title}</h1>
      <p style={{ color }}>当前记数：{count}</p>
      <button onClick={handleClick}>+3</button>
    </>
  )
}

export default App
