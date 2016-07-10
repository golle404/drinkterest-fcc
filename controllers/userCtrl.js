import User from '../models/User';

export function deleteUser(req, res, next){
  User.remove({_id: req.user.id}, (err) => {
    if(err){
      res.json({error: err})
    }else{
      req.logout();
      res.json({success: true})
    }
  })
}
