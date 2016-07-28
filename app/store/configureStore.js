import { fromJS, toMap, toOrderedSet, Iterable} from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import normalizeSubmissions from './../../utils/normalizeSubmissions';

export default function configureStore(initState){
  return createStore(
    rootReducer,
    toImmutableState(initState),
    compose(
      applyMiddleware(thunk),
      (module.hot ? window.devToolsExtension() : f => f )
    )
  );
}


function toImmutableState(state){
  const normalizedSubmissions = normalizeSubmissions(state.submissions.data);
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
  })
  return {
    user: immutableUser,
    submissions: {
      data: immutableSubmissions,
      queries: immutableQueries
    },
    numFetchRequests: 0,
    notification: immutableNotification
  };
}
