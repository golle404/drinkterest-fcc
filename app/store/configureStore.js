import { fromJS, toOrderedMap} from 'immutable';
import { Schema, arrayOf, normalize } from 'normalizr';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initState){
  return createStore(rootReducer, toImmutableState(initState), applyMiddleware(thunk));
}

const drinkSchema = new Schema("data", { idAttribute: '_id' });

function toImmutableState(state){
  const normalizedDrinks = normalize(state.drinks.data, arrayOf(drinkSchema)).entities.data || {}
  const immutableDrinks = fromJS(normalizedDrinks).toOrderedMap();
  const immutableInfo = fromJS(state.drinks.info)
  const immutableUser = fromJS(state.user)
  return {user: immutableUser, drinks: {data: immutableDrinks, info: immutableInfo}};
}
