import { current } from '@reduxjs/toolkit';
import { Actions } from '../../types/enum';
import { ColumnItemType, IColumn } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const columnReducer = (state: IColumn = initialState.column, action: Action) => {
    switch (action.type) {
        case Actions.SET_COLUMNTITLE: {
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
        case Actions.SET_TASKTITLE: {
          return {
              ...state,
              taskTitle: action.payload,
          }
        }
        case Actions.SET_TASKDESCR: {
          return {
              ...state,
              taskDescr: action.payload,
          }
        }
        case Actions.SET_TASKLIST: {
          console.log(state.currentId, action.payload)
          if(state.currentId === state.columnId) {
            return {
              ...state,
              taskList: [...action.payload],
            }
          } else {
            return;
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