var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')
  , api = supertest('http://10.2.5.191');

describe('添加计划任务', function() {

  var self = this
    , cookie;

  before(function(done){
    config.login( done, self );
  });

/* 
 *案例编号：SPMS-API-PLANTASKS-ADD001
 *案例名称：成功添加后返回计划任务详细信息
 *案例目标：输入必填字段，验证成功添加计划任务后可以返回正确的计划任务详细信息
 *输入：name‘测试计划任务（一）’，desc‘测试计划任务test PLANTASKS1’
 *预期返回：1、客户端请求已成功相应。
  2、页面正常打开正确。
  3、返回的项目信息与输入一致。
  */


  it('001 成功添加计划任务', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（一）",
        desc:"测试计划任务test PLANTASKS1" ,
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
                  console.log('res.body.data.item',res.body.data.item);
                  expect(200);
                  expect(res.body).to.have.property("code", 0);
                  expect(res.body.data).to.not.have.property("page");
                  expect(res.body.data.item).to.have.deep.property("id","name");
                  expect(res.body.data).to.have.deep.property("item.name","测试计划任务（一）");
                  expect(res.body.data).to.have.deep.property("item.process",0);
                  
                if (err) return done(err);
        done();
      });
  })

/* 
 *案例编号：SPMS-API-PLANTASKS-ADD002
 *案例名称：成功添加后返回计划任务详细信息
 *案例目标：输入所有字段，验证成功添加计划任务后可以返回正确的计划任务详细信息
 *输入：name‘测试计划任务（二）’，desc‘测试计划任务test PLANTASKS2’……
 *预期返回：1、客户端请求已成功相应。
  2、页面正常打开正确。
  3、返回的项目信息与输入一致。
  */

  
  it('002 成功添加计划任务', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（二）",
        desc:"测试计划任务test PLANTASKS2" ,
        creator_id:[{id:'xnqRV7CuSjHm5VX8'},{name:'卢红兵'}],
        assigness:[{id:'xnqRV7CuSjHm5VX8'},{name:'卢红兵'},{id:'vnHMSoFVMX0KUv2y'},{name:'葛鹏'}],
        tags:"标签test2",
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1412783999,   //2014-10-08 23:59:59 .duration工期=23天 算入头尾
        real_start_time:1409500800,  //2014-09-01 00:00:00
        real_end_time:1412783999,  //2014-10-08 23:59:59 
        category:"XXX", //提供类别
        priority:"XXX", //提供优先级标识
        watchor_ids:[{id:'zMxWRWa7aHNGXeRz'},{name:'何乔'},{id:'q1ox7HfIU2BP3DKR'},{name:'左静'}]，
        parent_id:"", //父对象id,没有传空
        pre_taskplan:"任务名称还是id"？//
        pre_taskplan_type:, //提供方式标识
        milestone:1410278399, //里程碑：时间戳 2014-09-09 23:59:59
        comments:"备注test2",
        deliverables:"交付物文档test2", 
        status:0, //提供字典(1开始 0未开始)
        accept_uid:[{id:'xnqRV7CuSjHm5VX8'},{name:'卢红兵'},{id:'vnHMSoFVMX0KUv2y'},{name:'葛鹏'}],
        del_flg:, //待确认
       
             })
      
      .end(function(err, res)
      {      
                  console.log('res.body.data.item',res.body.data.item);
                  expect(200);
                  expect(res.body).to.have.property("code", 0);
                  expect(res.body.data).to.not.have.property("page");
                  expect(res.body.data.item).to.have.deep.property("id","name","XXX","XXX","XXX","XXX","XXX");
                  expect(res.body.data.item).to.have.deep.property("creator_id[0].id","zMxWRWa7aHNGXeRz");


                  
                if (err) return done(err);
        done();
      });
  })

/* 
 *案例编号：SPMS-API-PLANTASKS-ADD003
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：必填字段计划任务名称为空，验证不成功添加计划任务可以返回错误信息代码
 *输入：name‘’，desc‘测试计划任务test PLANTASKS3’
 *预期返回：errorcode 23202，计划任务名称不能为空
  */


  it('003 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "",
        desc:"测试计划任务test PLANTASKS3" ,
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23202);
                expect(res.body).to.have.property("err_memo","计划任务名称不能为空");
                  
                if (err) return done(err);
        done();
      });
  })

  /* 
 *案例编号：SPMS-API-PLANTASKS-ADD004
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：当前登录用户无权现添加计划任务，验证不成功添加计划任务可以返回错误信息代码
 *前置条件：非PO或PM身份登录系统进行添加操作
 *输入：name‘测试计划任务（四）’，desc‘测试计划任务test PLANTASKS4’
 *预期返回：errorcode 23203，没有权限提交操作
  */

/*
  it('004 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（四）",
        desc:"测试计划任务test PLANTASKS4" ,
        creator_id:[{id:'XXXXXX'},{name:'XXXXXX'}],
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23203);
                expect(res.body).to.have.property("err_memo","没有权限提交操作");
                  
                if (err) return done(err);
        done();
      });
  })
*/

  /* 
 *案例编号：SPMS-API-PLANTASKS-ADD005
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：输入已删除的项目id时，验证不成功添加计划任务可以返回错误信息代码
 *前置条件：存在被删除项目id
 *输入：name‘测试计划任务（五）’，desc‘测试计划任务test PLANTASKS5’,pid‘已删除的项目id’
 *预期返回：errorcode 23205，该项目已删除
  */

/*
  it('005 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（五）",
        desc:"测试计划任务test PLANTASKS5" ,
        pid:""  //被删除项目id
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23205);
                expect(res.body).to.have.property("err_memo","该项目已删除");
                  
                if (err) return done(err);
        done();
      });
  })
*/

  /* 
 *案例编号：SPMS-API-PLANTASKS-ADD006
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：输入的计划开始时间大于计划结束时间时，验证不成功添加计划任务可以返回错误信息代码
 *输入：name‘测试计划任务（六）’，desc‘测试计划任务test PLANTASKS6’，plan_start_time‘1410864949’，plan_end_time‘1410797118’
 *预期返回：errorcode 23206，计划开始时间不能大于计划结束时间
  */


  it('006 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（六）",
        desc:"测试计划任务test PLANTASKS6" ,
        plan_start_time:1410864949, //2014-09-16 18:55:49
        plan_end_time:1410797118,  //2014-09-16 00:05:18
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23206);
                expect(res.body).to.have.property("err_memo","计划开始时间不能大于计划结束时间");
                  
                if (err) return done(err);
        done();
      });
  })

  /* 
 *案例编号：SPMS-API-PLANTASKS-ADD007
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：输入的任务执行人不存在，验证不成功添加计划任务可以返回错误信息代码
 *输入：name‘测试计划任务（七）’，desc‘测试计划任务test PLANTASKS7’，assigness {id:'3ABCDEFGhijklmnO'，name:'创新大楼'}
 *预期返回：errorcode 23207，任务执行人不存在
  */


  it('007 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（七）",
        desc:"测试计划任务test PLANTASKS7" ,
        assigness:[{id:'3ABCDEFGhijklmnO'},{name:'创新大楼'}],
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23207);
                expect(res.body).to.have.property("err_memo","任务执行人不存在");
                  
                if (err) return done(err);
        done();
      });
  })

  /* 
 *案例编号：SPMS-API-PLANTASKS-ADD008
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：输入的任务接受人不存在，验证不成功添加计划任务可以返回错误信息代码
 *输入：name‘测试计划任务（八）’，desc‘测试计划任务test PLANTASKS8’，accept_uid {id:'3ABCDEFGhijklmnO'，name:'创新大楼'}
 *预期返回：errorcode 23208，任务接受人不存在
  */


  it('008 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（八）",
        desc:"测试计划任务test PLANTASKS8" ,
        accept_uid:[{id:'3ABCDEFGhijklmnO'},{name:'创新大楼'}],
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23208);
                expect(res.body).to.have.property("err_memo","任务接受人不存在");
                  
                if (err) return done(err);
        done();
      });
  })


  /* 
 *案例编号：SPMS-API-PLANTASKS-ADD009
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：输入的任务观察员不存在，验证不成功添加计划任务可以返回错误信息代码
 *输入：name‘测试计划任务（九）’，desc‘测试计划任务test PLANTASKS9’，watchor_ids {id:'3ABCDEFGhuvwxyzO'，name:'创新大楼'}
 *预期返回：errorcode 23209，任务观察员不存在
  */


  it('009 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（九）",
        desc:"测试计划任务test PLANTASKS9" ,
        watchor_ids:[{id:'3ABCDEFGhijklmnO'},{name:'创新大楼'}],
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23209);
                expect(res.body).to.have.property("err_memo","任务观察员不存在");
                  
                if (err) return done(err);
        done();
      });
  })


  /* 
 *案例编号：SPMS-API-PLANTASKS-ADD010
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：输入的计划任务父任务不存在，验证不成功添加计划任务可以返回错误信息代码
 *输入：name‘测试计划任务（十）’，desc‘测试计划任务test PLANTASKS10’，parent_id ‘3ABCDEFGhuvwxyzO’
 *预期返回：errorcode 23210，计划任务父任务不存在
  */

  it('010 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（十）",
        desc:"测试计划任务test PLANTASKS10" ,
        parent_id:"3ABCDEFGhuvwxyzO", //父对象id
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23210);
                expect(res.body).to.have.property("err_memo","计划任务父任务不存在");
                  
                if (err) return done(err);
        done();
      });
  })
  
  /* 
 *案例编号：SPMS-API-PLANTASKS-ADD011
 *案例名称：不成功添加计划任务，返回错误信息
 *案例目标：输入的计划任务重复，验证不成功添加计划任务可以返回错误信息代码
 *输入：name‘测试计划任务（一）’，desc‘测试计划任务test PLANTASKS11’
 *预期返回：errorcode 23211，计划任务名称已存在
  */

  it('010 添加计划任务不成功后返回错误信息', function(done){
     api.post('/spms/plan/tasks')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent',config.browser)
      .send({ 
        name: "测试计划任务（一）",
        desc:"测试计划任务test PLANTASKS11" ,
        parent_id:"3ABCDEFGhuvwxyzO",
        plan_start_time:1409500800,  //2014-09-01 00:00:00
        plan_end_time:1410278399, //2014-09-09 23:59:59
             })
      
      .end(function(err, res)
      {      
             //     console.log('res.body.data.item',res.body.data.item);
                expect(res.body).to.have.property("err_code",23211);
                expect(res.body).to.have.property("err_memo","计划任务名称已存在");
                  
                if (err) return done(err);
        done();
      });
  })











  after( function(){
    delete this.cookie;
  } )

});