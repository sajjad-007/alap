import { createSlice } from '@reduxjs/toolkit'

export const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    value:  null ,
  },
  // reducers er kaj holo update kora
  reducers: {
    msgUserUpdate: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {msgUserUpdate} = msgSlice.actions

export default msgSlice.reducer