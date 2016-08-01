import { fromJS, toMap, Map, toOrderedSet, Iterable, OrderedSet} from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import normalizeSubmissions from './../../utils/normalizeSubmissions';

export default function configureStore(initState){
  return createStore(
    rootReducer,
    toImmutableState(initState),
    compose(
      applyMiddleware(thunk, normalizeMiddleware),
      (module.hot ? window.devToolsExtension() : f => f )
    )
  );
};

const normalizeMiddleware = store => next => action => {
  if(action.submissions){
    action.submissions = normalizeSubmissions(action.submissions);
  }
  next(action);
};

function toImmutableState(state){
  /*const normalizedSubmissions = normalizeSubmissions(state.submissions.data) || {};
  const immutableSubmissions = fromJS(normalizedSubmissions.entities.data);
  const immutableQueries = fromJS(state.submissions.queries, (key, value) => {
    const isIndexed = Iterable.isIndexed(value);
    return isIndexed ? value.toOrderedSet() : value.toMap();
  });
  const immutableUser = fromJS(state.user);
  const immutableNotification = fromJS({
    className: "",
    message: "",
    active: false
  })*/
  return {
    user: Map(),
    submissions: {
      data: Map(),
      submitters: Map()
    },
    numFetchRequests: 0,
    notification: Map()
  };
  /*return {
    user: immutableUser,
    submissions: Map(),
    numFetchRequests: 0,
    notification: immutableNotification
  };*/
}
