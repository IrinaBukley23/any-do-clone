import { Actions } from '../../types/enum';
import { Lang } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

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