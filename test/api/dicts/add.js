var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')
  , api = supertest('http://10.2.5.191');

describe('添加字典', function() {

  var self = this
    , cookie;

  before(function(done){
    config.login( done, self );
  });

/* 
 *案例编号：SPMS-API-DICTS-ADD001
 *案例名称：成功添加后返回字典信息
 *案例目标：输入必填字段，验证成功添加字典后可以返回正确的字典信息
 *输入：key‘classifytest001’，Name‘测试字典分类（一）’，Dicts ['分类1','分类2']
 *预期返回：1、客户端请求已成功相应。
  2、页面正常打开正确。
  3、返回的字典信息与输入一致。
 */


  it('001 成功添加字典', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest001",
        name:"测试字典分类（一）" ,
        dicts:['分类1','分类2'],  
             })
      
      .end(function(err, res)
      {      
               //   console.log('res.body',res);
                  expect(200);
                  expect(res.body).to.have.property("code", 0);
                  expect(res.body.data).to.not.have.property("page");
                  expect(res.body).to.have.property("data");
                  expect(res.body.data.item).to.have.deep.property("key","classifytest001");
                  expect(res.body.data).to.have.deep.property("item.name","测试字典分类（一）");
                  expect(res.body.data.item.dicts).to.have.deep.property("[0]","分类1","[1]","分类2");
                  
                if (err) return done(err);
        done();
      });
  })

/* 
 *案例编号：SPMS-API-DICTS-ADD002
 *案例名称：不成功添加字典，返回错误信息
 *案例目标：必填字段字典分类为空，验证不成功添加字典后可以返回错误信息
 *输入：key‘’，Name‘测试字典分类（二）’，Dicts ['分类1','分类2']
 *预期返回：errorcode 231003，字典分类或分类名称不能为空
 */

  it('002 添加字典不成功后返回错误信息', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "",
        name:"测试字典分类（一）" ,
        dicts:['分类1','分类2'],  
             })
      
      .end(function(err, res)
      {      
                expect(res.body).to.have.property("err_code",231003);
                expect(res.body).to.have.property("err_memo","字典分类或分类名称不能为空");
                  
                if (err) return done(err);
        done();
      });
  })
  

  /* 
 *案例编号：SPMS-API-DICTS-ADD003
 *案例名称：不成功添加字典，返回错误信息
 *案例目标：必填字段字典分类为空，验证不成功添加字典后可以返回错误信息
 *输入：key‘classifytest3’，Name‘’，Dicts ['分类1','分类2']
 *预期返回：errorcode 231003，字典分类或分类名称不能为空
 */

  it('003 添加字典不成功后返回错误信息', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest3",
        name:"" ,
        dicts:['分类1','分类2'],  
             })
      
      .end(function(err, res)
      {      
                expect(res.body).to.have.property("err_code",231003);
                expect(res.body).to.have.property("err_memo","字典分类或分类名称不能为空");
                  
                if (err) return done(err);
        done();
      });
  })

  /* 
 *案例编号：SPMS-API-DICTS-ADD004
 *案例名称：不成功添加字典，返回错误信息
 *案例目标：必填字段字典分类已存在，验证不成功添加字典后可以返回错误信息
 *输入：key‘classifytest001’，Name‘测试字典分类（一）’，Dicts ['分类1','分类2']
 *预期返回：errorcode 231001，字典分类已存在
 */

  it('004 添加字典不成功后返回错误信息', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest001",
        name:"测试字典分类（一）" ,
        dicts:['分类1','分类2'],  
             })
      
      .end(function(err, res)
      {      
                expect(res.body).to.have.property("err_code",231001);
                expect(res.body).to.have.property("err_memo","字典分类已经存在");
                  
                if (err) return done(err);
        done();
      });
  })


/* 
 *案例编号：SPMS-API-DICTS-ADD005
 *案例名称：不成功添加字典，返回错误信息
 *案例目标：字典分类名称为中文 ，验证不成功添加字典后可以返回错误信息
 *输入：key‘中文测试五’，Name‘测试字典分类（五）’，Dicts ['分类1','分类2']
 *预期返回：errorcode 231002，字典分类须为英文字母或数字
 */

  it('005 添加字典不成功后返回错误信息', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "中文测试五",
        name:"测试字典分类（五）" ,
        dicts:['分类1','分类2'],  
             })
      
      .end(function(err, res)
      {      
                expect(res.body).to.have.property("err_code",231002);
                expect(res.body).to.have.property("err_memo","字典分类须为英文字母或数字");
                  
                if (err) return done(err);
        done();
      });
  })


  /* 
 *案例编号：SPMS-API-DICTS-ADD006
 *案例名称：不成功添加字典，返回错误信息
 *案例目标：字典分类数据为空 ，验证不成功添加字典后可以返回错误信息
 *输入：key‘classifytest6’，Name‘测试字典分类（六）’，Dicts ‘’
 *预期返回：errorcode 231006，字典分类数据不能为空
 */

  it('006 添加字典不成功后返回错误信息', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest006",
        name:"测试字典分类（六）" ,
      
             })
      
      .end(function(err, res)
      {      
                console.log('res.body.data',res.body.data);
                expect(res.body).to.have.property("err_code",231006);
                expect(res.body).to.have.property("err_memo","字典分类里数据为空");
                  
                if (err) return done(err);
        done();
      });
  })


    after( function(){
    delete this.cookie;
  } )

});