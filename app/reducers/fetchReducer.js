import * as actionTypes from '../actions/actionTypes';

export default function fetchReducer(state = 0, action){
  switch (action.type) {
    case actionTypes.FETCH_REQUESTED:
      return state + 1;
    case actionTypes.FETCH_RECIEVED:
      return state - 1;
    default:
      return state;
  }
}
