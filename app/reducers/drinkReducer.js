import { combineReducers } from "redux";
import { Map, OrderedSet} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

function queryUpdater(idx, total = 0){
  return (v = Map()) => {
    return v.set("total", total)
      .update("idx", (v = OrderedSet()) => v.union(OrderedSet(idx)));
  };
}

const drinksQueries = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.LOAD_DRINKS_SUCCESS:
      return state.update(action.query.queryStr, queryUpdater(action.drinks.result, action.query.total));
    case actionTypes.ADD_DRINK_SUCCESS:
      const submitterName = action.drinks.entities.data[action.drinks.result[0]].submitterName;
      const newState = state.update('recent/' + submitterName, queryUpdater(action.drinks.result, state.getIn(["recent/" + action.submitterName, "total"]) + 1));
      return newState.update('recent/', queryUpdater(action.drinks.result, state.getIn(["recent/", "total"]) + 1));
    case actionTypes.CLEAR_DRINKS:
      return new Map();
    default:
      return state;
  }
}

const drinksData = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.LOAD_DRINKS_SUCCESS:
      return state.merge(action.drinks.entities.data);
    case actionTypes.ADD_DRINK_SUCCESS:
      return state.merge(action.drinks.entities.data);
    default:
      return state;
  }
}

const drinkReducer = combineReducers({
  queries: drinksQueries,
  data: drinksData
})

export default drinkReducer
