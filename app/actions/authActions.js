import * as actionTypes from './actionTypes';

export const userAuthSuccess = (user) => {
  return {type: actionTypes.USER_AUTH_SUCCESS, user};
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
          }
          dispatch(userAuthSuccess(json.user))
        })
      }
    })
  }
};
