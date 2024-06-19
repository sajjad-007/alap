import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: localStorage.getItem('loggedInfo') ? JSON.parse(localStorage.getItem('loggedInfo')): null ,
  },
  // reducers er kaj holo update kora
  reducers: {
    loginUser: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {loginUser} = authSlice.actions

export default authSlice.reducer