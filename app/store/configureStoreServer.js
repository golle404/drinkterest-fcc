import { fromJS, toMap, toOrderedSet, Iterable} from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import normalizeSubmissions from './../utils/normalizeSubmissions';

export default function configureStore(initState){
  //if((window && window.devToolsExtension ? window.devToolsExtension())
  //console.log(window.devToolsExtension());
  return createStore(
    rootReducer,
    toImmutableState(initState),
    compose(applyMiddleware(thunk))
  )
}


function toImmutableState(state){
  const normalizedSubmissions = normalizeSubmissions(state.submissions.data)
  const immutableSubmissions = fromJS(normalizedSubmissions.entities.data);
  const immutableQueries = fromJS(state.submissions.queries, (key, value) => {
    var isIndexed = Iterable.isIndexed(value);
    return isIndexed ? value.toOrderedSet() : value.toMap();
  });

  const immutableUser = fromJS(state.user)
  return {user: immutableUser, submissions: {data: immutableSubmissions, queries: immutableQueries}};
}
