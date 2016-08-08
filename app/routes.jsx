import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import {Provider} from 'react-redux';

import Root from './components/Root.jsx';
import About from './components/About.jsx';
import SubmissionsPage from './components/SubmissionsPage.jsx';
import AuthenticationPage from './components/AuthenticationPage.jsx';
import UserProfile from './components/UserProfile.jsx';
import SubmissionForm from './components/SubmissionForm.jsx';

import {loadSubmissionsRequest} from './actions/submissionsActions';


export default function getRoutes(store){

  const loadSubmissions = (nextState, replace) => {
    const submitter = nextState.params.submitter || "*";
    if(!store.getState().submissions.submitters.has(submitter)){
      store.dispatch(loadSubmissionsRequest(nextState.params.submitter || ""));
    }
  };

  const requestAuthentication = (nextState, replace) => {
    if(!store || !store.getState().user.get("auth")){
      replace('/auth/login');
    }
  };

  return (
    <Route path="/" component={Root}>
      <IndexRedirect to="all"/>
      <Route path="all" component={SubmissionsPage} onEnter={loadSubmissions}/>
      <Route path="profile" component={UserProfile} onEnter={requestAuthentication}/>
      <Route path="about" component={About} />
      <Route path="submission/add" component={SubmissionForm} onEnter={requestAuthentication}/>
      <Route path="submission/edit/:id" component={SubmissionForm} onEnter={requestAuthentication}/>
      <Route path="user(/:submitter)" component={SubmissionsPage} onEnter={loadSubmissions}/>
      <Route path="auth/:method" component={AuthenticationPage} />
    </Route>
  );
}
