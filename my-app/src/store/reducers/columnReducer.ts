import { Actions } from '../../types/enum';
import { ColumnItemType, IColumn } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const columnReducer = (state: IColumn = initialState.column, action: Action) => {
    switch (action.type) {
        case Actions.SET_COLUMN_TITLE: {
            return {
                ...state,
                columnTitle: action.payload,
            }
        }
        case Actions.SET_COLUMN_LIST: {
            return {
              ...state,
              columnList: [...action.payload],
            }
        }
        
        case Actions.EDIT_COLUMN_TITLE: {
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
          case Actions.SORT_COLUMN_LIST: {
            console.log(action.payload)
            const sortedList = state.columnList.map((c: ColumnItemType) => {
              if(c.columnId === action.payload.columnDrop.columnId) {
                return {...c, columnOrder: action.payload.columnDrag.columnOrder};
              }
              if(c.columnId === action.payload.columnDrag.columnId) {
                return {...c, columnOrder: action.payload.columnDrop.columnOrder};
              }
              return c;
            })
              return {
                ...state,
                columnList: sortedList,
              }
          }
        default: 
            return state;
    }
}