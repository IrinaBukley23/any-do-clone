import { Actions } from '../../types/enum';
import { CurrentId } from '../../types/types';
import { Action } from '../actions/actionTypes';
import { initialState } from '../utils';

export const techReducer = (state: CurrentId = initialState, action: Action) => {
    switch (action.type) {
        case Actions.SET_CURRENT_ID: {
          return {
            currentId: action.payload,
          }
        }
        default: 
          return state;
    }
}