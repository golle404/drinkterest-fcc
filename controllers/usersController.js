import User from '../models/User';
import passport from 'passport';

export function deleteUser(req, res, next){
  User.remove({_id: req.user.id}, (err) => {
    if(err){
      res.json({error: err});
    }else{
      req.logout();
      res.json({success: true});
    }
  });
}

export function localAuth(req, res, next){
  const method = req.body.register ? 'local-register' : 'local-login';
  passport.authenticate(method, (err, user) => {
    if(err){
      return res.json({error: err});
    }
    if(user){
      const profile = {username: user.username, id: user.id};
      req.logIn(profile, (loginErr) => {
        if(loginErr){
          return res.json({error: loginErr});
        }
        return res.json({user: profile});
      });
    }
  })(req, res, next);
}
