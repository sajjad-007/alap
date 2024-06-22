import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice'
import msgSlice from '../slice/msgSlice'


export default configureStore({
  reducer: {
    loginUserData: authSlice,
    activeUserData: msgSlice,
  }
})