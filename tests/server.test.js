import serverConfig from '../config/server.config';

import supertest from 'supertest';
import should from 'should';
import jade from 'jade';

const url = 'http://localhost:' + serverConfig.PORT;

let server = supertest.agent(url);

const drink = {
  name: "vodka",
  url: "http://vodka.com",
  image: "http://vodka.com/vodka.jpg"
}
const newDrink = {
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

let userId, drinkId, dummyData;

describe('Server API test', function () {

  it('responds to /', (done) => {
    server.get("/")
    .end((err, res) => {
      res.status.should.equal(200);
      res.type.should.equal('text/html');
      done();
    });
  })

  /*it('returns 404', (done) => {
    server.get("/undef")
    .expect(404)
    .end((err, res) => {
      res.status.should.equal(404);
      done();
    });
  })*/

  it('registers account', (done) => {
    server.post("/auth/register")
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
    server.post("/auth/register")
    .send(profile)
    .end((err, res) => {
      res.type.should.equal('application/json');
      should.exists(res.body.error);
      res.body.error.should.equal("Username already exists")
      done();
    });
  });

  it('does not allow adding submission when loged out', (done) => {
    server.post("/api/drink")
    .send(drink)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.error.should.equal("Forbiden");
      done();
    })

  })

  it('does not login with wrong password', (done) => {
    server.post("/auth/login")
    .send(wrongPassword)
    .end((err, res) => {
      res.type.should.equal('application/json');
      should.exists(res.body.error);
      res.body.error.should.equal("Wrong password")
      done();
    });
  });

  it('logs in', (done) => {
    server.post("/auth/login")
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
    server.post("/api/drink")
    .send(drink)
    .end((err, res) => {
      res.type.should.equal('application/json');
      const resDrink = res.body.drink;
      resDrink.name.should.equal(drink.name);
      resDrink.url.should.equal(drink.url);
      resDrink.submitterName.should.equal(profile.username);
      resDrink.likes.length.should.equal(1);
      resDrink.likes[0].should.equal(resDrink.submitterId);
      drinkId = resDrink._id;
      done();
    })

  })

  it('puts like', (done) => {
    server.put("/api/like/" + drinkId)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.drink.likes.length.should.equal(0);
      done();
    })

  })

  it('edits submission', (done) => {
    server.put("/api/drink/" + drinkId)
    .send(newDrink)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.drink.name.should.equal(newDrink.name);
      res.body.drink.url.should.equal(newDrink.url);
      res.body.drink.submitterName.should.equal(profile.username);
      done();
    })

  })

  it('deletes submission', (done) => {
    server.delete("/api/drink/" + drinkId)
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
    server.get("/api/drink/list")
    .end((err, res) => {
      res.type.should.equal('application/json');
      const latest = dummyData.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      const randomIndex = Math.floor(Math.random() * res.body.drinks.length);
      const bd = new Date(res.body.drinks[randomIndex].createdAt).toString();
      const fd = new Date(latest[randomIndex].createdAt).toString();
      bd.should.equal(fd)
      res.body.info.total.should.equal(dummyData.length);
      done();
    })
  })

  it('get popular submissions', (done) => {
    server.get("/api/drink/list")
    .send({sort: "popular"})
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.drinks.length.should.equal(20)
      const popular = dummyData.sort((a, b) => { return b.likes.length - a.likes.length });
      const randomIndex = Math.floor(Math.random()*res.body.drinks.length);
      res.body.drinks[randomIndex].numLikes.should.equal(popular[randomIndex].likes.length)
      done();
    })
  })

  it('get popular submissions 2nd page', (done) => {
    server.get("/api/drink/list")
    .send({sort: "popular", start: 10})
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.drinks.length.should.equal(dummyData.length - 10)
      const popular = dummyData.sort((a, b) => { return b.likes.length - a.likes.length });
      const randomIndex = Math.floor(Math.random()*res.body.drinks.length);
      res.body.drinks[randomIndex].numLikes.should.equal(popular[randomIndex+10].likes.length)
      done();
    })
  })

  it('get user latest submissions', (done) => {
    server.get("/api/drink/list")
    .send({submitterId: 4})
    .end((err, res) => {
      res.type.should.equal('application/json');
      const filtered = res.body.drinks.filter((d) => { return d.submitterId === "4"})
      res.body.drinks.length.should.equal(filtered.length)
      done();
    })
  })

  it('get user popular submissions', (done) => {
    server.get("/api/drink/list")
    .send({submitterId: 2, sort: "popular"})
    .end((err, res) => {
      res.type.should.equal('application/json');
      const popular = res.body.drinks
                        .filter((d) => { return d.submitterId === "2"})
                        .sort((a, b) => {return b.likes.length - a.likes.length})
      res.body.drinks.length.should.equal(popular.length)
      const randomIndex = Math.floor(Math.random()*popular.length);
      res.body.drinks[randomIndex].numLikes.should.equal(popular[randomIndex].likes.length)
      res.body.info.total.should.equal(popular.length);
      done();
    })
  })

  it('out of submissions', (done) => {
    server.get("/api/drink/list")
    .send({submitterId: 2, sort: "popular", start: 20})
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.drinks.length.should.equal(0);
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
