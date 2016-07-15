import configureStore from './store/configureStore';

const store = configureStore(window.INITIAL_STATE);
console.log(store.getState().drinks);
