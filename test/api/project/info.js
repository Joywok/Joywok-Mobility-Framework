var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest');

describe('项目列表', function() {

  var self = this
    , cookie
    , api = supertest(config.host);

  before(function(done){
    config.login( done, self );
  });

  it('项目列表', function(done){
    api.get('/spms/project/projects?id=0g3tK04IUTRHufML')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent', config.browser)
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.deep.property("code", 0);
        expect(res.body).to.have.deep.property("data.item.id", '0g3tK04IUTRHufML');
        if (err) return done(err);
        done();
      });
  });

  after( function(){
    delete this.cookie;
  } )

});