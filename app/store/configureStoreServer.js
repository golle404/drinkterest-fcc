import { fromJS, toMap, toOrderedSet, Iterable} from 'immutable';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import normalizeDrinks from './../utils/normalizeDrinks';

export default function configureStore(initState){
  return createStore(
    rootReducer,
    toImmutableState(initState),
    applyMiddleware(thunk)
  );
}


function toImmutableState(state){

  const normalizedDrinks = normalizeDrinks(state.drinks.data)
  const immutableDrinks = fromJS(normalizedDrinks.entities.data);
  const immutableQueries = fromJS(state.drinks.queries);
  const iQueries = fromJS(state.drinks.queries, (key, value) => {
    var isIndexed = Iterable.isIndexed(value);
    return isIndexed ? value.toOrderedSet() : value.toMap();
  });
  //console.log(iQueries);
  const immutableUser = fromJS(state.user)
  return {user: immutableUser, drinks: {data: immutableDrinks, queries: iQueries}};
}
