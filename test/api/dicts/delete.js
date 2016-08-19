var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')
  , api = supertest('http://10.2.5.191');

describe('删除字典', function() {

  var self = this
    , cookie;

  before(function(done){
    config.login( done, self );
  });

/* 
 *案例编号：SPMS-API-DICTS-DELETE001
 *案例名称：成功删除字典
 *案例目标：验证删除字典可以正确执行
 *前置条件：系统中存在已创建字典
 *输入：key‘classifytest_x1’
 *预期返回：1、客户端请求已成功相应。
  2、页面正常打开正确。
 */


  it('001 成功删除字典', function(done){

     api.get('/cmri/test/initdata?t=dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .end(function(){
          //  remove dict
          api.delete('/spms/console/dicts/?id=classifytest_x1')
          .set('Accept', 'application/json')
          .set('Cookie', self.cookie)
          .set('User-Agent',config.browser)
          .end(function(err, res)
          {      
              //      console.log('res.body',res.body);
                    expect(200);
                    expect(res.body).to.have.property("code", 0);
                    expect(res.body.data.item).to.have.deep.property("key","classifytest_x1");
           
                    if (err) return done(err);
            done();
          });
      });
  })


/* 
 *案例编号：SPMS-API-DICTS-DELETE002
 *案例名称：不成功删除字典，返回错误信息
 *案例目标：输入已被删除的字典时，验证不成功删除字典可以返回错误信息代码
 *前置条件：系统中有不存在的字典key
 *输入：key‘classifytest_y1’
 *预期返回：errorcode 231005，分类字典不存在
 */

it('002 删除字典不成功后返回错误信息', function(done){
     api.get('/cmri/test/initdata?t=dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .end(function(){
          //  remove dict
          api.delete('/spms/console/dicts/?id=classifytest_y1')
          .set('Accept', 'application/json')
          .set('Cookie', self.cookie)
          .set('User-Agent',config.browser)
          .end(function(err, res)
          {      
                    expect(res.body).to.have.property("err_code",231005);
                    expect(res.body).to.have.property("err_memo","字典分类不存在！");
                    
                    if (err) return done(err);
                    done();
          });
      });
  })



  after( function(){
    delete this.cookie;
  } )

});