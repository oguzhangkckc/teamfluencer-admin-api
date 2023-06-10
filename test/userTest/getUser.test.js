const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../App');

chai.use(chaiHttp);

describe('get user endpoint /user/getUser', function() {
    this.timeout(5000)
    it('should return a user when user is found', async function() {
        const user = {
            email: 'dilara@teamfluencer.co',
        };
    
        const res = await chai
            .request(app)
            .get('/user/getUser')
            .send(user);

        chai.expect(res).to.have.status(201);
        chai.expect(res.body).to.have.property('email');
        chai.expect(res.body).to.have.property('phone');
    });

    it('should return an error when user is not found', async function() {
        const user = {
            email: 'wrong@email.com',
        };

        const res = await chai
            .request(app)
            .get('/user/getUser')
            .send(user);

        chai.expect(res).to.have.status(404);
        chai.expect(res.body).to.have.property('error').that.is.a('string');
    });
});

