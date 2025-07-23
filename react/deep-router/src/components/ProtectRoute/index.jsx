import { 
    Navigate,
    useLocation
 } from 'react-router-dom'
// 鉴权组件
const ProtectRoute = (props) => { 
    // console.log(props,'props')
    // 并非子组件
    // children 属性  提升定制性
    const { children } = props;
    const { pathname } = useLocation(); // 获取当前路径
    // console.log(location,'location')
    const isLogin = localStorage.getItem('isLogin') === 'true'
    // console.log(isLogin,'isLogin')
    if(!isLogin) {
      return <Navigate to='/login' state={{from:pathname}} />
    }
    return children
}

export default ProtectRoute;