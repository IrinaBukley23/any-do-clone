import { Actions } from '../../types/enum';
import { IColumn } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const columnReducer = (state: IColumn = initialState.column, action: Action) => {
    switch (action.type) {
        case Actions.SET_COLUMNTITLE: {
            console.log(action.payload)
            return {
                ...state,
                columnTitle: action.payload,
            }
        }
        case Actions.SET_COLUMNLIST: {
            return {
                ...state,
                columnList: [...action.payload],
            }
        }
        default: return state;
    }
}