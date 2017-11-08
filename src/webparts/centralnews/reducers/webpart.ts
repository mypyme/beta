import { INew } from '../models/INew';
import { assign } from 'lodash';

export interface IWebpartState {
  news: INew[];
}

export const UPDATE_NEWS = 'webpart/UPDATE_NEWS';

export interface IUpdateSlidesAction {
  type: 'webpart/UPDATE_NEWS'; // TODO is there a way to use the const?
  value: any;
}

export type IWebpartAction = IUpdateSlidesAction

export const initialState: IWebpartState = {
  news: null
};

export default (state = initialState, action: IWebpartAction) => {
  switch (action.type) {
    case 'webpart/UPDATE_NEWS':
      return assign({}, state, {
          news: action.value
      });
    default:
      return state;
  }
};

export function updateSlides(value: any) {
  return { type: UPDATE_NEWS, value };
}

