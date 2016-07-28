import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import SubmissionsPage from './components/SubmissionsPage';
import AuthenticationPage from './components/AuthenticationPage';
import UserProfile from './components/UserProfile';
import SubmissionForm from './components/SubmissionForm';
import {Provider} from 'react-redux';

import {loadSubmissionsRequest, clearDrinks} from './actions/submissionsActions';


export default function getRoutes(store){

  const shouldReload = (nextState, replace) => {
    const queryParams = {
      submitterName: nextState.params.submitter || "",
      sort: nextState.params.sort || "latest"
    }
    const queryString = queryParams.sort + "/" + queryParams.submitterName;
    if(!store.getState().submissions.queries.get(queryString)){
      store.dispatch(loadSubmissionsRequest(queryString))
    }
  }

  const requestAuthentication = (nextState, replace) => {
    if(!store || !store.getState().user.get("auth")){
      replace('/auth/login');
    }
  }

  return (
    <Route path="/" component={Root}>
      <IndexRoute component={SubmissionsPage} onEnter={shouldReload}/>
      <Route path="profile" component={UserProfile} onEnter={requestAuthentication}/>
      <Route path="submission/add" component={SubmissionForm} onEnter={requestAuthentication}/>
      <Route path="submission/edit/:id" component={SubmissionForm} onEnter={requestAuthentication}/>
      <Route path="submissions(/:sort)(/:submitter)" component={SubmissionsPage} onEnter={shouldReload}/>
      <Route path="auth/:method" component={AuthenticationPage} />
    </Route>
  )

};
