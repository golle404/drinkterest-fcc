import { combineReducers } from "redux";
import {OrderedMap, Map, fromJS, toOderedMap} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const drinksInfo = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.SET_DRINKS,
    actionTypes.APPEND_DRINKS:
      return fromJS(action.info);
    default:
      return state;
  }
}

const drinksList = (state = OrderedMap(), action) => {
  switch (action.type) {
    case actionTypes.SET_DRINKS:
      return fromJS(action.data).toOrderedMap();
    case actionTypes.APPEND_DRINKS:
      return state.merge(action.data)
    case actionTypes.UPDATE_DRINK:
      return state.merge(action.drink)
    default:
      return state;
  }
}

const drinkReducer = combineReducers({
  info: drinksInfo,
  data: drinksList
})

export default drinkReducer
