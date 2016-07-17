import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import DrinksPage from './components/DrinksPage';
import AuthenticationPage from './components/AuthenticationPage';
import User from './components/User';

import {drinksListRequest, clearDrinks} from './actions/drinksActions';

const routes = (store) => {

  const refreshDrinks = (nextState, replace) => {
    //console.log(nextState)
    const queryParams = {
      submitterName: nextState.params.user || "",
      sort: nextState.params.sort || "recent"
    }
    //console.log(queryParams)
    store.dispatch(clearDrinks());
    store.dispatch(drinksListRequest(queryParams));
  }

  return (
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route path="/drinks(/:sort)(/:user)" component={DrinksPage} onEnter={refreshDrinks}/>
      <Route path="/auth/:method" component={AuthenticationPage} />
      <Route path="/user/:username/latest" component={User} />
      <Route path="/user/:username/recent" component={User} />
    </Route>
  )
}
export default routes;
