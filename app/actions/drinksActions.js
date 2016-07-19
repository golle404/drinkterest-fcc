import * as actionTypes from './actionTypes';
import normalizeDrinks from './../utils/normalizeDrinks';
import {browserHistory} from 'react-router';

export const loadDrinksSuccess = (drinks, query) => {
  return { type: actionTypes.LOAD_DRINKS_SUCCESS, drinks, query};
}

export const addDrinkSuccess = (drinks) => {
  return { type: actionTypes.ADD_DRINK_SUCCESS, drinks};
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

export const addDrinkRequest = (drink) => {
  return (dispatch) => {
    return fetch('/api/drink', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body: JSON.stringify(drink)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            //dispatch(addDrinkSuccess(normalizeDrinks([json.drink])));
            browserHistory.push("/drinks/recent/" + json.drink.submitterName)
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}

export const editDrinkRequest = (drink) => {
  return (dispatch) => {
    return fetch('/api/drink', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body: JSON.stringify(drink)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            console.log(json);
            //dispatch(addDrinkSuccess(normalizeDrinks([json.drink])));
            browserHistory.push("/drinks/recent/" + json.drink.submitterName)
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}

export const deleteDrinkRequest = (drinkId) => {
  return (dispatch) => {
    return fetch('/api/drink', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body: JSON.stringify(drinkId)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            console.log(json);
            //dispatch(addDrinkSuccess(normalizeDrinks([json.drink])));
            browserHistory.push("/drinks/recent/")
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}

export const likeDrinkRequest = (drinkId) => {
  return (dispatch) => {
    return fetch('/api/like', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body: JSON.stringify(drinkId)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            console.log(json);
            //dispatch(addDrinkSuccess(normalizeDrinks([json.drink])));
            //browserHistory.push("/drinks/recent/")
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}
