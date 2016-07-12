import User from '../models/User';
import {Strategy as LocalStrategy} from 'passport-local';

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
      User.findOne({'local.username': username}, (err, user) => {
        if(err){
          return done(err);
        }
        if(user){
          return done("Username already exists");
        }else{
          let newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
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
    User.findOne({'local.username': username}, (err, user) => {
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
}
