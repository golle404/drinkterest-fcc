import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
//import Login from './components/Login';
import AuthenticationPage from './components/AuthenticationPage';
import User from './components/User';

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="/auth/:method" component={AuthenticationPage} />
    <Route path="/user/:username/latest" component={User} />
    <Route path="/user/:username/recent" component={User} />
  </Route>
)

export default routes;
