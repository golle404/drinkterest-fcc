import * as actionTypes from './actionTypes';
import {showNotification} from './notificationActions';
import {Promise} from 'es6-promise';

export const fetchRequested = () => {
  return { type: actionTypes.FETCH_REQUESTED};
};

export const fetchRecieved = () => {
  return { type: actionTypes.FETCH_RECIEVED};
};

export const fetchData = (url, params, dispatch, next) => {
  dispatch(fetchRequested());
  return fetch(url, params).then((response) => {
    dispatch(fetchRecieved());
    if(response.ok){
      response.json().then((json) => {
        if(json.error){
          dispatch(showNotification({className: "error", message: json.error}));
        }else{
          next(json);
        }
      });
    }else{
      dispatch(showNotification({className: "error", message: "bad response"}));
    }
  });
};
