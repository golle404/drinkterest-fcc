import serverConfig from '../config/server.config';

import supertest from 'supertest';
import should from 'should';
import jade from 'jade';

const url = 'http://localhost:' + serverConfig.PORT;

let server = supertest.agent(url);

const submission = {
  name: "vodka",
  url: "http://vodka.com",
  image: "http://vodka.com/vodka.jpg"
}
const newSubmission = {
  name: "beer",
  url: "http://beer.com",
  image: "http://beer.com/beer.jpg"
}

const profile = {
  username: "unit",
  password: "test"
}
const wrongUsername = {
  username: "wrong",
  password: "username"
}
const wrongPassword = {
  username: "unit",
  password: "error"
}

let userId, submissionId, dummyData;

describe('Server API test', function () {

  it('responds to /', (done) => {
    server.get("/")
    .end((err, res) => {
      res.status.should.equal(200);
      res.type.should.equal('text/html');
      done();
    });
  }).timeout(5000)

  /*it('returns 404', (done) => {
    server.get("/undef")
    .expect(404)
    .end((err, res) => {
      res.status.should.equal(404);
      done();
    });
  })*/

  it('registers account', (done) => {
    profile.register = true;
    server.post("/auth/local")
    .send(profile)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.user.username.should.equal(profile.username);
      done();
    });
  });

  it('logs out', (done) => {
    server.post("/auth/logout")
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.success.should.equal(true);
      done();
    })
  })

  it('does not register account if username exists', (done) => {
    profile.register = true;
    server.post("/auth/local")
    .send(profile)
    .end((err, res) => {
      res.type.should.equal('application/json');
      should.exists(res.body.error);
      res.body.error.should.equal("Username already exists")
      done();
    });
  });

  it('does not allow adding submission when loged out', (done) => {
    server.post("/api/submission")
    .send(submission)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.error.should.equal("Forbiden");
      done();
    })

  })

  it('does not login with wrong password', (done) => {
    wrongPassword.register = false;
    server.post("/auth/local")
    .send(wrongPassword)
    .end((err, res) => {
      res.type.should.equal('application/json');
      should.exists(res.body.error);
      res.body.error.should.equal("Wrong password")
      done();
    });
  });

  it('logs in', (done) => {
    profile.register = false;
    server.post("/auth/local")
    .send(profile)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.user.username.should.equal(profile.username);
      done();
    });
  });

  it('can access restricted routes when loged in', (done) => {
    server.get("/restricted")
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.success.should.equal(true);
      done();
    });
  });

  it('posts submission', (done) => {
    server.post("/api/submission")
    .send(submission)
    .end((err, res) => {
      res.type.should.equal('application/json');
      const resDrink = res.body.submission;
      resDrink.name.should.equal(submission.name);
      resDrink.url.should.equal(submission.url);
      resDrink.submitterName.should.equal(profile.username);
      resDrink.likes.length.should.equal(1);
      resDrink.likes[0].should.equal(resDrink.submitterId);
      submissionId = resDrink._id;
      done();
    })

  })

  it('puts like', (done) => {
    server.put("/api/like/" + submissionId)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.submission.likes.length.should.equal(0);
      done();
    })

  })

  it('edits submission', (done) => {
    newSubmission.id = submissionId
    server.put("/api/submission")
    .send(newSubmission)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.submission.name.should.equal(newSubmission.name);
      res.body.submission.url.should.equal(newSubmission.url);
      res.body.submission.submitterName.should.equal(profile.username);
      done();
    })

  })

  it('deletes submission', (done) => {
    server.delete("/api/submission/" + submissionId)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.success.should.equal(true)
      done();
    })

  })

  it('loads dummy submissions', (done) => {
    server.post("/api/dummy")
    .end((err, res) => {
      dummyData = res.body.data;
      res.type.should.equal('application/json');
      res.body.success.should.equal(true)
      done();
    })
  }).timeout(10000)

  it('get default submissions', (done) => {
    server.get("/api/submissions")
    .end((err, res) => {
      res.type.should.equal('application/json');
      const latest = dummyData.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      const randomIndex = Math.floor(Math.random() * res.body.data.length);
      const bd = new Date(res.body.data[randomIndex].createdAt).toString();
      const fd = new Date(latest[randomIndex].createdAt).toString();
      bd.should.equal(fd)
      res.body.total.should.equal(dummyData.length);
      done();
    })
  })

  /*it('get popular submissions', (done) => {
    server.get("/api/submissions/popular")
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.data.length.should.equal(20)
      const popular = dummyData.sort((a, b) => { return b.likes.length - a.likes.length });
      const randomIndex = Math.floor(Math.random()*res.body.data.length);
      res.body.data[randomIndex].numLikes.should.equal(popular[randomIndex].likes.length)
      res.body.query.total.should.equal(popular.length);
      res.body.query.queryStr.should.equal("popular/");
      done();
    })
  })

  it('get popular submissions 2nd page', (done) => {
    server.get("/api/submissions/popular")
    .send({skip: 10})
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.data.length.should.equal(dummyData.length - 10)
      const popular = dummyData.sort((a, b) => { return b.likes.length - a.likes.length });
      const randomIndex = Math.floor(Math.random()*res.body.data.length);
      res.body.data[randomIndex].numLikes.should.equal(popular[randomIndex+10].likes.length)
      done();
    })
  })*/

  it('get user submissions', (done) => {
    server.get("/api/submissions/dummy__4")
    .end((err, res) => {
      res.type.should.equal('application/json');
      const filtered = res.body.data.filter((d) => { return d.submitterId === "4"})
      res.body.data.length.should.equal(filtered.length)
      const randomIndex = Math.floor(Math.random()*filtered.length);
      res.body.data[randomIndex].numLikes.should.equal(filtered[randomIndex].likes.length)
      done();
    })
  })

  /*it('get user popular submissions', (done) => {
    server.get("/api/submissions/popular/dummy__5")
    .end((err, res) => {
      res.type.should.equal('application/json');
      const popular = res.body.data
                        .filter((d) => { return d.submitterName === "dummy__5"})
                        .sort((a, b) => {return b.likes.length - a.likes.length})
      res.body.data.length.should.equal(popular.length)
      const randomIndex = Math.floor(Math.random()*popular.length);
      res.body.data[randomIndex].numLikes.should.equal(popular[randomIndex].likes.length)
      res.body.query.queryStr.should.equal("popular/dummy__5");
      done();
    })
  })*/

  it('out of submissions', (done) => {
    server.get("/api/submissions/dummy__2?skip=20")
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.data.length.should.equal(0);
      done();
    })
  })

  it('deletes dummy submissions', (done) => {
    server.delete("/api/dummy")
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.success.should.equal(true)
      done();
    })
  })

  it('deletes user profile', (done) => {
    server.delete("/auth")
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.success.should.equal(true)
      done();
    })

  })

  it('can not access restricted routes when loged out', (done) => {
    server.get("/restricted")
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.error.should.equal("Forbiden");
      done();
    });
  });

});
