import { combineReducers } from "redux";
import {Map, List, fromJS} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const drinksInfo = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.SET_DRINKS:
    case actionTypes.APPEND_DRINKS:
      return fromJS(action.info);
    case actionTypes.UPDATE_DRINK:
    default:
      return state;
  }
}

const drinksList = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.SET_DRINKS:
      return fromJS(action.drinks.data);
    case actionTypes.APPEND_DRINKS:
    //console.log(action.drinks.entities);
    //console.log(state);
    const newState = Object.assign({}, state.drinks, action.drinks.entities.drinks)
    //console.log(newState);
      return newState
    case actionTypes.UPDATE_DRINK:
    default:
      return state;
  }
}

const drinksIDs = (state = List(), action) => {
  switch (action.type) {
    case actionTypes.SET_DRINKS:
      return fromJS(action.drinks.ids);
    case actionTypes.APPEND_DRINKS:
      return state.concat(action.drinks.result)
    case actionTypes.UPDATE_DRINK:
    default:
      return state;
  }
}


const drinkReducer = combineReducers({
  info: drinksInfo,
  drinks: combineReducers({
    data: drinksList,
    ids: drinksIDs
  })
})

export default drinkReducer
