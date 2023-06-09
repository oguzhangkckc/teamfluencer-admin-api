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
  it('The test should verify the successful registration of a new user and the return of a sessionId.', async () => {
    const admin = {
      email: 'test2@example.com',
      password: 'password123',
      role: "admin",
    };


    const res = await chai
      .request(app)
      .post('/admin/signUp')
      .send(admin);

    chai.expect(res).to.have.status(201);
    chai.expect(res.body).to.have.property('session');
    const session = res.body.session;
    const sessionId = Object.keys(session)[0];
    chai.expect(session).to.be.an('object');
    console.log("res.body.session", res.body.session)

    // "19ad92a0-d9e3-4268-89b0-58c9d1fac9a8"
    // console.log("res.body.session.email", res.body.session[0].email)
    const email = session[sessionId].email;
    const role = session[sessionId].role;

    chai.expect(email).to.equal(admin.email);
    chai.expect(role).to.equal(admin.role);

    console.log("createdAdminId" + createdAdminEmail);
    createdAdminEmail = email;
  });

  it('The test should return an error when there is missing information.', async () => {
    const admin = {
      email: 'test@example.com',
    };

    const res = await chai
      .request(app)
      .post('/admin/signUp')
      .send(admin);

    chai.expect(res).to.have.status(400);
    chai.expect(res.body).to.have.property('error');
  });
});
