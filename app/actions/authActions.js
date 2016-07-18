import * as actionTypes from './actionTypes';
import {browserHistory} from 'react-router';

export const userAuthSuccess = (user) => {
  return {type: actionTypes.USER_AUTH_SUCCESS, user};
};

export const userLogoutSuccess = (user) => {
  return {type: actionTypes.USER_LOGOUT_SUCCESS, user};
};

export const userAuthRequest = (profile) => {
  return (dispatch) => {
    return fetch('/auth/local', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body: JSON.stringify(profile)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            dispatch(userAuthSuccess(json.user))
            browserHistory.push('/profile')
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
};

export const userLogoutRequest = () => {
  return (dispatch) => {
    return fetch('/auth/logout', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin'
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.success){
            dispatch(userLogoutSuccess(json.user))
            browserHistory.push('/')
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
};
