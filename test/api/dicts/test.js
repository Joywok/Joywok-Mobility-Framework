var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')
  , api = supertest('http://10.2.5.191');

describe('添加test', function() {

  var self = this
    , cookie;

  before(function(done){
    config.login( done, self );
  });


  it('001 成功删除字典', function(done){
          api.delete('/spms/console/dicts/?id=classifytest_x2')
          .set('Accept', 'application/json')
          .set('Cookie', self.cookie)
          .set('User-Agent',config.browser)
          .end(function(err, res)
          {      
                    console.log('res.body.data',res.body.data);
                    expect(200);
                    expect(res.body).to.have.property("code", 0);
             //       expect(res.body.data.item).to.have.deep.property("key","classifytest_x1");
           
                    if (err) return done(err);
            done();
          });
    
  })

   it('002 get recent list', function(done){
          api.get('/spms/console/dicts')
          .set('Accept', 'application/json')
          .set('Cookie', self.cookie)
          .set('User-Agent',config.browser)
          .end(function(err, res)
          {      
                    console.log('res.body.data',res.body.data);
                    expect(200);
                    expect(res.body).to.have.property("code", 0);
             //       expect(res.body.data.item).to.have.deep.property("key","classifytest_x1");
           
                    if (err) return done(err);
            done();
          });
    
  })


    after( function(){
    delete this.cookie;
  } )

});