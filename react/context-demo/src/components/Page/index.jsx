import React, { createContext, useContext } from 'react'
import Child from '../Child'
import useTheme  from '@/hooks/useTheme'

const Page = () => {
    const theme  = useTheme()
  return (
    <>
        <h1>{theme}</h1>
        <Child />
    </>
  )
}

export default Page