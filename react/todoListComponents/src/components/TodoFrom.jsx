import { useState } from 'react'
function TodoFrom(props) {
    const onAdd = props.onAdd
    const [text,setText] = useState('2')
    const handleSubmit = (e) =>{
        // 阻止默认行为
        // 由js 来控制
        e.preventDefault();// event api 阻止默认行为
        // console.log(text)
        onAdd(text)
        // todos？ 打报告
    }
    const handleChange = (e) =>{
        // 拿到用户输入的值
        setText(e.target.value)
    }
    return (
        <form action="http://www.baidu.com" onSubmit={handleSubmit}>
            <input type="text" placeholder="请输入待办事项：" value={text} onChange={handleChange}/>
            <button type="submit">添加</button>
        </form>
    )
}

export default TodoFrom;