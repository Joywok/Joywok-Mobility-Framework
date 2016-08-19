var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://10.2.5.191/api');

describe('Authentication', function() {

  it('用户名错误', function(done) {
    api.get('/account/login')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect({ errcode: 20122, errmemo: '手机号错误' }, done);
  });

  it('密码错误', function(done) {
    // api.get('/account/login?email=luhongbing@chinamobile.com&password=xxxxxx&appkey=osns_mobile&appsecret=D6M71m1tIDLziK9g')
    api.get('/account/login?email=luhongbing@chinamobile.com&password=xxxxxx&appkey=osns_mobile&appsecret=D6M71m1tIDLziK9g')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect({ errcode: 20302, errmemo: '密码错误' }, done);
  });

  it('用户不存在', function(done) {
    api.get('/account/login?email=xluhongbing@chinamobile.com&password=xxxxxx&appkey=osns_mobile&appsecret=D6M71m1tIDLziK9g')
    // .send({"email": "donghui@chinamobile.com", "password": "123"})
    .expect(200)
    .expect('Content-Type', /json/)
    .expect({ errcode: 20109, errmemo: '用户不存在' }, done);
  });

  it('密码正确', function(done) {
    api.get('/account/login?email=luhongbing@chinamobile.com&password=abcd1234&appkey=osns_mobile&appsecret=D6M71m1tIDLziK9g')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect({ name: '卢红兵' }, done);
  });
  // 验证临时密码
  /*
  it('errors if bad x-api-key header', function(done) {
    api.get('/blog')
    .auth('correct', 'credentials')
    .expect(401)
    .expect({error:"Bad or missing app identification header"}, done);
  });
  */
});