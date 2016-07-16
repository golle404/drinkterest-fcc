import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

import configureStore from './store/configureStore';

const store = configureStore(window.INITIAL_STATE);

render(<Router history={browserHistory} routes={routes}/>, document.getElementById('app'))
