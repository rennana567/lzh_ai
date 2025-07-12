import {
  BrowserRouter as Router, // 前端路由
  Routes, // 路由设置容器
  Route // 单条路由
} from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import UseProfile from './pages/UseProfile'
import Products from './pages/Products/Products'
import ProductDetails from './pages/Products/ProductsDetails'
import NewProduct from './pages/Products/NewProduct'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* 前端路由接管一切，配置 */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/user/123' element={<UseProfile />}/>
          <Route path='/products' element={<Products />}>
          {/* 二级路由 */}
            <Route path=':productsId' element={<ProductDetails />}/>
            <Route path=':new' element={<NewProduct />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
