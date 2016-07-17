import { combineReducers } from "redux";
import {OrderedMap, Map, fromJS, toOderedMap} from 'immutable';
import * as actionTypes from '../actions/actionTypes';
import normalizeDrinks from './../utils/normalizeDrinks';

const drinksInfo = (state = Map(), action) => {

  switch (action.type) {
    case actionTypes.DRINK_LIST_SUCCESS:
      return fromJS(action.drinks.info);
    case actionTypes.CLEAR_DRINKS:
      return new Map();
    default:
      return state;
  }
}

const drinksList = (state = OrderedMap(), action) => {
  switch (action.type) {
    case actionTypes.DRINK_LIST_SUCCESS:
      return state.merge(normalizeDrinks(action.drinks.data));
    case actionTypes.CLEAR_DRINKS:
      return new OrderedMap();
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
