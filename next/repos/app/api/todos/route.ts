import {
    NextResponse, // res
} from 'next/server' // api server
import { text } from 'stream/consumers'
import {
    Todo,
} from '@/app/types/todo'

// ts 是js超集

let todos:Todo[] = [
    {
        id: 1,
        text: '定仙游',
        completed: true,
    },
    {
        id: 2,
        text: '春秋',
        completed: true,
    },
    {
        id: 3,
        text: 'hello world',
        completed: false,
    },
    {
        id: 4,
        text: 'hello world',
        completed: false,
    },
    {
        id: 5,
        text: 'hello world',
        completed: false,

    }
];
// Resful 一切皆资源
// 向用户暴露资源的
// method + 资源 URL定义规则
export async function GET(){
    return NextResponse.json(todos)
}

export async function POST(request:Request) { 
    // 获取请求体 body json
    const data = await request.json()
    // 核心的数据，函数的参数，返回值
    const newTodo:Todo = {
        id: + Date.now(),
        text: data.text,
        completed: false
        // typescript 除了强类型外，代码提示更好，写起来更快
    }
    todos.push(newTodo)
    return NextResponse.json(newTodo)
}

export async function PUT(request:Request) {
    const data = await request.json() // 请求体
    todos = todos.map(todo => todo.id === data.id ? {...todo,completed:data.completed} : todo)
    return NextResponse.json(todos)
}

// restful 简历
export async function DELETE(request:Request){
    const data = await request.json()
    todos = todos.filter(todo => todo.id !== data.id)
    return NextResponse.json(todos)
}