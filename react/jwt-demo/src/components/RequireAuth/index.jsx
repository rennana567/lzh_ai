import { useUserStore } from "../../store/user";
import { 
    useNavigate,
    useLocation 
} from "react-router-dom";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
    useEffect(()=>{
        if (!isLogin) {
            navigate('/login',{from: pathname})
        }
    },[])
    
    const { isLogin } = useUserStore();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    
    return (
        <>
            {children}
        </>
    )
}

export default RequireAuth;