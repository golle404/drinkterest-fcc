import { fromJS, toOrderedMap} from 'immutable';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import normalizeDrinks from './../utils/normalizeDrinks';

export default function configureStore(initState){
  return createStore(rootReducer, toImmutableState(initState), applyMiddleware(thunk));
}


function toImmutableState(state){
  const normalizedDrinks = normalizeDrinks(state.drinks.data)
  const immutableDrinks = fromJS(normalizedDrinks).toOrderedMap();
  const immutableInfo = fromJS(state.drinks.info)
  const immutableUser = fromJS(state.user)
  return {user: immutableUser, drinks: {data: immutableDrinks, info: immutableInfo}};
}
