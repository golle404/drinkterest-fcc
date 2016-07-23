import Submission from '../models/Submission';
import fetch from 'node-fetch';

export function addSubmission(req, res, next){
  let submission = new Submission(req.body);
  submission.submitterId = req.user.id;
  submission.submitterName = req.user.local.username;
  submission.likes = [req.user.id];
  submission.createdAt = new Date;
  submission.save((err) => {
    if(err){
      return res.json({error: err})
    }
    res.json({submission: submission});
  })
}

export function likeSubmission(req, res, next){
  Submission.findById(req.params.submissionId, (err, submission) => {
    if(err){
      return res.json({error: err})
    }
    const index = submission.likes.indexOf(req.user.id);
    if(index !== -1){
      submission.likes.splice(index, 1)
    }else{
      submission.likes.push(req.user.id)
    }
    submission.save((err) => {
      if(err){
        return res.json({error: err})
      }
      res.json({submission: submission})
    })
  })
}

export function editSubmission(req, res, next){
  Submission.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, submission) => {
    if(err){
      return res.json({error: err})
    }
    res.json({submission: submission});
  })
}

export function deleteSubmission(req, res, next){
  Submission.remove({_id: req.params.submissionId}, (err) => {
    if(err){
      return res.json({error: err})
    }
    res.json({success: true});
  })
}

export function getSubmissions(req, res, next){
  const submitterName = req.params.user || "";
  const sort = req.params.sort || "latest";
  const skip = parseInt(req.query.skip) || 0;
  querySubmissions(submitterName, sort, skip).then((response) => {
      res.json({data: response.data, query: response.query});
    }).catch((err) => {
      res.json({error: err})
    })
}

export function querySubmissions(submitterName = "", sort = "latest", skip = 0, cb){
  let sortBy = {};
  let query = {}
  if(submitterName){
    query.submitterName = submitterName;
  }
  if(sort === "popular"){
    sortBy.numLikes = -1;
  }else{
    sortBy.createdAt = -1;
  }
  return new Promise((resolve, reject) => {
    Submission.find(query).count((err, total) => {
      if(err){
        reject({error: err})
      }
      Submission.find(query).sort(sortBy).skip(skip).limit(20).lean().exec((err, doc) => {
        if(err){
          reject({error: err})
        }
        const queryStr = sort + "/" + submitterName;
        resolve({data: doc, query: {total: total, queryStr: queryStr}});
      })
    })
  })
}
///////////////   for testing only - loads dummmy data from reddit  /////////////////
export function loadDummyData(req, res, next){
  const url = "https://www.reddit.com/r/drinks/search.json?q=site%3Aimgur.com&restrict_sr=on&sort=relevance&t=all";
  let submissions = [];
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
        submissions.push(d);
        let submission = new Submission(d);
        submission.save()
      })
    }).then(() => {
      res.json({success: true, data: submissions});
    })
  })
}

export function deleteDummyData(req, res, next){
  Submission.remove({submitterName: new RegExp('dummy__', "i")}, (err) => {
    if(err){
      return res.json({error: err})
    }
    res.json({success: true});
  })
}