import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginSlice'

const rootReducer = combineReducers({ loginReducer })

const store = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>

export default store
