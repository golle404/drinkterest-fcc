import * as actionTypes from '../actions/actionTypes';
import userReducer from './userReducer';
import drinkReducer from './drinkReducer';
import should from 'should';
import {Map, List, fromJS, toJS, toOrderedMap} from 'immutable';
import { Schema, arrayOf, normalize } from 'normalizr';

const testState = {
  total: 25,
  drinks: [
    {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
    {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
    {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
    {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
  ]
}

const drinkSchema = new Schema("drinks");
const serialize = (drinks) => {
  const serialized = normalize(drinks, arrayOf(drinkSchema))
  return {data: serialized.entities.drinks, ids: serialized.result}
}
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

  it('handles SET_DRINKS with empty state', () => {
    const state = {};
    const action = {
      type: actionTypes.SET_DRINKS,
      info: {total: 25},
      drinks: [
        {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
        {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
        {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
        {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
      ]
    }

    action.drinks = normalize(action.drinks, arrayOf(drinkSchema)).entities.drinks
    const nextState = drinkReducer(state, action);
    nextState.drinks.toJS().should.deepEqual(action.drinks);
    //immutability check
    should.not.exist(state.info)
    should.not.exist(state.drinks)
    action.drinks = {}
    nextState.drinks.toJS().should.not.deepEqual(action.drinks);
  })

  it('handles SET_DRINKS with existing state', () => {
    const state = {
      info: {total: 52},
      drinks: [
        {id: 0, name: "lager", url: "http://lager.com", likes: [1,2,3], numLikes: 3},
        {id: 3, name: "wine", url: "http://wine.com", likes: [2,3,2,5,8], numLikes: 5}
      ]
    };
    const action = {
      type: actionTypes.SET_DRINKS,
      info: {total: 25},
      drinks: [
        {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
        {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
        {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
        {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
      ]
    }
    state.drinks = fromJS(normalize(state.drinks, arrayOf(drinkSchema)).entities.drinks).toOrderedMap();
    action.drinks = normalize(action.drinks, arrayOf(drinkSchema)).entities.drinks
    const nextState = drinkReducer(state, action);

    nextState.drinks.toJS().should.deepEqual(action.drinks)
    //immutability check
    action.drinks = {}
    nextState.drinks.toJS().should.not.deepEqual(action.drinks);
  })

  it('handles APPEND_DRINKS', () => {
    const state = {
      info: {total: 52},
      drinks: [
        {id: 0, name: "lager", url: "http://lager.com", likes: [1,2,3], numLikes: 3},
        {id: 4, name: "wine", url: "http://wine.com", likes: [2,3,2,5,8], numLikes: 5}
      ]
    };
    const action = {
      type: actionTypes.APPEND_DRINKS,
      info: {total: 25},
      drinks: [
        {id: 0, name: "beer", url: "http://beer.com", likes: [1,2,3], numLikes: 3},
        {id: 1, name: "vodka", url: "http://vodka.com", likes: [3,4], numLikes: 2},
        {id: 2, name: "whiskey", url: "http://whiskey.com", likes: [], numLikes: 0},
        {id: 3, name: "cider", url: "http://cider.com", likes: [2,3], numLikes: 2}
      ]
    }
    state.drinks = fromJS(normalize(state.drinks, arrayOf(drinkSchema)).entities.drinks).toOrderedMap();
    action.drinks = normalize(action.drinks, arrayOf(drinkSchema)).entities.drinks
    const nextState = drinkReducer(state, action);
    nextState.drinks.toJS()["0"].should.deepEqual(action.drinks["0"])
    nextState.drinks.toJS()["4"].should.deepEqual(state.drinks.toJS()["4"])
    //immutability check
    action.drinks = {}
    state.drinks = {}
    nextState.drinks.toJS()["0"].should.not.deepEqual(action.drinks["0"])
    nextState.drinks.toJS()["4"].should.not.deepEqual(state.drinks["4"])
  })

  it('handles UPDATE_DRINKS', () => {
    const state = {
      info: {total: 52},
      drinks: [
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
    state.drinks = fromJS(normalize(state.drinks, arrayOf(drinkSchema)).entities.drinks).toOrderedMap();
    action.drink = normalize(action.drink, drinkSchema).entities.drinks
    const nextState = drinkReducer(state, action);
    nextState.drinks.toJS()["2"].should.deepEqual(action.drink["2"])
  })

})
