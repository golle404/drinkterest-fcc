import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import DrinksPage from './components/DrinksPage';
import AuthenticationPage from './components/AuthenticationPage';
import UserProfile from './components/UserProfile';
import DrinkForm from './components/DrinkForm';

import {loadSubmissionsRequest, clearDrinks} from './actions/submissionsActions';

export const getRoutes = (store) => {

  const shouldReload = (nextState, replace) => {
    const queryParams = {
      submitterName: nextState.params.user || "",
      sort: nextState.params.sort || "latest"
    }
    const queryString = queryParams.sort + "/" + queryParams.submitterName;
    if(!store.getState().submissions.queries.get(queryString)){
      console.log(queryString);
      store.dispatch(loadSubmissionsRequest(queryString))
    }
  }

  const requestAuthentication = (nextState, replace) => {
    if(!store || !store.getState().user.get("auth")){
      replace('/auth/login')
    }
  }

  return (
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route path="/submissions(/:sort)(/:user)" component={DrinksPage} onEnter={shouldReload}/>
      <Route path="/auth/:method" component={AuthenticationPage} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/add_drink" component={DrinkForm} onEnter={requestAuthentication}/>
      <Route path="/submission/edit/:id" component={DrinkForm} onEnter={requestAuthentication}/>
    </Route>
  )

};

export default getRoutes;
