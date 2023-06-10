const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../App');

chai.use(chaiHttp);

describe('GET /user/getuser', function() {
    this.timeout(5000);

    it('should return a user when email parameter is provided', async function() {
        const email = 'dilara@teamfluencer.co';

        const res = await chai
            .request(app)
            .get('/user/getuser')
            .query({ email });

        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.property('email').to.equal(email);
        chai.expect(res.body).to.have.property('phone');
    });

    it('should return a user when phone parameter is provided', async function() {
        const phone = '5423905123';

        const res = await chai
            .request(app)
            .get('/user/getuser')
            .query({ phone });

        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.property('email');
        chai.expect(res.body).to.have.property('phone').to.equal(phone);
    });

    it('should return an error when no parameter is provided', async function() {
        const res = await chai
            .request(app)
            .get('/user/getuser');

        chai.expect(res).to.have.status(400);
        chai.expect(res.body).to.have.property('error').to.equal('You should provide at least one parameter: email, phone.');
    });

    it('should return an error when user is not found', async function() {
        const email = 'nonexistent@example.com';

        const res = await chai
            .request(app)
            .get('/user/getuser')
            .query({ email });

        chai.expect(res).to.have.status(404);
        chai.expect(res.body).to.have.property('error').to.equal('User not found');
    });
});
