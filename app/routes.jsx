import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User';

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/user/:username/latest" component={User} />
    <Route path="/user/:username/recent" component={User} />
  </Route>
)

export default routes;
