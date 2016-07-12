import {Map, fromJS} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function drinkReducer(state = Map(), action){
  switch (action.type) {
    case actionTypes.SET_DRINKS:
      return fromJS(action.drinks);
    default:
      return state;
  }
}
