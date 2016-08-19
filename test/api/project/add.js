var config = require('../common.js')
  , expect = require('chai').expect
  , supertest = require('supertest')

describe('新建项目', function() {

  var self = this
    , cookie
    , api = supertest(config.host);

  before(function(done){
    config.login( done, self );
  });

/*
 *案例编号：SPMS-API-PROJECT-ADD001
 *案例名称：成功添加后返回项目详细信息
 *案例目标：验证成功添加项目后可以返回正确的项目详细信息
 *输入：项目名称‘测试项目（一）’，项目描述“测试项目”
 *预期返回：1、服务器正常响应。
  2、页面正常打开正确。
  3、返回的项目名称与描述与输入一致。 
  */
 
  it('001 添加成功后返回项目信息', function(done){
    api.post('/spms/project/projects')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent', config.browser)
      .send({ 
        name: "测试项目（一）", 
        desc:"这是一个测试项目" ,
             })
      
      .end(function(err, res)
      {
     //   console.log(res.body);
               expect(200);
               expect(res.body).to.have.property("code", 0);
               expect(res.body).to.have.property("data");
               expect(res.body.data.item).to.have.property("name", "测试项目（一）");
               expect(res.body.data).to.not.have.property("page");
        if (err) return done(err);
        done();
      });
  })
  

 /*
 * 案例编号：SPMS-API-PROJECT-ADD002
 *案例名称：成功添加后返回项目详细信息
 *案例目标：输入必填字段与非必填字段，验证成功添加项目后可以返回正确的项目详细信息
 *输入：项目名称‘测试项目（二）’，项目描述“测试项目”，项目成员“卢红兵”，“葛鹏”
 *预期返回：1、客户端请求已成功相应。
  2、页面正常打开正确。
  3、返回的项目信息与输入一致。 
  */
/*
  it('002 添加成功后返回项目信息', function(done){
    api.post('/spms/project/projects')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent', config.browser)
      .send({ 
        name: "测试项目（二）", 
        desc:"这是一个测试项目，来自于Gulp" ,
        member:[
            {"id":"jdriBG385ZRMCwNJ","name":"刘子实"},
            {"id":"kkCaYdDpsVuUvgdo","name":"刘娟"}
          ]
        })
      
      .end(function(err, res){
        expect(res.body).to.have.deep.property("code", 0);  //与下面一句不同写法，同样的作用
        //expect(res.body).to.deep.equal("code",0);
        expect(200);
        console.log('project name:',res.body.data.item.name)
        expect(res.body).to.have.deep.property("data.item.name", "测试项目（二）";
        if (err) return done(err);
        done();
      });
  })
*/
 /*
 * 案例编号：SPMS-API-PROJECT-ADD003
 *案例名称：不成功添加项目，返回错误信息
 *案例目标：不输入必填字段项目名称，验证不成功添加项目后可以返回错误信息代码
 *输入：项目名称‘’，项目描述“测试项目”
 *预期返回：发布的项目名称不能为空 
  */
  /*
  it('003 添加不成功后返回错误信息', function(done){
    api.post('/spms/project/projects')
      .set('Accept', 'application/json')
      .set('Cookie', self.cookie)
      .set('User-Agent', config.browser)
      .send({ 
         name: '', 
         desc:"这是一个测试项目，来自于Gulp" ,
        })
       .end(function(err, res){
         expect(res.body).to.contain('errcode');
         // expect(res.body).to.contain.keys('errcode');
         if (err) return done(err);
         done();
      });
  })
*/


  after( function(){
    delete this.cookie;
  } )

});