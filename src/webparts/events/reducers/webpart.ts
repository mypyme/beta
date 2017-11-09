import { IEvents } from '../models/IEvents'
import { assign } from 'lodash';

export interface IWebpartState {
  events: IEvents[];
}

export const UPDATE_EVENTS = 'webpart/UPDATE_EVENTS';

export interface IUpdateEvents {
  type: 'webpart/UPDATE_EVENTS'; // TODO is there a way to use the const?
  value: any;
}

export type IWebpartAction = IUpdateEvents

export const initialState: IWebpartState = {
  events: null
};

export default (state = initialState, action: IWebpartAction) => {
  switch (action.type) {
    case 'webpart/UPDATE_EVENTS':
      return assign({}, state, {
          events: action.value
      });
    default:
      return state;
  }
};

export function updateEvents(value: any) {
  return { type: UPDATE_EVENTS, value };
}

