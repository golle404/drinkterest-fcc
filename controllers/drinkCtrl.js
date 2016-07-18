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
    res.json({drink: drink});
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
      res.json({drink: drink})
    })
  })
}

export function editDrink(req, res, next){
  Drink.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, drink) => {
    if(err){
      return res.json({error: err})
    }
    res.json({drink: drink});
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
  if(req.body.submitterName){
    query.submitterName = req.body.submitterName;
  }
  if(req.body.sort === "popular"){
    sortBy.numLikes = -1;
  }else{
    sortBy.createdAt = -1;
  }
  getDrinkList(query, sortBy, start)
    .then((response) => {
      const queryStr = (req.body.sort || "recent") + "/" + (req.body.submitterName || "");
      res.json({data: response.data, query: {total: response.total, queryStr: queryStr}});
    }).catch((err) => {
      res.json({error: err})
    })
}

export function getDrinkList(query = {}, sortBy = {createdAt: -1}, start = 0){
  return new Promise((resolve, reject) => {
    Drink.find(query).count((err, total) => {
      if(err){
        reject({error: err})
      }
      Drink.find(query).sort(sortBy).skip(start).limit(20).lean().exec((err, doc) => {
        if(err){
          reject({error: err})
        }
        resolve({data: doc, total: total});
      })
    })
  })
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
          createdAt: child.data.created
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
