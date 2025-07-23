import{
    useState,
} from 'react'
import {
    useNavigate, // Navigate 组件 js 跳转
    useLocation
} from 'react-router-dom'

const Login = ()=>{
    const location = useLocation();
    // console.log(location.state.form)
    const navigate = useNavigate(); // navigate 能力

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(username,password)
        if(username === 'admin' && password === '123456'){
            localStorage.setItem('isLogin','true')
            console.log(location.state.from)
            navigate(location?.state?.from || '/')
        }else{
            alert('用户名或密码错误')
        }
    }
    return(
        <form onSubmit={handleSubmit}>
          <h1>登录页面</h1>
          <input 
          type="text" 
          placeholder="请输入用户名"
          required
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <br />
          <input 
          type="password" 
          placeholder="请输入密码"
          required
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <button type="submit">登录</button>
        </form>
    )
}

export default Login