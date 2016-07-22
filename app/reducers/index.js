import {combineReducers} from 'redux';

import submissionsReducer from './submissionsReducer';
import userReducer from './userReducer';

export default combineReducers({
  submissions: submissionsReducer,
  user: userReducer
});
