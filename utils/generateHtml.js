import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createRoutes} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './../app/store/configureStore';
import getRoutes from './../app/routes.jsx';

export default function generateHtml(initialState, location){
  return new Promise((resolve, reject) => {
    const store = configureStore(initialState);
    match({routes: getRoutes(store), location: location}, (err, redirectLocation, renderProps) => {
      if (err) {
        reject({message: err.message, status: 500});
      } else if (redirectLocation) {
        reject({status: 302, redirectPath: redirectLocation.pathname + redirectLocation.search});
      } else if (renderProps) {
        const html = renderToString(
          createElement(Provider, { store: store },
            createElement(RouterContext, renderProps)
          )
        );
        resolve(html);
      }else{
        reject({status: 302});
      }
    });
  });
}
