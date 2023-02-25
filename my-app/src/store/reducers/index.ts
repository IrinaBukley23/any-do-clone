import calendarReducer from './calendarReducer'
import { combineReducers } from 'redux'
import authorizationReducer from './authorization'
import { langReducer } from './techReducer'
import projectReducer from './projectReducer'
import columnsReducer from './columns'
import cardsReducer from './cards'
import usersReducer from './users'

export default combineReducers({
  authorization: authorizationReducer,
  columns: columnsReducer,
  calendar: calendarReducer,
  project: projectReducer,
  lang: langReducer,
  cards: cardsReducer,
  users: usersReducer
})
