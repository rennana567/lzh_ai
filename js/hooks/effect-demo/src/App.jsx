import { useEffect, useState } from 'react'
import Timer from './components/Timer'
import './App.css'

function App() {
  const [cont,setCont] = useState(0);
  const [num,setNum] = useState(0);
  const [repos,setRepos] = useState([])
  const [isTimerOn,setIsTimerOn] = useState(true)
  // console.log('组件函数开始执行');
  // // 正作用？渲染组件
  // // 渲染完组件后搞点事情
  // // 生命周期
  // useEffect(()=>{
  //   console.log('num更新了')
  // },[num])
  // // 生命周期的更新
  // // 第二个参数是依赖项数组
  // useEffect(()=>{
  //   console.log('cont更新了')
  // },[cont])

  // useEffect(()=>{
  //   console.log('cont和num都更新了')
  // },[cont,num])

  useEffect(()=>{
    // api 数据 动态的
    console.log('只在组件挂载时运行一次')
    const fetchRepos = async () => {
      const response = await fetch('https://api.github.com/users/rennana567/repos')
      const data = await response.json()
      console.log(data);
      setRepos(data)
    }
    fetchRepos()
  },[])

  // // 组件的模板编译
  // // 挂载到root节点上
  // console.log('组件的模板编译');
  return (
    <>
      {cont}<br/>
      <button onClick={()=>{
        setCont(cont+1)
      }}>点我</button>

      <br/>
      {num}<br/>
      <button onClick={()=>{
        setNum(num+1)
      }}>点我</button>

      <ul id='repos'>
        {
          repos.map(repo =>
            <li key={repo.id}>{repo.full_name}</li>
          )
        }
      </ul>
      {isTimerOn && <Timer/>}
      <button onClick={()=>{
        setIsTimerOn(!isTimerOn)
      }}>toggle timer</button>
    </>
  )
}

export default App
