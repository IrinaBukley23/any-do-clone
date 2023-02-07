import { Actions } from '../../types/enum';
import { ColumnItemType, IColumn } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const columnReducer = (state: IColumn = initialState.column, action: Action) => {
    switch (action.type) {
        case Actions.SET_COLUMNTITLE: {
            console.log(state);
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
        case Actions.EDIT_COLUMNTITLE: {
            const newColumnList = state.columnList.map((item: ColumnItemType) => {
              if (item.columnId === action.payload.columnId) {
                return {
                  ...item,
                  columnTitle: action.payload.columnTitle,
                };
              }
              return item;
            });
            return {
              ...state,
              columnList: newColumnList,
            };
        }
        case Actions.REMOVE_COLUMN: {
            return {
              ...state,
              columnList: state.columnList.filter((column) => column.columnId !== action.payload),
            };
          }
        default: 
            return state;
    }
}