import { 
    useState,
    useEffect 
} from "react"

export const useTodos = () => {
    
    const [todos,setTodos] = useState(JSON.parse(
        localStorage.getItem('todos')
    ))
    // 新增todo
    const addTodo = (text) => {
        // setTodo
        // 数据状态时对象的时候
        setTodos([
            ...todos,
            {
                id:Date.now(),
                title:text,
                isComplete:false
            }
        ])
    }

    const onToggle = (id) => {
        // todos 数组找到id 为id， isComplete !isComplete
        // 响应式？ 返回一个全新的todos
        setTodos(todos.map(todo => 
            todo.id === id 
            ? {...todo,isComplete:!todo.isComplete} 
            : todo
        ))
        // state 是对象或数组的时候
        // setTodos([...todos])
    }

    const onDelete = (id) =>{
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return {
        todos,
        addTodo,
        onToggle,
        onDelete
    }
}
