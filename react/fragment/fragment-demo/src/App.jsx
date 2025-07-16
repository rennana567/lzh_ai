import { 
  useState,
  Fragment // 文档碎片 组件
 } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // function Demo(){
  //   return (
  //     // DOM 树多了一层不需要的节点，DOM解析性能下降
  //     <>
  //       <h1>Hello</h1>
  //       <p>泥猴</p>
  //     </>
  //   )
  // }

  const items = [
      {
        id:1,
        name:'泥猴',
        hobby:'bananaaaaaaaa...'
      },
      {
        id:2,
        name:'泥猴2',
        hobby:'bananaaaaaaaa...'
      },
    ]

  function Demo(props){
    return(
        props.items.map(item =>(
          <Fragment key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.hobby}</p>
          </Fragment>
        ))  
    ) 
  }
  return (
    <>
      <Demo items={items}/>
    </>
  )
}

export default App
