// 内置的hooks 函数
import{useState} from 'react'//导入useState钩子函数，用于管理组件状态
import './Todo.css'
import TodoFrom from './TodoFrom'
import Todos from './Todos'
function TodoList(){
    // 静态页面？
    // DOM 数组 -> map -> join('') -> innerHTML 底层API 编程
    // 缺点：低效
    // 面向业务 懂业务
    // 数据 -> 变化 -> 数据状态 -> 自动刷新页面 -> **数据****驱动**界面
    // 数组， 第一项是数据变量，第二项是函数 执行 并传入新的todos
    // 页面会自动更新
    // 挂载点 tbody
    // { todos.map }
    // setTodos DOM 及动态更新
    // 响应式界面开发
    // num 数据状态  setNum 修改数据状态的方法
    // es6 解构
    const [num,setNum] = useState('123')
    const [title,setTitle]=useState('Todo List')
    const [todos,setTodos]=useState([
        {
            id:1,
            text:'1',
            completed:false
        }
    ])

    const handleAdd = (text) =>{
        setTodos([
            ...todos,{
                id:todos.length+1,
                text:text,
                completed:false
            }
        ])
    }
    // setTimeout(()=>{
    //     setTodos([...todos,{id:2,text:'2',completed:false}])
    //     // 以前： 找到DOM 然后更新innerHTML
    //     // 现在： 聚焦业务 setTitle
    //     setTitle('Todo List 2')
    //     setNum('456')
    // },5000)
    return(
        <div className='container'>
            <h1 className='title'>{ title } {num}</h1>
            {/* 表单 */}
            <TodoFrom onAdd= {handleAdd}/>
            {/* 列表 */}
            <Todos todos={todos}/>
            {/* {   // 当下这个位置
                // 数据为王 界面是被驱动的
                // 数据驱动
                // 数据绑定  data binding
                // 发生改变后 自动的改变
                todos.map(todo=>(
                    <li>{todo.text}</li>
                )) 
            } */}
        </div>
    )
}

export default TodoList;// 导出组件