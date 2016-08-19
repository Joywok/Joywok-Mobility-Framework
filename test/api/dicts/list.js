var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')
  , api = supertest('http://10.2.5.191');

describe('获取字典列表', function() {

  var self = this
    , cookie;

  before(function(done){
    config.login( done, self );
  });

/* 
 *案例编号：SPMS-API-DICTS-LIST001
 *案例名称：成功获取字典列表（空）
 *案例目标：验证字典列表可以正确打开
 *前置条件：系统中字典信息为空
 *预期返回：1、客户端请求已成功相应。
  2、页面正常打开正确。
  3、返回空列表
  */

  it('001 成功获取字典列表（空）', function(done){
    api.get('/cmri/test/initdata?t=cleardicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .end(function(){

         api.get('/spms/console/dicts')
         .set('Accept', 'application/json')
         .set('Cookie', self.cookie)
         .set('User-Agent',config.browser)
      
         .end(function(err, res)
         {      
                   console.log('res.body.data',res.body.data);
                   expect(200);
                   expect(res.body).to.have.property("code", 0);
                   expect(res.body.data).to.not.have.property("page");
                   expect(res.body.data.list).to.be.empty;           
                   
                   if (err) return done(err);

               done();
          });
      });
  })

  after( function(){
    delete this.cookie;
  } )

});