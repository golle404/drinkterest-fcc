import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const notificationReducer = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return state.merge({
        "message": action.notification.message,
        "className": action.notification.className,
        "active": true
      });
    case actionTypes.HIDE_NOTIFICATION:
      return state.set("active", false);
    default:
      return state;
  }
};


export default notificationReducer;
