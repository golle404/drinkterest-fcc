import * as actionTypes from './actionTypes';

export const drinkListSuccess = (drinks) => {
  return { type: actionTypes.DRINK_LIST_SUCCESS, drinks };
}

export const drinksListRequest = (params) => {
  return (dispatch) => {
    return fetch('/api/drink/list', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            dispatch(drinkListSuccess(json))
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}
