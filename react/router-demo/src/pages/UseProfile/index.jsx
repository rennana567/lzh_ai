import {
    useEffect,
} from 'react'
import {
    useParams,
} from'react-router-dom'
const UseProfile = () => {
    const { id } = useParams() 
    useEffect(() => {
    //   const id = window.location
      
    })
  return (
    <div>
      <h1>User Profile {id}</h1>
    </div>
  )
}

export default UseProfile