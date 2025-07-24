import {
    useRef
} from 'react'
import {
    useUserStore
} from '../../store/user'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const { login } = useUserStore()
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        if(!username || !password) {
            alert('请输入用户名和密码')
            return
        }
        login({ username, password })
        setTimeout(()=>{
            navigate('/')
        },1000)
    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    <div>
                        <label htmlFor="">用户名</label>
                        <input
                            type="text"
                            id='username'
                            ref={usernameRef}
                            required
                            placeholder='请输入用户名' />
                    </div>
                    <div>
                        <label htmlFor="">密码</label>
                        <input
                            type="password"
                            ref={passwordRef}
                            id='password'
                            placeholder='请输入密码'
                            required />
                    </div>
                </div>
                <div>
                    <button type="submit">登录</button>
                </div>
            </form>
        </>
    )
}

export default Login;