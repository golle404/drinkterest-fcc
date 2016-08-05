import User from '../models/User';
import oauthConfig from './oauth.config';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import {Strategy as GithubStrategy} from 'passport-github2';

export default function init(passport){

  passport.serializeUser((user, done) => {
      done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
          done(err, user);
      });
  });

  passport.use('local-register', new LocalStrategy((username, password, done) => {
    process.nextTick(() => {
      User.findOne({'username': username}, (err, user) => {
        if(err){
          return done(err);
        }
        if(user){
          return done("Username already exists");
        }else{
          let newUser = new User();
          newUser.username = username;
          newUser.password = newUser.generateHash(password);
          newUser.save((err) => {
            if(err){
              //throw err;
              return done(err);
            }else{
              return done(null, newUser);
            }
          })
        }
      })
    })
  }))

  passport.use('local-login', new LocalStrategy((username, password, done) => {
    User.findOne({'username': username}, (err, user) => {
      if(err){
        return done(err);
      }
      if(!user){
        return done("Username not found");
      }
      if(!user.validPassword(password)){
        return done("Wrong password");
      }
      return done(null, user);
    })
  }))

  passport.use(new TwitterStrategy(oauthConfig.twitter, (token, tokenSecret, profile, done) => {
    process.nextTick(function() {
      authenticateSocial(profile, token, done);
    });
  }))

  passport.use(new GithubStrategy(oauthConfig.github, (token, tokenSecret, profile, done) => {
    process.nextTick(function() {
      authenticateSocial(profile, token, done);
    });
  }));

  function authenticateSocial(profile, token, done){
    User.findOne({ 'username' : profile.username }, function(err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();
        newUser.oauthToken = token;
        newUser.username = profile.username;
        newUser.save(function(err) {
            if (err)
                throw err;
            return done(null, newUser);
        });
      }
    });
  }
}
