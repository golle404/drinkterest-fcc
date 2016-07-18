import * as actionTypes from './actionTypes';

export const loadDrinksSuccess = (drinks) => {
  return { type: actionTypes.LOAD_DRINKS_SUCCESS, drinks };
}

export const clearDrinks = () => {
  return { type: actionTypes.CLEAR_DRINKS};
}

export const loadDrinksRequest = (params) => {
  return (dispatch) => {
    return fetch('/api/drink/list', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    }).then((response) => {
      if(response.ok){
        console.log("loaded");
        response.json().then((json) => {
          console.log(json)
          /*if(json.error){
            console.log(json.error);
          }else{
            dispatch(loadDrinksSuccess(json))
          }*/
        })
      }else{
        console.log("bad response");
      }
    })
  }
}
