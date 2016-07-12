import * as actionTypes from '../actions/actionTypes';
import userReducer from './userReducer';
import drinkReducer from './drinkReducer';
import should from 'should';
import {Map, List, fromJS} from 'immutable';

describe("User Reducer", () => {

  it('handles SET_USER', () => {
    const state = Map();
    const action = {
      type: actionTypes.SET_USER,
      user: {
        username: "admin",
        id: 123
      }
    }
    const nextState = userReducer(state, action);
    nextState.get("username").should.equal("admin");
    nextState.get("id").should.equal(123);
    state.has("username").should.equal(false);
    state.has("id").should.equal(false);
  })

})

describe("Drink Reducer", () => {

  it('handles SET_DRINKS', () => {
    const state = Map();
    const action = {
      type: actionTypes.SET_DRINKS,
      drinks: {
        start: 0,
        total: 25,
        drinks: [
          {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
          {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
          {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
          {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
        ]
      }
    }
    const nextState = drinkReducer(state, action);
    //console.log(nextState.getIn(["drinks", 1, "likes"]));
    nextState.get("start").should.equal(0);
    nextState.get("total").should.equal(25);
    nextState.get("drinks").size.should.equal(4);
    nextState.getIn(["drinks", 1, "likes", 0]).should.equal(3);
    state.has("start").should.equal(false);
    state.has("total").should.equal(false);
  })

})
