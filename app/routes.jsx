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
    const submitter = nextState.params.submitter || "*";
    if(!store.getState().submissions.submitters.has(submitter)){
      store.dispatch(loadSubmissionsRequest(nextState.params.submitter || ""));
    }
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
