const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../App');

chai.use(chaiHttp);

describe('GET /user/getverificationprofiles', function () {
  this.timeout(5000);

  it('should return verification profiles', async function () {
    const res = await chai.request(app).get('/user/getverificationprofiles');

    chai.expect(res).to.have.status(200);
    chai.expect(res.body.length).to.be.equal(200);
    chai.expect(res.body).to.be.an('array');
    chai.expect(res).to.have.status(200);
    chai.expect(res.body.length).to.be.equal(200);
    chai.expect(res.body).to.be.an('array');

    for (let i = 0; i < res.body.length; i++) {
      const profile = res.body[i];
      chai.expect(profile).to.have.property('name');
      chai.expect(profile).to.have.property('email');
      chai.expect(profile).to.have.property('phone');
      chai.expect(profile).to.have.property('profile_complete');
      chai.expect(profile).to.have.property('country');
      chai.expect(profile).to.have.property('city');
      chai.expect(profile).to.have.property('gender');
      chai.expect(profile).to.have.property('followers');
      chai.expect(profile).to.have.property('post_number');
      chai.expect(profile).to.have.property('average_likes');
      chai.expect(profile).to.have.property('videos');
    }
  });

  it('if there is no the user who is waiting for approval should return an empty array', async function () {
    const res = await chai.request(app).get('/user/getverificationprofiles');

    chai.expect(res).to.have.status(200);
  });

  //10 tane user çek yaş aralıgı 24-30 olsun, eğer 24-30 dışında başka user çekerse hata döndürsün
  //follower
  //tiktok_follower
  //post_number
  //videos
  //tiktok_average_likes
  //and so on
});
