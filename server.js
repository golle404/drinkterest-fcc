import serverConfig from './config/server.config';
import passportConfig from './config/passport.config';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import mongoose from 'mongoose';

import passport from 'passport';
passportConfig(passport);

import logger from 'morgan';

import apiRouter from './api/router';
import {getDrinkList} from './controllers/drinkCtrl'
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

const app = express();
////////////  webpack config  //////////////
let compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler));
///////////////////////////////////////////
app.use(logger("dev"));
/////////  connect database  //////////////
mongoose.connect(serverConfig.MONGO_PATH);
mongoose.connection.on("error", () => {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'freecodecampdrinkterest',
  saveUninitialized: true,
  resave: true
}));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

/// use jade as view engine ///////////////
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//////////////////////////////////////////
////////  router  ///////////////////////
app.use('/', apiRouter);

/////////// ssr  ///////////////////////
import configureStore from './app/store/configureStoreServer';
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createRoutes} from 'react-router';
import {Provider} from 'react-redux';
import getRoutes from './app/routes';

app.get('/*', (req, res) => {
  const urlParams = req.url.split("/");
  if(urlParams[1] === "drinks"){
    getDrinkList(urlParams[3], urlParams[2], 0, (data) => { renderPage(req, res, data); })
  }else{
    renderPage(req, res);
  }
  /*getDrinkList("", "recent", 0, (response) => {
    initialState.drinks.data = response.data;
    initialState.drinks.queries['recent/'] = {total: response.total};
    initialState.drinks.queries['recent/'].idx = response.data.map((v) => {return v._id});
    const store = configureStore(initialState);
    match({routes: getRoutes(store), location: req.url}, (err, redirectLocation, renderProps) => {

      if (err) {
        res.status(500).send(err.message);
      } else if (redirectLocation) {
        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        var html = renderToString(
          createElement(Provider, { store: store },
          createElement(RouterContext, renderProps)
        ));
        res.render("index", {initialState: initialState, html: html});
      } else {
        res.sendStatus(404);
      }
    })
  })*/
});

function renderPage(req, res, data){
  let initialState = {
    user: {},
    drinks: {data: {}, queries: {}}
  }
  if(req.isAuthenticated()){
    initialState.user.id = req.user._id;
    initialState.user.username = req.user.local.username;
    initialState.user.auth = true;
  }
  if(data){
    const urlParams = req.url.split("/");
    const query = (urlParams[2] || "recent")  + "/" + (urlParams[3] || "")
    initialState.drinks.data = data.data;
    initialState.drinks.queries[query] = {total: data.total};
    initialState.drinks.queries[query].idx = data.data.map((v) => {return v._id});
  }
  const store = configureStore(initialState);
  match({routes: getRoutes(store), location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = renderToString(
        createElement(Provider, { store: store },
        createElement(RouterContext, renderProps)
      ));
      res.render("index", {initialState: initialState, html: html});
    } else {
      res.sendStatus(404);
    }
  })
}

app.listen(serverConfig.PORT, () => {
  console.log("Server listening at port " + serverConfig.PORT);
})

export default app;
