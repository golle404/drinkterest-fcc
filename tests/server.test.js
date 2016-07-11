import serverConfig from '../config/server.config';

import supertest from 'supertest';
import should from 'should';
import jade from 'jade';

const url = 'http://localhost:' + serverConfig.PORT;

let server = supertest.agent(url);
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
    const profile = {
      username: "admin",
      password: "admin"
    }
    server.post("/auth/register")
    .send(profile)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.user.username.should.equal('admin');
      //userId = res.body.user.id;
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
    const profile = {
      username: "admin",
      password: "test"
    }
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
    const drink = {
      name: "vodka",
      url: "http://vodka.com",
      image: "http://vodka.com/vodka.jpg"
    }
    server.post("/api/drink")
    .send(drink)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.error.should.equal("Forbiden");
      done();
    })

  })

  it('does not login with wrong password', (done) => {
    const profile = {
      username: "admin",
      password: "test"
    }
    server.post("/auth/login")
    .send(profile)
    .end((err, res) => {
      res.type.should.equal('application/json');
      should.exists(res.body.error);
      res.body.error.should.equal("Wrong password")
      done();
    });
  });

  it('logs in', (done) => {
    const profile = {
      username: "admin",
      password: "admin"
    }
    server.post("/auth/login")
    .send(profile)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.user.username.should.equal('admin');
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
    const drink = {
      name: "vodka",
      url: "http://vodka.com",
      image: "http://vodka.com/vodka.jpg"
    }
    server.post("/api/drink")
    .send(drink)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.name.should.equal("vodka");
      res.body.url.should.equal("http://vodka.com");
      res.body.submitterName.should.equal("admin");
      res.body.likes.length.should.equal(1);
      res.body.likes[0].should.equal(res.body.submitterId);
      drinkId = res.body.id;
      done();
    })

  })

  it('put like', (done) => {

    server.put("/api/like/" + drinkId)
    .end((err, res) => {
      res.type.should.equal('application/json');
      res.body.likes.length.should.equal(0);
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
