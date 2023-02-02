import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}
export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

export default loginSlice.reducer
