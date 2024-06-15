import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../counter/authSlice'


export default configureStore({
  reducer: {
    loginUserData: authSlice
  }
})