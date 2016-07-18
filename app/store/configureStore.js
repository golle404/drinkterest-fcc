import { fromJS, toOrderedMap} from 'immutable';

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import normalizeDrinks from './../utils/normalizeDrinks';

export default function configureStore(initState){
  return createStore(
    rootReducer,
    toImmutableState(initState),
    compose(applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
}


function toImmutableState(state){

  const normalizedDrinks = normalizeDrinks(state.drinks.data)
  const immutableDrinks = fromJS(normalizedDrinks).entities;
  const immutableQueries = fromJS(state.drinks.queries)
  const immutableUser = fromJS(state.user)
  return {user: immutableUser, drinks: {data: immutableDrinks, queries: immutableQueries}};
}
