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
  name: "vodka",
  url: "http://vodka.com",
  image: "http://vodka.com/vodka.jpg"
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

let userId, drinkId;

describe('Server API test', function () {

  it('responds to / and renders template', (done) => {
    server.get("/")
    .end((err, res) => {
      res.status.should.equal(200);
      res.type.should.equal('text/html');
      const html = jade.renderFile('./views/index.jade');
      res.text.should.equal(html);
      done();
    });
  })

  it('returns 404', (done) => {
    server.get("/undef")
    .expect(404)
    .end((err, res) => {
      res.status.should.equal(404);
      done();
    });
  })

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
      res.body.name.should.equal(drink.name);
      res.body.url.should.equal(drink.url);
      res.body.submitterName.should.equal(profile.username);
      res.body.likes.length.should.equal(1);
      res.body.likes[0].should.equal(res.body.submitterId);
      drinkId = res.body.id;
      done();
    })

  })

  it('puts like', (done) => {

    server.put("/api/like/" + drinkId)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.likes.length.should.equal(0);
      done();
    })

  })

  /*it('edits submission', (done) => {
    server.put("/api/drink/" + drinkId)
    .send(newDrink)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.likes.length.should.equal(0);
      done();
    })

  })*/

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
