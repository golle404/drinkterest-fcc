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

const app = express();

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

app.get('/', function (req, res) {
  res.status(200).render('index');
});

app.listen(serverConfig.PORT, () => {
  console.log("Server listening at port " + serverConfig.PORT);
})

export default app;
