import * as actionTypes from './actionTypes';
import normalizeDrinks from './../utils/normalizeDrinks';

export const loadDrinksSuccess = (drinks, query) => {
  return { type: actionTypes.LOAD_DRINKS_SUCCESS, drinks, query};
}

export const clearDrinks = () => {
  return { type: actionTypes.CLEAR_DRINKS};
}

export const loadDrinksRequest = (params) => {
  return (dispatch) => {
    return fetch('/api/drink/list/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            dispatch(loadDrinksSuccess(normalizeDrinks(json.data), json.query));
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}
