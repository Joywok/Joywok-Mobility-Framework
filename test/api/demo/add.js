var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')

describe('测试添加数据', function() {

  var self = this
    , cookie
    , api = supertest(config.host);

  before(function(done){
    config.login( done, self );
  });

  it('测试添加数据', function(done){
    api.post('/spms/demo/redisadd')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36')
      .send({ name: 'Manny', species: 'cat' })
      .expect(200)
      .end(function(err, res){
        // console.log(res)
        expect(res.body).to.have.deep.property("code", 0);
        if (err) return done(err);
        done();
      });
  })

  after( function(){
    delete this.cookie;
  } )

});