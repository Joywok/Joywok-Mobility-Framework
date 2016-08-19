module.exports = {
  "host":"http://10.2.5.191",
  "browser":"User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
  "login": function(done, self){
  	var supertest = require('supertest')
      , api = supertest('http://10.2.5.191');

  	api.get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          self.cookie = res.headers['set-cookie'];
          api.post('/auth/check?email=luhongbing@chinamobile.com&passwd=123456&rem=0')
            .set('Accept', 'application/json')
            .set('Cookie', self.cookie)
            .set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36')
            .end(function(err, res){
              // console.log('xxx',res.body)
              if (err) return done(err);
              // expect(res.body).to.have.property("code", 0);
              // expect(res.body).to.have.deep.property("code", 0);
              console.log('登录成功');
              done();
            });
        });
  }
}