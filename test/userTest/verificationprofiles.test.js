const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../App');

chai.use(chaiHttp);

describe('GET /user/getverificationprofiles', function() {
    this.timeout(5000);

    it('should return verification profiles', async function() {
        const res = await chai
            .request(app)
            .get('/user/getverificationprofiles');

        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.an('array');
    });

    it('if there is no the user who is waiting for approval should return an empty array', async function() {
        const res = await chai
            .request(app)
            .get('/user/getverificationprofiles');

        chai.expect(res).to.have.status(200);
    });
});


