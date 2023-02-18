import { Actions } from '../../types/enum';
import { CurrentId, Lang } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const techReducer = (state: CurrentId | Lang = initialState, action: Action) => {
    switch (action.type) {
        case Actions.SET_CURRENT_ID: {
          return {
            currentId: action.payload,
          }
        }
        case Actions.SET_LANG: {
          return {
            lang: action.payload,
          }
        }
        default: 
          return state;
    }
}