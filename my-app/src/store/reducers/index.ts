import { combineReducers } from 'redux';
import { columnReducer } from './columnReducer';
import loginSlice from './loginSlice';

export default combineReducers({
    login: loginSlice,
    column: columnReducer,
})