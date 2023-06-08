const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../App');

chai.use(chaiHttp);

describe('signIn Endpoint /admin/signIn', () => {
    it('The test should verify the successful login of a user and the return of a token.', (done) => {
        const admin = {
            email: 'test@example.com',
            password: 'password123',
            role: 'admin'
        };

        chai
            .request(app)
            .post('/admin/signIn')
            .send(admin)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('email', admin.email);
                chai.expect(res.body).to.have.property('role', admin.role);
                chai.expect(res.body).to.have.property('token');
                done(err);
            })
    })

    it('The test should return an error when there is missing information.', (done) => {
        const admin = {
            email: "wrong@gmail.com"
        };

        chai
            .request(app)
            .post('/admin/signIn')
            .send(admin)
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(res.body).to.have.property("error")
                done(err);
            })
    })
})