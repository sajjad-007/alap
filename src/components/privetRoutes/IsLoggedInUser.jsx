import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Login from '../../pages/auth/login/Login'
import { Outlet } from 'react-router-dom'

const IsLoggedInUser = () => {
    const data = useSelector(state => state.loginUserData.value)
    return (
    data ? <Outlet/> : <Login/> 
  )
}

export default IsLoggedInUser