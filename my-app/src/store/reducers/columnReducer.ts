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
            const sortedList = state.columnList.map((column: ColumnItemType) => {
              if(column.columnId === action.payload.columnDrop.columnId) {
                return {...column, columnOrder: action.payload.columnDrag.columnOrder};
              }
              if(column.columnId === action.payload.columnDrag.columnId) {
                return {...column, columnOrder: action.payload.columnDrop.columnOrder};
              }
              return column;
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