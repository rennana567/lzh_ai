import { Outlet } from "react-router-dom"
const Product = () => {
    return (
      <div>
        <h1>产品列表</h1>
        {/* 二级路由占位符 */}
        <Outlet />
      </div>
    )
}
export default Product