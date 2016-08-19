var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest');

describe('项目列表', function() {
  this.timeout(1000);
  var self = this
    , cookie
    , api = supertest(config.host);

  before(function(done){
    config.login( done, self );
  });

  it('项目列表', function(done){
    api.get('/spms/project/projects')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent', config.browser)
      .expect(200)
      .end(function(err, res){
        console.log(res.body)
        expect(res.body).to.have.deep.property("code", 0);
        expect(res.body).to.have.deep.property("data.page.pageno", 1);
        expect(res.body).to.have.deep.property("data.list[0].id", '1');
        if (err) return done(err);
        done();
      });
  });

  after( function(){
    delete this.cookie;
  } )

});