import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import SubmissionsPage from './components/SubmissionsPage';
import AuthenticationPage from './components/AuthenticationPage';
import UserProfile from './components/UserProfile';
import SubmissionForm from './components/SubmissionForm';
import {Provider} from 'react-redux';

import {loadSubmissionsRequest, clearSubmissions} from './actions/submissionsActions';


export default function getRoutes(store){

  const loadSubmissions = (nextState, replace) => {
    //console.log(nextState.params.submitter || "");
    store.dispatch(clearSubmissions());
    store.dispatch(loadSubmissionsRequest(nextState.params.submitter || ""));
    /*const queryParams = {
      submitterName: nextState.params.submitter || "",
      sort: nextState.params.sort || "latest"
    }
    const queryString = queryParams.sort + "/" + queryParams.submitterName;
    const query = store.getState().submissions.queries.get(queryString);
    if(!query || query.get("total") === -1){
      store.dispatch(loadSubmissionsRequest(queryString))
    }*/
  }

  const requestAuthentication = (nextState, replace) => {
    if(!store || !store.getState().user.get("auth")){
      replace('/auth/login');
    }
  }

  return (
    <Route path="/" component={Root}>
      <IndexRoute component={SubmissionsPage} onEnter={loadSubmissions}/>
      <Route path="profile" component={UserProfile} onEnter={requestAuthentication}/>
      <Route path="submission/add" component={SubmissionForm} onEnter={requestAuthentication}/>
      <Route path="submission/edit/:id" component={SubmissionForm} onEnter={requestAuthentication}/>
      <Route path="user(/:submitter)" component={SubmissionsPage} onEnter={loadSubmissions}/>
      <Route path="auth/:method" component={AuthenticationPage} />
    </Route>
  )

};
