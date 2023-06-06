const { expect } = require('chai');
const chai = require('chai');
const request = require('supertest');
const app = require('../../App');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('signUp Endpoint /admin/signUp', () => {
  it('Yeni kullanıcı kaydını doğrulamalı ve token dönmeli', (done) => {
    const admin = {
      email: 'test@example.com',
      password: 'password123',
    };

    chai
      .request(app)
      .post('/admin/signUp')
      .send(admin)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('email', admin.email);
        expect(res.body).to.have.property('token');
        done(err);
      });
  });

  it('Eksik bilgi ile hata dönmeli', (done) => {
    const admin = {
      email: 'test@example.com',
    };

    request(app)
      .post('/admin/signUp')
      .send(admin)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
