import * as actionTypes from './actionTypes';
import {browserHistory} from 'react-router';
import {fetchData} from './fetchActions';
import {showNotification} from './notificationActions';

export const userAuthSuccess = (user) => {
  return {type: actionTypes.USER_AUTH_SUCCESS, user};
};

export const userLogoutSuccess = (user) => {
  return {type: actionTypes.USER_LOGOUT_SUCCESS, user};
};

export const userDeleteSuccess = (user) => {
  return {type: actionTypes.USER_DELETE_SUCCESS, user};
};

export const userAuthRequest = (profile) => {
  const params = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body: JSON.stringify(profile)
  };
  return (dispatch) => {
    fetchData('/auth/local', params, dispatch, (json) => {
      dispatch(userAuthSuccess(json.user));
      dispatch(showNotification({className: "info", message: "Welcome " + json.user.username}));
      browserHistory.push('/profile');
    })
  };
};

export const userLogoutRequest = () => {
  const params = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin'
  };
  return (dispatch) => {
    fetchData('/auth/logout', params, dispatch, (json) => {
      dispatch(showNotification({className: "warning", message: "You are now loged out"}));
      dispatch(userLogoutSuccess(json.user));
      browserHistory.push('/');
    })
  };
};

export const userDeleteRequest = () => {
  const params = {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin'
  };
  return (dispatch) => {
    fetchData('/auth', params, dispatch, (json) => {
      dispatch(showNotification({className: "error", message: "Your account is deleted"}));
      dispatch(userDeleteSuccess(json.user));
      browserHistory.push('/');
    })
  };
};
