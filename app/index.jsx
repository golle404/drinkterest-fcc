import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {Router, browserHistory} from 'react-router';
import getRoutes from './routes';

import configureStore from './store/configureStore';
import initSocket from './socket/index';

import './../style/style.scss';

const store = configureStore();
initSocket(store);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes(store)}/>
  </Provider>
  , document.getElementById('app'))
