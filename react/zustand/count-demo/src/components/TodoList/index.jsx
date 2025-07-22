import { useTodosStore } from '../../store/todos'


const TodoList = () => {
    const todos = useTodosStore(state => state.todos)
    return (
        <div className='container'>{/* 列表 */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type='checkbox'
                            checked={todo.completed}
                            onChange={() => useTodosStore(state => state.toggleTodo(todo.id))}
                        />
                        <span>{todo.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList