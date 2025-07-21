import { 
  useState,
  useReducer
 } from 'react'
import './App.css'

// function App() {


//   return (
//     <>
//       <LoginContext.Provider>
//         <ThemeContext.Provider>
//           <TodoContext.Provider>
//             <Layout>
//               <Header />
//               <Main />
//               <Footer />
//             </Layout>
//           </TodoContext.Provider>
//         </ThemeContext.Provider>
//       </LoginContext.Provider>
//     </>
//   )
// }


// 管理好多
const initialState = {
  count:0,
  // isLogin:false,
  // theme:'light',
}

// 管理 分部门
// reducer 纯函数  返回可靠的状态
// 状态生产器
// case 状态修改的规定
const reducer = (state,action) => {
  // increment,decrement,
  // {type:'increment'}
  switch(action.type){
    case 'increment':
      // 新的状态
      return{
        count:state.count + 1
      }
    case 'decrement':
      return{
        count:state.count - 1
      }
    case 'incrementByNum':
      return{
        count:state.count + parseInt(action.payload)
      }
    default:
      return state
  }
}
function App(){
  // 初始值 initialVale
  // 当前的状态值 旧状态 新状态
  // 界面由当前状态来驱动
  // 修改状态的方法
  // 响应式
  // 管理 useState 有的，都有 高级点
  const [count,setCount] = useState(5)
  // 大型项目
  // dispatch 派发 函数
  // 固定参数 {type:''} action_type
  const [state,dispatch] = useReducer(reducer,initialState)
  return(
    <>
      <button onClick={()=>dispatch({type:'decrement'})}>-</button>
      {state.count}
      <button onClick={()=>dispatch({type:'increment'})}>+</button>
      <br />
      <input type="text" value={count} onChange={(e)=>setCount(e.target.value)} />
      <button onClick={()=>dispatch({type:'incrementByNum',payload:count})}>incrementByNum</button>
    </>
  )
}

export default App
