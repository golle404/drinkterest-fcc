import Drink from '../models/Drink';

export function addDrink(req, res, next){
  let drink = new Drink(req.body);
  drink.submitterId = req.user.id;
  drink.submitterName = req.user.local.username;
  drink.likes = [req.user.id];
  drink.save((err) => {
    if(err){
      return res.json({error: err})
    }
    res.json(drink);
  })
}

export function likeDrink(req, res, next){
  Drink.findById(req.params.id, (err, drink) => {
    if(err){
      return res.json({error: err})
    }
    const index = drink.likes.indexOf(req.user.id);
    if(index !== -1){
      drink.likes.splice(index, 1)
    }else{
      drink.likes.push(req.user.id)
    }
    drink.save((err) => {
      if(err){
        return res.json({error: err})
      }
      res.json(drink)
    })
  })
}
