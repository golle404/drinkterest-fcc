import Drink from '../models/Drink';
import fetch from 'node-fetch';

export function addDrink(req, res, next){
  let drink = new Drink(req.body);
  drink.submitterId = req.user.id;
  drink.submitterName = req.user.local.username;
  drink.likes = [req.user.id];
  drink.createdAt = new Date;
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

export function editDrink(req, res, next){
  Drink.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, drink) => {
    if(err){
      return res.json({error: err})
    }
    res.json(drink);
  })
}

export function deleteDrink(req, res, next){
  Drink.remove({_id: req.params.id}, (err) => {
    if(err){
      return res.json({error: err})
    }
    res.json({success: true});
  })
}

export function queryDrinks(req, res, next){
  const start = req.body.start || 0;
  let sortBy = {};
  let query = {}
  if(req.body.submitterId){
    query.submitterId = req.body.submitterId;
  }
  if(req.body.sort === "popular"){
    sortBy.numLikes = -1;
  }else{
    sortBy.createdAt = -1;
  }
  Drink.find(query).sort(sortBy).skip(start).limit(20).exec((err, doc) => {
    if(err){
      return res.json({error: err})
    }
    res.json({drinks: doc});
  })
  /*if(req.body.sort === "popular"){
    Drink.aggregate()
      .project({
        name: 1,
        url: 1,
        image: 1,
        likes: 1,
        submitterId: 1,
        submitterName: 1,
        numLikes: {
          $size: "$likes"
        }
      })
      .sort({numLikes: -1})
      .skip(start)
      .limit(20)
      .exec((err, doc) => {
        if(err){
          return res.json({error: err})
        }
        res.json({drinks: doc});
      })
  }else{
    let query = {}
    if(req.body.submitterId){
      query.submitterId = req.body.submitterId;
    }
    Drink.find(query).sort(sortBy).skip(start).limit(20).exec((err, doc) => {
      if(err){
        return res.json({error: err})
      }
      res.json({drinks: doc});
    })
  }*/

}


///////////////   for testing only - loads dummmy data from reddit  /////////////////
export function loadDummyData(req, res, next){
  const url = "https://www.reddit.com/r/drinks/search.json?q=site%3Aimgur.com&restrict_sr=on&sort=relevance&t=all";
  let drinks = [];
  fetch(url).then((response) => {
    response.json().then((json) => {
      json.data.children.forEach((child, id) => {
        const d = {
          name: child.data.title,
          url: child.data.url,
          image: child.data.thumbnail,
          likes: [],
          submitterId: id % 7,
          submitterName: "dummy__" + (id % 7),
          createdAt: id
        }
        for(let i=0; i<child.data.score; i++){
          d.likes.push("dummy_like_" + i);
        }
        drinks.push(d);
        let drink = new Drink(d);
        drink.save()
      })
    }).then(() => {
      res.json({success: true, data: drinks});
    })
  })
}

export function deleteDummyData(req, res, next){
  Drink.remove({submitterName: new RegExp('dummy__', "i")}, (err) => {
    if(err){
      return res.json({error: err})
    }
    res.json({success: true});
  })
}
