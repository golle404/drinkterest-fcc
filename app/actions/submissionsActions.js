import * as actionTypes from './actionTypes';
import normalizeSubmissions from './../../utils/normalizeSubmissions';
import {browserHistory} from 'react-router';
import {fetchData} from './fetchActions';
import {showNotification} from './notificationActions';

export const loadSubmissionsSuccess = (submissions, total) => {
  return { type: actionTypes.LOAD_SUBMISSIONS_SUCCESS, submissions, total};
};

export const addSubmissionSuccess = (submission) => {
  return { type: actionTypes.ADD_SUBMISSION_SUCCESS, submission: submission};
};

export const clearSubmissions = () => {
  return { type: actionTypes.CLEAR_SUBMISSIONS};
};

export const loadSubmissionsRequest = (queryString) => {
  const params = {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  };
  return (dispatch) => {
    fetchData('/api/submissions/' + queryString, params, dispatch, (json) => {
      dispatch(loadSubmissionsSuccess(json.data, json.total));
    });
  };
};

export const addSubmissionRequest = (submission) => {
  const params = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body: JSON.stringify(submission)
  };
  return (dispatch) => {
    fetchData('/api/submission', params, dispatch, (json) => {
      //console.log(json);
      //dispatch(addSubmissionSuccess(json.submission));
      //dispatch(addSubmissionSuccess(normalizeSubmissions([json.submission])));
      dispatch(showNotification({className: "info", message: "Your submission is added"}));
      browserHistory.push("/submissions/latest/" + json.submission.submitterName);
    });
  };
};

export const editSubmissionRequest = (submission) => {
  const params = {
    method: 'put',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(submission)
  };
  return (dispatch) => {
    fetchData('/api/submission', params, dispatch, (json) => {
      //dispatch(addSubmissionSuccess(normalizeSubmissions([json.submission])));
      dispatch(showNotification({className: "info", message: "Edit sucessfull"}));
      browserHistory.push("/submissions/recent/" + json.submission.submitterName);
    });
  };
};

export const deleteSubmissionRequest = (submissionId) => {
  const params = {
    method: 'delete',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'}
  };
  return (dispatch) => {
    fetchData('/api/submission/' + submissionId, params, dispatch, (json) => {
      //dispatch(addSubmissionSuccess(normalizeSubmissions([json.submission])));
      dispatch(showNotification({className: "warning", message: "Your submission is deleted"}));
      browserHistory.push("/");
    });
  };
};

export const likeSubmissionRequest = (submissionId) => {
  const params = {
    method: 'put',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'}
  };
  return (dispatch) => {
    fetchData('/api/like/' + submissionId, params, dispatch, (json) => {
      //dispatch(showNotification({className: "error", message: "Your like is recieved"}));
      dispatch(addSubmissionSuccess(normalizeSubmissions([json.submission])));
      //browserHistory.push("/submissions/recent/")
    });
  };
};
