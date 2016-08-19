  //个人项目工时list列表
  router.route('/spms/personaljobcard')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/personal-jobcard.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
