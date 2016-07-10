import {Router} from 'express';
import passport from 'passport';
import * as userCtrl from '../controllers/userCtrl';
import * as drinkCtrl from '../controllers/drinkCtrl';

let router = Router();
////////////  API  /////////////////
router.post('/api/drink', isLoggedIn, drinkCtrl.addDrink);
router.put('/api/drink/like/:id', isLoggedIn, drinkCtrl.likeDrink);

////////// AUTH ROUTES /////////////
router.post('/auth/register', (req, res, next) => {
  passport.authenticate('local-register', (err, user) => {
    if(err){
      return res.json({error: err})
    }
    if(user){
      const profile = {username: user.local.username, id: user._id};
      req.logIn(profile, (loginErr) => {
        if(loginErr){
          return res.json({error: loginErr});
        }
        return res.json({user: profile});
      })
    }
  })(req, res, next);
})

router.post('/auth/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user) => {
    if(err){
      return res.json({error: err})
    }
    if(user){
      const profile = {username: user.local.username, id: user._id};
      req.logIn(profile, (loginErr) => {
        if(loginErr){
          return res.json({error: loginErr});
        }
        return res.json({user: profile});
      })
    }
  })(req, res, next);
})

router.delete('/auth', isLoggedIn, userCtrl.deleteUser);
router.post('/auth/logout', (req, res) => {
  req.logout();
  res.json({success: true})
})

///////  test route only  ////////////////////////
router.get('/restricted', isLoggedIn, (req, res) => {
  res.json({success: true});
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.json({error: "Forbiden"});
}

export default router;
