import {
    useEffect,
    memo
} from 'react'

const Button = ({number}) => {
    useEffect(() => {
        console.log('Button effect')
    },[number])
    console.log('Button render')
    return <button>{number}</button>
}

// 高阶组件
export default memo(Button)