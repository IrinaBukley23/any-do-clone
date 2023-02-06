import { combineReducers } from 'redux';
import authorizationReducer from './authorization';
import { columnReducer } from './columnReducer';
import loginSlice from './loginSlice';

export default combineReducers({
    authorization: authorizationReducer,
    login: loginSlice,
    column: columnReducer,
})