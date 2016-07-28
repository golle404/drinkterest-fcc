import * as actionTypes from './actionTypes';

export const showNotification = (notification) => {
  return {type: actionTypes.SHOW_NOTIFICATION, notification};
};

export const hideNotification = () => {
  return {type: actionTypes.HIDE_NOTIFICATION };
};
