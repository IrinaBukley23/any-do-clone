import { combineReducers } from 'redux';
import { columnReducer } from './columnReducer';
import loginSlice from './loginSlice';
import { taskReducer } from './taskReducer';

export default combineReducers({
    login: loginSlice,
    column: columnReducer,
    task: taskReducer,
})