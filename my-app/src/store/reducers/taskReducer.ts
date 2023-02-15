import { Actions } from '../../types/enum';
import { ITask, TaskItemType } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const taskReducer = (state: ITask = initialState.task, action: Action) => {
    switch (action.type) {
        case Actions.SET_TASK_TITLE: {
          return {
              ...state,
              taskTitle: action.payload,
          }
        }
        case Actions.SET_TASK_DESCR: {
          return {
              ...state,
              taskDescr: action.payload,
          }
        }
        case Actions.SET_TASK_LIST: {
          return {
              ...state,
              taskList: [...action.payload],
          }
        }
        case Actions.SET_CURRENT_COLUMN_ID: {
          return {
              ...state,
              currentColumnId: action.payload,
          }
        }
        case Actions.EDIT_TASK_TITLE: {
          const newTaskList = state.taskList.map((item: TaskItemType) => {
            if (item.taskId === action.payload.taskId) {
              return {
                ...item,
                taskTitle: action.payload.taskTitle,
              };
            }
            return item;
          });
          return {
            ...state,
            taskList: newTaskList,
          };
        }
        case Actions.EDIT_TASK_DESCR: {
          const newTaskList = state.taskList.map((item: TaskItemType) => {
            if (item.taskId === action.payload.taskId) {
              return {
                ...item,
                taskDescr: action.payload.taskDescr,
              };
            }
            return item;
          });
          return {
            ...state,
            taskList: newTaskList,
          };
        }
        case Actions.REMOVE_TASK: {
          return {
            ...state,
            taskList: state.taskList.filter((task) => task.taskId !== action.payload),
          };
          }
        default: 
          return state;
    }
}