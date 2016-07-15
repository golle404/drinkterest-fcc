import { fromJS, toOrderedMap} from 'immutable';
import { Schema, arrayOf, normalize } from 'normalizr';

import {createStore} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initState){
  return createStore(rootReducer, toImmutableState(initState));
}

const drinkSchema = new Schema("drinks");
function toImmutableState(state){
  const normalized = normalize(state.drinks.drinks, arrayOf(drinkSchema)).entities.drinks || {};
  state.drinks.drinks = fromJS(normalized).toOrderedMap();
  state.drinks.info = fromJS(state.drinks.info)
  state.user = fromJS(state.user)
  return state;
}
