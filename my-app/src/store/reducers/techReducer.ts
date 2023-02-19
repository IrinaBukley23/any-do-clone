import { Actions } from '../../types/enum';
import { CurrentId, Lang } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const techReducer = (state: CurrentId = initialState.currentId, action: Action): CurrentId => {
    switch (action.type) {
        case Actions.SET_CURRENT_ID: {
          return {
            ...state,
            currentId: action.payload,
          }
        }
        default: 
          return state;
    }
}

export const langReducer = (state: Lang = initialState, action: Action) => {
  switch (action.type) {
      case Actions.SET_LANG: {
        return {
          ...state,
          lang: action.payload,
        }
      }
      default: 
        return state;
  }
}