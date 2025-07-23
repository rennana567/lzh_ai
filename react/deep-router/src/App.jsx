import { 
  useState,
  Suspense,
  lazy // 懒加载
} from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
// import Home from './pages/Home'
// import About from './pages/About'
import Navigation from './components/Navigation'
import ProtectRoute from './components/ProtectRoute'
import Pay from './pages/Pay'
import Login from './pages/Login'

// 函数  路由 -> Route 组件
// 新的组件
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

// 30几个页面，只用import会卡死

function App() {

  return (
    <>
      <Router>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes> 
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            {/* 鉴权 */}
            <Route path='/pay' element={
              <ProtectRoute>
              <Pay />
              </ProtectRoute>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
