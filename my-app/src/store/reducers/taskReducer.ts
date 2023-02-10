import { Actions } from '../../types/enum';
import { ITask, TaskItemType } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const taskReducer = (state: ITask = initialState.task, action: Action) => {
    switch (action.type) {
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
          return {
              ...state,
              taskList: [...action.payload],
          }
        }
        case Actions.EDIT_TASKTITLE: {
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
        case Actions.EDIT_TASKDESCR: {
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