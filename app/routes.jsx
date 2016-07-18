import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import DrinksPage from './components/DrinksPage';
import AuthenticationPage from './components/AuthenticationPage';
import UserProfile from './components/UserProfile';
import DrinkForm from './components/DrinkForm';

import {loadDrinksRequest, clearDrinks} from './actions/drinksActions';

const routes = (store) => {

  const refreshDrinks = (nextState, replace) => {
    const queryParams = {
      submitterName: nextState.params.user || "",
      sort: nextState.params.sort || "recent"
    }
    const queryString = queryParams.sort + "/" + queryParams.submitterName;
    if(!store.getState().drinks.queries.get(queryString)){
      store.dispatch(loadDrinksRequest(queryParams))
    }
  }

  const requestAuthentication = (nextState, replace) => {
    if(!store.getState().user.get("auth")){
      replace('/auth/login')
    }
  }

  return (
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route path="/drinks(/:sort)(/:user)" component={DrinksPage} onEnter={refreshDrinks}/>
      <Route path="/auth/:method" component={AuthenticationPage} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/add_drink" component={DrinkForm} onEnter={requestAuthentication}/>
      <Route path="/drink/edit/:id" component={DrinkForm} onEnter={requestAuthentication}/>
    </Route>
  )
}
export default routes;
