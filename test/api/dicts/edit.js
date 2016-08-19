var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')
  , api = supertest('http://10.2.5.191');

describe('编辑字典', function() {

  var self = this
    , cookie;

  before(function(done){
    config.login( done, self );
  });

/* 
 *案例编号：SPMS-API-DICTS-EDIT001
 *案例名称：成功编辑字典后返回新值
 *案例目标：输入必填字段，验证成功编辑字典后可以返回正确的字典信息
 *输入：key‘classifytest001’，Name‘测试字典分类（i）’，Dicts ['type1','type2']
 *预期返回：1、客户端请求已成功相应。
  2、页面正常打开正确。
  3、返回的字典信息与输入一致。
 */

  it('001 成功添加字典edit', function(done){
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
                  expect(res.body.data.item).to.have.deep.property("key","classifytest001");
                  expect(res.body.data).to.have.deep.property("item.name","测试字典分类（一）");
                  expect(res.body.data.item.dicts).to.have.deep.property("[0]","分类1","[1]","分类2");
                  
                if (err) return done(err);
        done();
      });
  })


  it('001 成功编辑字典', function(done){
     api.put('/spms/console/dicts?id=classifytest001')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest001",
        name:"测试字典分类（i）" ,
        dicts:['type1','type2'],  
             })
      
      .end(function(err, res)
      {      
                  console.log('res.body.data',res.body.data);
                  expect(200);
                  expect(res.body).to.have.property("code", 0);
                  expect(res.body.data.item).to.have.deep.property("key","classifytest001");

                  
                if (err) return done(err);
        done();
      });
  })

/* 
 *案例编号：SPMS-API-DICTS-EDIT002
 *案例名称：不成功编辑字典，返回错误信息
 *案例目标：必填字段字典分类为空，验证不成功编辑字典后可以返回错误信息
 *输入：key‘’，Name‘测试字典分类（ii）’，Dicts ['type1','type2']
 *预期返回：errorcode 231003，字典分类或分类名称不能为空
 */

  it('002 成功添加字典edit', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest002",
        name:"测试字典分类（二）" ,
        dicts:['分类1','分类2'],  
             })
      
      .end(function(err, res)
      {      
                  expect(200);
                  expect(res.body).to.have.property("code", 0);
                  expect(res.body.data.item).to.have.deep.property("key","classifytest002");

                  
                if (err) return done(err);
        done();
      });
  })

  it('002 编辑字典不成功后返回错误信息', function(done){
     api.put('/spms/console/dicts?id=classifytest002')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "",
        name:"测试字典分类（ii）" ,
        dicts:['type1','type2'],  
             })
      
      .end(function(err, res)
      {      
                console.log('res.body.data',res.body.data);
                expect(res.body).to.have.property("err_code",231003);
                expect(res.body).to.have.property("err_memo","字典分类或分类名称不能为空");
                  
                if (err) return done(err);
        done();
      });
  })

  /* 
 *案例编号：SPMS-API-DICTS-EDIT003
 *案例名称：不成功编辑字典，返回错误信息
 *案例目标：必填字段字典分类为空，验证不成功编辑字典后可以返回错误信息
 *输入：key‘classifytest001’，Name‘’，Dicts ['type1','type2']
 *预期返回：errorcode 231003，字典分类或分类名称不能为空
 */

  it('003 成功添加字典edit', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest003",
        name:"测试字典分类（三）" ,
        dicts:['分类1','分类2'],  
             })
      
      .end(function(err, res)
      {      
                  expect(200);
                  expect(res.body).to.have.property("code", 0);
                  expect(res.body.data.item).to.have.deep.property("key","classifytest003");

                if (err) return done(err);
        done();
      });
  })

  it('003 编辑字典不成功后返回错误信息', function(done){
     api.put('/spms/console/dicts?id=classifytest003')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest003",
        name:"" ,
        dicts:['type1','type2'],  
             })
      
      .end(function(err, res)
      {         
           //     console.log('res.body.data',res.body.data);
                expect(res.body).to.have.property("err_code",231003);
                expect(res.body).to.have.property("err_memo","字典分类或分类名称不能为空");
                  
                if (err) return done(err);
        done();
      });
  })

  /* 
 *案例编号：SPMS-API-DICTS-EDIT004
 *案例名称：不成功编辑字典，返回错误信息
 *案例目标：字典分类数据为空 ，验证不成功编辑字典后可以返回错误信息
 *输入：key‘classifytest001’，Name‘测试字典分类（iv）’
 *预期返回：errorcode 231006，字典分类里数据为空
 */
 
  it('006 成功添加字典edit', function(done){
     api.post('/spms/console/dicts')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest004",
        name:"测试字典分类（四）" ,
        dicts:['分类1','分类2'],  
             })
      
      .end(function(err, res)
      {      
                  expect(200);
                  expect(res.body).to.have.property("code", 0);
                  expect(res.body.data.item).to.have.deep.property("key","classifytest004");

                if (err) return done(err);
        done();
      });
  })

  it('006 编辑字典不成功后返回错误信息', function(done){
     api.put('/spms/console/dicts?id=classifytest004')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        key: "classifytest004",
        name:"测试字典分类（iv）" ,
      
             })
      
      .end(function(err, res)
      {      
                console.log(res.body.data);
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