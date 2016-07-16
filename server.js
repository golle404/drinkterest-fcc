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

import router from './api/router';
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
app.use('/', router);

/////////// ssr  ///////////////////////
import configureStore from './app/store/configureStore';
import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import App from './app/components/App';

app.get('/*', function (req, res) {
  const initialState = {
    user: {},
    drinks: {}
  }

  getDrinkList().then((resolve) => {
    initialState.drinks = resolve;
    //const store = configureStore(initialState);
    //const html = renderToString(createElement(App, {data: store.getState()}));
    //console.log(store.getState());
    res.status(200).render('index', {html: "", initialState: initialState});
  },
  (reject) => {
    res.json(reject)
  })

});

app.listen(serverConfig.PORT, () => {
  console.log("Server listening at port " + serverConfig.PORT);
})

export default app;
