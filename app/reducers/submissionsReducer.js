import { combineReducers } from "redux";
import { Map, OrderedSet} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

function queryUpdater(idx, total = 0){
  return (v = Map()) => {
    return v.set("total", total)
      .update("idx", (v = OrderedSet()) => v.union(OrderedSet(idx)));
  };
}

const submissionsQueries = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.LOAD_SUBMISSIONS_SUCCESS:
      return state.update(action.query.queryStr, queryUpdater(action.submissions.result, action.query.total));
    case actionTypes.ADD_SUBMISSION_SUCCESS:{
      const submitterName = action.submissions.entities.data[action.submissions.result[0]].submitterName;
      const newState = state.update('latest/' + submitterName, queryUpdater(action.submissions.result, state.getIn(["latest/" + action.submitterName, "total"]) + 1));
      return newState.update('latest/', queryUpdater(action.submissions.result, state.getIn(["latest/", "total"]) + 1));
    }
    case actionTypes.CLEAR_SUBMISSIONS:
      return new Map();
    default:
      return state;
  }
};

const submissionsData = (state = Map(), action) => {
  switch (action.type) {
    case actionTypes.LOAD_SUBMISSIONS_SUCCESS:
      return state.merge(action.submissions.entities.data);
    case actionTypes.ADD_SUBMISSION_SUCCESS:
      return state.merge(action.submissions.entities.data);
    default:
      return state;
  }
};

const submissionsReducer = combineReducers({
  queries: submissionsQueries,
  data: submissionsData
});

export default submissionsReducer;
