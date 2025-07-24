import {
  Outlet
} from 'react-router-dom'

const BlankLayout = () => {
  return (
    <>
      <Outlet />
      <h1>BlankLayout</h1>
    </>
  )
}

export default BlankLayout