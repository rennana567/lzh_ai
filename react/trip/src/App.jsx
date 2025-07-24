import {
  useState,
  lazy,
  Suspense
} from 'react'
import './App.css'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import BlankLayout from '@/components/BlankLayout'

const Home = lazy(() => import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Discount = lazy(() => import('@/pages/Discount'))
const Collection = lazy(() => import('@/pages/Collection'))
const Trip = lazy(() => import('@/pages/Trip'))
const Account = lazy(() => import('@/pages/Account'))

function App() {
  const [value, setValue] = useState('');
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* 带有tabbar的Layout */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/account" element={<Account />} />
            <Route path="/search" element={<Search />} />
          </Route>
       
        {/* 空的Layout */}
        
        <Route element={<BlankLayout />}>
          <Route path="/search" element={<Search />} />
        </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
