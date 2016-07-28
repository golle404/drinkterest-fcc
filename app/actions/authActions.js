import * as actionTypes from './actionTypes';
import {browserHistory} from 'react-router';
import {fetchData} from './fetchActions';

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
      dispatch(userDeleteSuccess(json.user));
      browserHistory.push('/');
    })
  };
};
