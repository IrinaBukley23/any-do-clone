import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
}
export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

export default loginSlice.reducer
