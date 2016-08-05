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

const actionDummyData = [
  {_id: 0, name: "wine"},
  {_id: 7, name: "rum"},
  {_id: 12, name: "water"},
];

const stateDummyData = {
  data: {
    '0': { _id: 0, name: 'beer' },
    '1': { _id: 1, name: 'vodka' },
    '2': { _id: 2, name: 'whiskey' },
    '3': { _id: 3, name: 'cider' }
  },
  submitters:{
    '*': {
      idx: [0, 1, 2, 3],
      total: 5
    }
  }
};
const dummySubmissions = normalizeSubmissions(actionDummyData);
stateDummyData.submitters['*'].idx = OrderedSet(stateDummyData.submitters['*'].idx);
stateDummyData.submitters = fromJS(stateDummyData.submitters);
stateDummyData.data = fromJS(stateDummyData.data);
let newDummy;

  it('handles LOAD_SUBMISSIONS_SUCCESS with empty state', () => {
    const state = {};
    const action = {
      type: actionTypes.LOAD_SUBMISSIONS_SUCCESS,
      submitterName: "*",
      total: 25,
      submissions: dummySubmissions
    };
    const nextState = submissionsReducer(state, action);
    nextState.data.size.should.equal(actionDummyData.length);
    nextState.data.get("0").toJS().should.deepEqual(actionDummyData[0]);
    nextState.submitters.getIn(["*", "idx"]).toJS().should.deepEqual([0, 7, 12]);
    nextState.submitters.getIn(["*", "total"]).should.equal(25);
  });

  it('handles LOAD_SUBMISSIONS_SUCCESS with existing state', () => {
    const action = {
      type: actionTypes.LOAD_SUBMISSIONS_SUCCESS,
      total: 42,
      submitterName: "*",
      submissions: dummySubmissions
    };
    const nextState = submissionsReducer(stateDummyData, action);
    nextState.data.size.should.equal(6);
    nextState.data.get("2").toJS().should.deepEqual(stateDummyData.data.get("2").toJS());
    nextState.data.get("7").toJS().should.deepEqual(actionDummyData[1]);
    nextState.data.get("0").toJS().should.deepEqual(actionDummyData[0]);
    nextState.submitters.getIn(["*", "idx"]).toJS().should.deepEqual([0, 1, 2, 3, 7, 12]);
    nextState.submitters.getIn(["*", "total"]).should.equal(42);
  });

  it('handles LOAD_SUBMISSIONS_SUCCESS with existing state and new submitter', () => {
    const action = {
      type: actionTypes.LOAD_SUBMISSIONS_SUCCESS,
      total: 42,
      submitterName: "golle",
      submissions: dummySubmissions
    };
    const nextState = submissionsReducer(stateDummyData, action);
    //console.log(nextState);
    newDummy = nextState;
    nextState.data.size.should.equal(6);
    nextState.data.get("2").toJS().should.deepEqual(stateDummyData.data.get("2").toJS());
    nextState.data.get("7").toJS().should.deepEqual(actionDummyData[1]);
    nextState.data.get("0").toJS().should.deepEqual(actionDummyData[0]);
    nextState.submitters.getIn(["*", "idx"]).toJS().should.deepEqual([0, 1, 2, 3]);
    nextState.submitters.getIn(["*", "total"]).should.equal(5);
    nextState.submitters.getIn(["golle", "idx"]).toJS().should.deepEqual([0, 7, 12]);
    nextState.submitters.getIn(["golle", "total"]).should.equal(42);
  });

  it('handles ADD_SUBMISSION_SUCCESS', () => {
    const action = {
      type: actionTypes.ADD_SUBMISSION,
      submission: {_id: 6, name: "juice", submitterId: "g404", submitterName: "golle"}
    };
    const nextState = submissionsReducer(newDummy, action);
    nextState.data.size.should.equal(7);
    nextState.data.get("2").toJS().should.deepEqual(newDummy.data.get("2").toJS());
    nextState.data.get("6").toJS().should.deepEqual(action.submission);
    nextState.submitters.getIn(["*", "idx"]).toJS().should.deepEqual([6, 0, 1, 2, 3]);
    nextState.submitters.getIn(["*", "total"]).should.equal(6);
    nextState.submitters.getIn(["golle", "idx"]).toJS().should.deepEqual([6, 0, 7, 12]);
    nextState.submitters.getIn(["golle", "total"]).should.equal(43);
  });

  it('handles ADD_SUBMISSION_SUCCESS with non existing submitter', () => {
    const action = {
      type: actionTypes.ADD_SUBMISSION,
      submission: {_id: 6, name: "juice", submitterId: "g404", submitterName: "golle2"}
    };

    const nextState = submissionsReducer(newDummy, action);
    nextState.data.size.should.equal(7);
    nextState.data.get("2").toJS().should.deepEqual(newDummy.data.get("2").toJS());
    nextState.data.get("6").toJS().should.deepEqual(action.submission);
    nextState.submitters.getIn(["*", "idx"]).toJS().should.deepEqual([6, 0, 1, 2, 3]);
    nextState.submitters.getIn(["*", "total"]).should.equal(6);
    nextState.submitters.has("golle2").should.equal(false);
  });

  it('handles UPDATE_SUBMISSION_SUCCESS', () => {
    const action = {
      type: actionTypes.UPDATE_SUBMISSION,
      submission: {_id: 1, name: "juice", submitterId: "g404", submitterName: "golle"}
    };

    const nextState = submissionsReducer(stateDummyData, action);
    nextState.data.size.should.equal(4);
    nextState.data.get("1").toJS().should.deepEqual(action.submission);
  });

  it('handles DELETE_SUBMISSION_SUCCESS', () => {
    const action = {
      type: actionTypes.DELETE_SUBMISSION,
      submission: {_id: 0, submitterName: "golle"}
    };
    const nextState = submissionsReducer(newDummy, action);
    nextState.data.size.should.equal(5);
    nextState.data.has("0").should.equal(false);
    nextState.submitters.getIn(["*", "idx"]).toJS().should.deepEqual([1, 2, 3]);
    nextState.submitters.getIn(["*", "total"]).should.equal(4);
    nextState.submitters.getIn(["golle", "idx"]).toJS().should.deepEqual([7, 12]);
    nextState.submitters.getIn(["golle", "total"]).should.equal(41);
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
