import { IUser } from '../models/usersDirectory'
import { assign } from 'lodash';

export interface IWebpartState {
    users : IUser[]
}

export const UPDATE_DIRECTORY = 'webpart/UPDATE_DIRECTORY';

export interface IUpdateDirectory {
  type: 'webpart/UPDATE_DIRECTORY'; // TODO is there a way to use the const?
  value: any;
}

export type IWebpartAction = IUpdateDirectory

export const initialState: IWebpartState = {
  users : null
};

export default (state = initialState, action: IWebpartAction) => {
  switch (action.type) {
    case 'webpart/UPDATE_DIRECTORY':
      return assign({}, state, {
        users: action.value
      });
    default:
      return state;
  }
};

export function updateDirectory(value: any) {
  return { type: UPDATE_DIRECTORY, value };
}
