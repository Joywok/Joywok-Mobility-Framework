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
 *案例编号：SPMS-API-DICTS-LIST002
 *案例名称：成功获取字典列表（data）
 *案例目标：验证字典列表可以正确打开
 *前置条件：系统中存在字典信息（导入数据）
 *预期返回：1、客户端请求已成功相应。
  2、页面正常打开正确。
  3、返回正确列表数目
  */
it('002 成功获取字典列表（data）', function(done){

      api.get('/cmri/test/initdata?t=dicts')
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
                   expect(res.body.data.list).to.have.length(3); //have 3 datas

                   
                   if (err) return done(err);

              done();
          });
      })
  })


  after( function(){
    delete this.cookie;
  } )

});