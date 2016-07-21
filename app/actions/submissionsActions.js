import * as actionTypes from './actionTypes';
import normalizeSubmissions from './../../utils/normalizeSubmissions';
import {browserHistory} from 'react-router';

export const loadSubmissionsSuccess = (submissions, query) => {
  return { type: actionTypes.LOAD_SUBMISSIONS_SUCCESS, submissions, query};
}

export const addSubmissionSuccess = (submissions) => {
  return { type: actionTypes.ADD_SUBMISSION_SUCCESS, submissions};
}

export const clearSubmissions = () => {
  return { type: actionTypes.CLEAR_SUBMISSIONS};
}

export const loadSubmissionsRequest = (queryString) => {
  return (dispatch) => {
    return fetch('/api/submissions/' + queryString, {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            dispatch(loadSubmissionsSuccess(normalizeSubmissions(json.data), json.query));
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}

export const addSubmissionRequest = (submission) => {
  return (dispatch) => {
    return fetch('/api/submission', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body: JSON.stringify(submission)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            //dispatch(addSubmissionSuccess(normalizeSubmissions([json.submission])));
            browserHistory.push("/submissions/latest/" + json.submission.submitterName)
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}

export const editSubmissionRequest = (submission) => {
  return (dispatch) => {
    return fetch('/api/submission', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body: JSON.stringify(submission)
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            console.log(json);
            //dispatch(addSubmissionSuccess(normalizeSubmissions([json.submission])));
            browserHistory.push("/submissions/recent/" + json.submission.submitterName)
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}

export const deleteSubmissionRequest = (submissionId) => {
  return (dispatch) => {
    return fetch('/api/submission/' + submissionId, {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin'
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            console.log(json);
            //dispatch(addSubmissionSuccess(normalizeSubmissions([json.submission])));
            browserHistory.push("/submissions/recent/")
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}

export const likeSubmissionRequest = (submissionId) => {
  return (dispatch) => {
    return fetch('/api/like/' + submissionId, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      credentials: 'same-origin'
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          if(json.error){
            console.log(json.error);
          }else{
            console.log(json);
            dispatch(addSubmissionSuccess(normalizeSubmissions([json.submission])));
            //browserHistory.push("/submissions/recent/")
          }
        })
      }else{
        console.log("bad response");
      }
    })
  }
}
