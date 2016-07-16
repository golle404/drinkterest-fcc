import * as actionTypes from '../actions/actionTypes';
import userReducer from './userReducer';
import drinkReducer from './drinkReducer';
import should from 'should';
import {Map, fromJS, toJS, toOrderedMap} from 'immutable';
import { Schema, arrayOf, normalize } from 'normalizr';

const drinkSchema = new Schema("data");

describe("User Reducer", () => {

  it('handles SET_USER', () => {
    const state = Map();
    const action = {
      type: actionTypes.SET_USER,
      user: {
        username: "admin",
        id: 123,
        auth: true
      }
    }
    const nextState = userReducer(state, action);
    nextState.toJS().should.deepEqual(action.user);
  })

  it('handles REMOVE_USER', () => {
    const state = fromJS({
                    username: "admin",
                    id: 123,
                    auth: true
                  });
    const action = {
      type: actionTypes.REMOVE_USER,
    }
    const nextState = userReducer(state, action);
    nextState.toJS().should.deepEqual({});
  })

})

describe("Drink Reducer", () => {

  it('handles SET_DRINKS with empty state', () => {
    const state = {};
    const action = {
      type: actionTypes.SET_DRINKS,
      info: {total: 25},
      data: [
        {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
        {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
        {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
        {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
      ]
    }

    action.data = normalize(action.data, arrayOf(drinkSchema)).entities.data
    const nextState = drinkReducer(state, action);
    nextState.data.toJS().should.deepEqual(action.data);
    //immutability check
    should.not.exist(state.info)
    should.not.exist(state.data)
    action.data = {}
    nextState.data.toJS().should.not.deepEqual(action.data);
  })

  it('handles SET_DRINKS with existing state', () => {
    const state = {
      info: {total: 52},
      data: [
        {id: 0, name: "lager", url: "http://lager.com", likes: [1,2,3], numLikes: 3},
        {id: 3, name: "wine", url: "http://wine.com", likes: [2,3,2,5,8], numLikes: 5}
      ]
    };
    const action = {
      type: actionTypes.SET_DRINKS,
      info: {total: 25},
      data: [
        {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
        {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
        {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
        {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
      ]
    }
    state.data = fromJS(normalize(state.data, arrayOf(drinkSchema)).entities.data).toOrderedMap();
    action.data = normalize(action.data, arrayOf(drinkSchema)).entities.data
    const nextState = drinkReducer(state, action);
    nextState.data.toJS().should.deepEqual(action.data)
    //immutability check
    action.data = {}
    nextState.data.toJS().should.not.deepEqual(action.data);
  })

  it('handles APPEND_DRINKS', () => {
    const state = {
      info: {total: 52},
      data: [
        {id: 0, name: "lager", url: "http://lager.com", likes: [1,2,3], numLikes: 3},
        {id: 4, name: "wine", url: "http://wine.com", likes: [2,3,2,5,8], numLikes: 5}
      ]
    };
    const action = {
      type: actionTypes.APPEND_DRINKS,
      info: {total: 25},
      data: [
        {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
        {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
        {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
        {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
      ]
    }
    state.data = fromJS(normalize(state.data, arrayOf(drinkSchema)).entities.data).toOrderedMap();
    action.data = normalize(action.data, arrayOf(drinkSchema)).entities.data
    const nextState = drinkReducer(state, action);
    nextState.data.toJS()["0"].should.deepEqual(action.data["0"])
    nextState.data.toJS()["4"].should.deepEqual(state.data.toJS()["4"])
    //immutability check
    action.data = {}
    state.data = {}
    nextState.data.toJS()["0"].should.not.deepEqual(action.data["0"])
    nextState.data.toJS()["4"].should.not.deepEqual(state.data["4"])
  })

  it('handles UPDATE_DRINKS', () => {
    const state = {
      info: {total: 52},
      data: [
        {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
        {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
        {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
        {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
      ]
    };
    const action = {
      type: actionTypes.UPDATE_DRINK,
      drink: {id: 2, name: "water", url: "http://water.com", likes: [10,20], numLikes: 2}
    }
    state.data = fromJS(normalize(state.data, arrayOf(drinkSchema)).entities.data).toOrderedMap();
    action.drink = normalize(action.drink, drinkSchema).entities.data
    const nextState = drinkReducer(state, action);
    nextState.data.toJS()["2"].should.deepEqual(action.drink["2"])
  })

})
