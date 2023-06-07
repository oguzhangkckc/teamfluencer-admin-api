const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../App');

chai.use(chaiHttp);

let mongoServer;
let mongoUri;
let createdAdminEmail;

before(async function () {
  this.timeout(5000);
  mongoServer = await MongoMemoryServer.create();
  mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
});

after(async function () {
  this.timeout(5000);
  if (mongoServer) {
    await mongoServer.stop();
  }
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async function () {
  if (createdAdminEmail) {
    await mongoose.connection.collection('admins').deleteOne({ email: createdAdminEmail });
    createdAdminEmail = null;
  }
});

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
        createdAdminEmail = res.body.email;
        console.log("createdAdminId" + createdAdminEmail);
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
