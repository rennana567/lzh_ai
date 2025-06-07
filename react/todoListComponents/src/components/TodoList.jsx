import './Todo.css'
import TodoFrom from './TodoFrom'
import Todos from './Todos'
function TodoList(){
    return(
        <div className='container'>
            <h1 className='title'>Todo List</h1>
            <TodoFrom/>
            <Todos/>
        </div>
    )
}

export default TodoList;// 导出组件