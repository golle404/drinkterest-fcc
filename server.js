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
import {querySubmissions} from './controllers/submissionsController';

import generateHtml from './utils/generateHtml';
import generateInitialState from './utils/generateInitialState';

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

//app.use('/public', express.static(path.join(__dirname, '/public')));
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
////////  router  ///////////////////////
app.use('/', apiRouter);
//////////////////////////////////////////

/////////// ssr  ///////////////////////
app.use("/user/:submitterName", (req, res, next) => {
  const submitterName = req.params.submitterName || "";
  querySubmissions(submitterName).then((response) => {
      req.submissions = {data: response.data, total: response.total, submitter: response.submitter};
      next()
    }).catch((err) => {
      console.log(err);
      next();
    })
})

app.use((req, res) => {
  const initialState = generateInitialState(req.isAuthenticated(), req.user, req.submissions);
  generateHtml(initialState, req.url).then((response) => {
    res.render("index", {initialState: initialState, html: response});
  }).catch((error) => {
    switch (error.status) {
      case 500:
        res.status(500).send(error.message);
        break;
      case 302:
        if(error.redirectPath){
          res.status(302).redirect(error.redirectPath);
        }else{
          res.sendStatus(302);
        };
        break;
      default:
        res.sendStatus(404);
    }
  })
});

app.listen(serverConfig.PORT, () => {
  console.log("Server listening at port " + serverConfig.PORT);
})
//export default app;
