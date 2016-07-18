import * as actionTypes from '../actions/actionTypes';
import userReducer from './userReducer';
import drinkReducer from './drinkReducer';
import should from 'should';
import {Map, fromJS, toJS, OrderedSet} from 'immutable';
import normalizeDrinks from './../utils/normalizeDrinks';

describe("User Reducer", () => {

  it('handles USER_AUTH_SUCCESS', () => {
    const state = Map();
    const action = {
      type: actionTypes.USER_AUTH_SUCCESS,
      user: {
        username: "admin",
        id: 123
      }
    }
    const nextState = userReducer(state, action);
    nextState.get("username").should.equal(action.user.username);
    nextState.get("id").should.equal(action.user.id);
    nextState.get("auth").should.equal(true);
  })

  it('handles USER_LOGOUT_SUCCESS', () => {
    const state = fromJS({
                    username: "admin",
                    id: 123,
                    auth: true
                  });
    const action = {
      type: actionTypes.USER_LOGOUT_SUCCESS,
    }
    const nextState = userReducer(state, action);
    nextState.toJS().should.deepEqual({});
  })

})

describe("Drink Reducer", () => {

  it('handles LOAD_DRINKS_SUCCESS with empty state', () => {
    const actionData = [
      {_id: 0, name: "beer"},
      {_id: 1, name: "vodka"},
      {_id: 2, name: "whiskey"},
      {_id: 3, name: "cider"}
    ]
    const state = {};
    const action = {
      type: actionTypes.LOAD_DRINKS_SUCCESS,
      query: {
        queryStr: "recent/",
        total: 25
      }
    }
    action.drinks = normalizeDrinks(actionData)
    const nextState = drinkReducer(state, action);
    nextState.data.size.should.equal(actionData.length);
    nextState.data.get("2").toJS().should.deepEqual(actionData[2]);
    nextState.queries.getIn(["recent/", "total"]).should.deepEqual(action.query.total);
    nextState.queries.getIn(["recent/", "idx"]).toJS().should.deepEqual([0,1,2,3]);
  })

  it('handles LOAD_DRINKS_SUCCESS with existing state', () => {
    const actionData = [
      {_id: 0, name: "wine"},
      {_id: 7, name: "rum"},
      {_id: 12, name: "water"},
    ]
    const state = {
      queries: {
        'recent/': {
          total: 25,
          idx: OrderedSet([ 0, 1, 2, 3 ])
        }
      },
      data: {
        '0': { _id: 0, name: 'beer' },
        '1': { _id: 1, name: 'vodka' },
        '2': { _id: 2, name: 'whiskey' },
        '3': { _id: 3, name: 'cider' }
      }
    }
    const action = {
      type: actionTypes.LOAD_DRINKS_SUCCESS,
      query: {
        queryStr: "popular/golle",
        total: 42
      }
    }
    state.queries = fromJS(state.queries)
    state.data = fromJS(state.data)
    action.drinks = normalizeDrinks(actionData)
    const nextState = drinkReducer(state, action);
    //console.log(nextState);
    nextState.data.size.should.equal(6);
    nextState.data.get("2").toJS().should.deepEqual({ _id: 2, name: 'whiskey' });
    nextState.data.get("7").toJS().should.deepEqual(actionData[1]);
    nextState.data.get("0").toJS().should.deepEqual(actionData[0]);
    nextState.queries.getIn(["recent/", "total"]).should.equal(25);
    nextState.queries.getIn(["popular/golle", "idx"]).toJS().should.deepEqual([0, 7, 12]);
  })
  it('handles LOAD_DRINKS_SUCCESS with existing query', () => {
    const actionData = [
      {_id: 0, name: "wine"},
      {_id: 2, name: "rum"},
      {_id: 4, name: "water"},
      {_id: 6, name: "juice"}
    ]
    const state = {
      queries: {
        'recent/': {
          total: 25,
          idx: OrderedSet([ 0, 1, 2, 3 ])
        }
      },
      data: {
        '0': { _id: 0, name: 'beer' },
        '1': { _id: 1, name: 'vodka' },
        '2': { _id: 2, name: 'whiskey' },
        '3': { _id: 3, name: 'cider' }
      }
    }
    const action = {
      type: actionTypes.LOAD_DRINKS_SUCCESS,
      query: {
        queryStr: "recent/",
        total: 42
      },
      data: [
        {_id: 0, name: "wine"},
        {_id: 2, name: "rum"},
        {_id: 4, name: "water"},
        {_id: 6, name: "juice"},
      ]
    }
    state.queries = fromJS(state.queries)
    state.data = fromJS(state.data)
    action.drinks = normalizeDrinks(actionData)
    const nextState = drinkReducer(state, action);

    nextState.data.size.should.equal(6);
    nextState.data.get("2").toJS().should.deepEqual({_id: 2, name: "rum"});
    nextState.data.get("6").toJS().should.deepEqual(actionData[3]);
    nextState.queries.getIn(["recent/", "total"]).should.equal(42);
    nextState.queries.getIn(["recent/", "idx"]).toJS().should.deepEqual([0, 1, 2, 3, 4, 6]);
  })

})
