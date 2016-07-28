import {combineReducers} from 'redux';

import submissionsReducer from './submissionsReducer';
import userReducer from './userReducer';
import fetchReducer from './fetchReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  submissions: submissionsReducer,
  user: userReducer,
  numFetchRequests: fetchReducer ,
  notification: notificationReducer
});
