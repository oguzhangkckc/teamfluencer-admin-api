const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../App');

chai.use(chaiHttp);

describe('signin endpoint /admin/signIn', function() {
    this.timeout(5000)
    it('should return a session token and email when login is successful', async function() {
        const admin = {
            email: 'test@example.com',
            password: 'password123',
            _id: '648084c726d6bc4fd371a397'
        };

        const res = await chai
            .request(app)
            .post('/admin/signIn')
            .send(admin);

        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.have.property('session');

        const session = res.body.session;
        const sessionId = Object.keys(session)[0];

        const email = session[sessionId].email;
        const userId = session[sessionId].userId;
        const role = session[sessionId].role;

        chai.expect(email).to.equal(admin.email);
        chai.expect(userId).to.equal(admin._id);
        chai.expect(role).to.equal('admin');
    });

    it('should return an error when email or password is incorrect', async function() {
        const admin = {
          email: 'wrong@example.com',
          password: 'wrongpassword'
        };
      
        const res = await chai
          .request(app)
          .post('/admin/signIn')
          .send(admin);
      
        chai.expect(res).to.have.status(400);
        chai.expect(res.body).to.have.property('error').that.is.a('string');
      });
      

});
