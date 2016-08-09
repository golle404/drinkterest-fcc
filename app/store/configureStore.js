import { fromJS, OrderedSet} from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import immutableStateInvariant from 'redux-immutable-state-invariant';

import normalizeSubmissions from './../../utils/normalizeSubmissions';

export default function configureStore(initState){
  let middleware = [thunk, normalizeMiddleware];
  if(process.env.NODE_ENV === "development"){
    middleware.unshift(immutableStateInvariant());
  }
  return createStore(
    rootReducer,
    toImmutableState(initState),
    compose(
      applyMiddleware(...middleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
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
