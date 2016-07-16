import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import App from './components/App';

import configureStore from './store/configureStore';

const store = configureStore(window.INITIAL_STATE);

//console.log(store.getState());
render(<App data={store.getState()}/>, document.getElementById('app'))
