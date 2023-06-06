const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../App');

chai.use(chaiHttp);

describe('signUp Endpoint /admin/signUp', () => {
  it('The test should verify the successful registration of a new user and the return of a token.', (done) => {
    const admin = {
      email: 'test@example.com',
      password: 'password123',
    };

    chai
      .request(app)
      .post('/admin/signUp')
      .send(admin)
      .end((err, res) => {
        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.have.property('email', admin.email);
        chai.expect(res.body).to.have.property('token');
        done(err);
      });
  });

  it('The test should return an error when there is missing information.', (done) => {
    const admin = {
      email: 'test@example.com',
    };

    chai
      .request(app)
      .post('/admin/signUp')
      .send(admin)
      .end((err, res) => {
        chai.expect(res).to.have.status(400);
        chai.expect(res.body).to.have.property('error');
        done(err);
      });
  });
});