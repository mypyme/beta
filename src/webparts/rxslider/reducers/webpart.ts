import { ISliderItem } from '../models/ISlider'
import { assign } from 'lodash';

export interface IWebpartState {
  slides: ISliderItem[];
  connection: {
    listName: string;
    imageFieldName: string;
    linkFieldName: string;
    descriptionFieldName: string,
    titleName: string
  }
}

export const UPDATE_SLIDES = 'webpart/UPDATE_SLIDES';
export const UPDATE_CONNECTION = 'webpart/UPDATE_CONNECTION';

export interface IUpdateSlidesAction {
  type: 'webpart/UPDATE_SLIDES'; // TODO is there a way to use the const?
  value: any;
}

export interface IUpdateConnection {
  type: 'webpart/UPDATE_CONNECTION'; // TODO is there a way to use the const?
  value: any;
}

export type IWebpartAction = IUpdateSlidesAction | IUpdateConnection

export const initialState: IWebpartState = {
  slides: null,
  connection: {
    listName: null,
    imageFieldName: null,
    linkFieldName: null,
    descriptionFieldName: null,
    titleName: null
  }
};

export default (state = initialState, action: IWebpartAction) => {
  switch (action.type) {
    case 'webpart/UPDATE_SLIDES':
      return assign({}, state, {
          slides: action.value
      });
    case 'webpart/UPDATE_CONNECTION':
      return assign({}, state, {
          connection: action.value
      });

    default:
      return state;
  }
};

export function updateSlides(value: any) {
  return { type: UPDATE_SLIDES, value };
}

export function updateConnection(value: any) {
  return { type: UPDATE_CONNECTION, value };
}

