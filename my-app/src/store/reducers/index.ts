import calendarReducer from './calendarReducer'
import { combineReducers } from 'redux'
import authorizationReducer from './authorization'
import { columnReducer } from './columnReducer'
import loginSlice from './loginSlice'
import { taskReducer } from './taskReducer'
export default combineReducers({
  authorization: authorizationReducer,
  login: loginSlice,
  column: columnReducer,
  calendar: calendarReducer,
  task: taskReducer,
})
