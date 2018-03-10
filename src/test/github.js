const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const server = require('../app');

const username = 'mkora';
const notUsername = 'frfrfrfrfrfrf';

chai.use(chaiHttp);

describe('GitHub user profile endpoints', () => {

  describe(`GET /api/user/${username}`, () => {
    it('it should return user profile information', (done) => {
      chai.request(server)
        .get(`/api/user/${username}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.have.property('ok');
          done();
        });
    });
  });

  describe(`GET /api/user/${notUsername}`, () => {
    it('it should return error if user not found', (done) => {
      chai.request(server)
        .get(`/api/user/${notUsername}`)
        .end((err, res) => {
          expect(err).not.to.be.null;
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe(`GET /api/clear/${username}`, () => {
    it('it should clear server cache', (done) => {
      chai.request(server)
        .get(`/api/clear/${username}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.have.property('ok', true);
          done();
        });
    });
  });

  describe(`GET /api/limit`, () => {
    it('it should return github api rate limits', (done) => {
      chai.request(server)
        .get(`/api/limit`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.have.property('ok');
          done();
        });
    });
  });
});
