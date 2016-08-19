var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')

describe('添加计划任务', function() {

  var self = this
    , cookie
    , api = supertest(config.host);

  before(function(done){
    config.login( done, self );
  });

  it('计划任务清单', function(done){
    api.get('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.have.deep.property("code", 0);
        if (err) return done(err);
        console.log('as data', res.body);
        done();
      });
  })

  after( function(){
    // delete this.cookie;
  } )

});