var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest');

describe('获取列表', function() {

  var self = this
    , cookie
    , api = supertest(config.host);

  before(function(done){
    config.login( done, self );
  });

  it('SPMS Demo of Get', function(done){
    api.get('/spms/demo/seccessdata')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36')
      .expect(200)
      .end(function(err, res){
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