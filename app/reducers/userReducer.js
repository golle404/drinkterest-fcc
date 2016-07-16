import {Map, fromJS} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function userReducer(state = Map(), action){
  switch (action.type) {
    case actionTypes.SET_USER:
      return fromJS(action.user);
    case actionTypes.USER_AUTH_SUCCESS:
      action.user.auth = true;
      return fromJS(action.user);
    case actionTypes.REMOVE_USER:
      return Map();
    default:
      return state;
  }
}
