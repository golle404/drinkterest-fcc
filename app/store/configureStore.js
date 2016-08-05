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
}

const normalizeMiddleware = store => next => action => {
  if(action.submissions){
    action.submissions = normalizeSubmissions(action.submissions);
  }
  next(action);
};

function toImmutableState(state){
  const normalizedSubmissions = normalizeSubmissions(state.submissions.data) || {};
  const immutableData = fromJS(normalizedSubmissions.entities.data);
  const immutableSubmitters = fromJS({[state.submissions.submitter]: {
    idx: OrderedSet(normalizedSubmissions.result),
    total: state.submissions.total
  }});
  const immutableUser = fromJS(state.user);
  const immutableNotification = fromJS({
    className: "",
    message: "",
    active: false
  });
  return {
    user: immutableUser,
    submissions: {
      data: immutableData,
      submitters: immutableSubmitters
    },
    numFetchRequests: 0,
    notification: immutableNotification
  };
}
