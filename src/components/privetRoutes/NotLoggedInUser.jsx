import React from 'react'
import { Login } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'


const NotLoggedInUser = () => {
    // const navigate = useNavigate();
    const data = useSelector(state => state.loginUserData.value)
  return (
   data 
   ? <outlet/> 
   :  <Login/> 
  )
}

export default NotLoggedInUser