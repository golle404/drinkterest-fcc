import * as actionTypes from '../actions/actionTypes';
import userReducer from './userReducer';
import submissionsReducer from './submissionsReducer';
import notificationReducer from './notificationReducer';
import should from 'should';
import {Map, fromJS, toJS, OrderedSet} from 'immutable';
import normalizeSubmissions from './../../utils/normalizeSubmissions';

describe("User Reducer", () => {

  it('handles USER_AUTH_SUCCESS', () => {
    const state = Map();
    const action = {
      type: actionTypes.USER_AUTH_SUCCESS,
      user: {
        username: "admin",
        id: 123
      }
    };
    const nextState = userReducer(state, action);
    nextState.get("username").should.equal(action.user.username);
    nextState.get("id").should.equal(action.user.id);
    nextState.get("auth").should.equal(true);
  });

  it('handles USER_LOGOUT_SUCCESS', () => {
    const state = fromJS({
                    username: "admin",
                    id: 123,
                    auth: true
                  });
    const action = {
      type: actionTypes.USER_LOGOUT_SUCCESS
    };
    const nextState = userReducer(state, action);
    nextState.toJS().should.deepEqual({});
  });

});

describe("Submissions Reducer", () => {

  it('handles LOAD_SUBMISSIONS_SUCCESS with empty state', () => {
    const actionData = [
      {_id: 0, name: "beer"},
      {_id: 1, name: "vodka"},
      {_id: 2, name: "whiskey"},
      {_id: 3, name: "cider"}
    ];
    const state = {};
    const action = {
      type: actionTypes.LOAD_SUBMISSIONS_SUCCESS,
      query: {
        queryStr: "latest/",
        total: 25
      }
    };
    action.submissions = normalizeSubmissions(actionData);
    const nextState = submissionsReducer(state, action);
    nextState.data.size.should.equal(actionData.length);
    nextState.data.get("2").toJS().should.deepEqual(actionData[2]);
    nextState.queries.getIn(["latest/", "total"]).should.deepEqual(action.query.total);
    nextState.queries.getIn(["latest/", "idx"]).toJS().should.deepEqual([0,1,2,3]);
  });

  it('handles LOAD_SUBMISSIONS_SUCCESS with existing state', () => {
    const actionData = [
      {_id: 0, name: "wine"},
      {_id: 7, name: "rum"},
      {_id: 12, name: "water"},
    ];
    const state = {
      queries: {
        'latest/': {
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
    };
    const action = {
      type: actionTypes.LOAD_SUBMISSIONS_SUCCESS,
      query: {
        queryStr: "popular/golle",
        total: 42
      }
    };
    state.queries = fromJS(state.queries);
    state.data = fromJS(state.data);
    action.submissions = normalizeSubmissions(actionData);
    const nextState = submissionsReducer(state, action);
    //console.log(nextState);
    nextState.data.size.should.equal(6);
    nextState.data.get("2").toJS().should.deepEqual({ _id: 2, name: 'whiskey' });
    nextState.data.get("7").toJS().should.deepEqual(actionData[1]);
    nextState.data.get("0").toJS().should.deepEqual(actionData[0]);
    nextState.queries.getIn(["latest/", "total"]).should.equal(25);
    nextState.queries.getIn(["popular/golle", "idx"]).toJS().should.deepEqual([0, 7, 12]);
  });

  it('handles ADD_SUBMISSION_SUCCESS', () => {
    const actionData = [
      {_id: 6, name: "juice", submitterId: "g404", submitterName: "golle"}
    ];
    const state = {
      queries: {
        'latest/': {
          total: 25,
          idx: OrderedSet([ 0, 1, 2, 3 ])
        },
        'latest/golle': {
          total: 12,
          idx: OrderedSet([ 0, 1])
        }
      },
      data: {
        '0': { _id: 0, name: 'beer' },
        '1': { _id: 1, name: 'vodka' },
        '2': { _id: 2, name: 'whiskey' },
        '3': { _id: 3, name: 'cider' }
      }
    };
    const action = {
      type: actionTypes.ADD_SUBMISSION_SUCCESS,
      submitterName: actionData[0].submitterName
    };
    state.queries = fromJS(state.queries);
    state.data = fromJS(state.data);
    action.submissions = normalizeSubmissions(actionData);
    const nextState = submissionsReducer(state, action);
    nextState.data.size.should.equal(5);
    nextState.data.get("2").toJS().should.deepEqual({ _id: 2, name: 'whiskey' });
    nextState.data.get("6").toJS().should.deepEqual(actionData[0]);
    nextState.queries.getIn(["latest/", "total"]).should.equal(26);
    nextState.queries.getIn(["latest/", "idx"]).toJS().should.deepEqual([0, 1, 2, 3, 6]);
    nextState.queries.getIn(["latest/golle", "total"]).should.equal(13);
    nextState.queries.getIn(["latest/golle", "idx"]).toJS().should.deepEqual([0, 1, 6]);
  });

});

describe("Notification Reducer", () => {

  it('handles SHOW_NOTIFICATION', () => {
    const state = Map();
    const action = {
      type: actionTypes.SHOW_NOTIFICATION,
      notification: {
        message: "lorem",
        className: "danger"
      }
    };
    const nextState = notificationReducer(state, action);
    nextState.get("message").should.equal(action.notification.message);
    nextState.get("className").should.equal(action.notification.className);
    nextState.get("active").should.equal(true);
  });

  it('handles HIDE_NOTIFICATION', () => {
    const state = Map();
    const action = {
      type: actionTypes.HIDE_NOTIFICATION,
      notification: {
        message: "lorem",
        className: "danger"
      }
    };
    const nextState = notificationReducer(state, action);
    nextState.get("active").should.equal(false);
  });

});
