import { combineReducers } from "redux";
import { Map, OrderedSet} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const dataReducer = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.LOAD_SUBMISSIONS_SUCCESS:
      return state.merge(action.submissions.entities.data);
    case actionTypes.CLEAR_SUBMISSIONS:
      return Map();
    case actionTypes.ADD_SUBMISSION_SUCCESS:
    case actionTypes.UPDATE_SUBMISSION_SUCCESS:
      return state.merge({[action.submission._id]: action.submission});
    case actionTypes.DELETE_SUBMISSION_SUCCESS:
      return state.delete(String(action.submission._id));
    default:
      return state;
  }
};

const submittersReducer = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.LOAD_SUBMISSIONS_SUCCESS:
      return state.update(action.submitterName, Map(), (v) => {
        return v.update("idx", OrderedSet(), (i) => {
          return i.union(action.submissions.result)
        }).set("total", action.total);
      })
    case actionTypes.ADD_SUBMISSION_SUCCESS:
      return state.update("*", Map(), (v) => {
        return v.update("idx", OrderedSet(), (i) => {
          return OrderedSet([action.submission._id]).union(i);
        }).update("total", 0, (t) => t + 1)
      }).update(action.submission.submitterName, (v) => {
        if(!v) return;
        return v.update("idx", OrderedSet(), (i) => {
          return OrderedSet([action.submission._id]).union(i)
        }).update("total", 0, (t) => t + 1)
      })
    case actionTypes.DELETE_SUBMISSION_SUCCESS:
      return state.update("*", Map(), (v) => {
        return v.update("idx", OrderedSet(), (i) => {
          return i.delete(action.submission._id);
        }).update("total", 0, (t) => t - 1)
      }).update(action.submission.submitterName, (v) => {
        if(!v) return;
        return v.update("idx", OrderedSet(), (i) => {
          return i.delete(action.submission._id);
        }).update("total", 0, (t) => t - 1)
      })
    default:
      return state;
  }
}

export default combineReducers({
  data: dataReducer,
  submitters: submittersReducer
});
