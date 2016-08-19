// 里程碑展示列表
  router.route('spms/milestone/milestone')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/milestone-list.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
  //读取流程
    router.route('/spms/milestone/milestone/:id')
      .all(function(req,res,next){
        next();
      })
      .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/milestone-detail.json');
        res.end(JSON.stringify(eval("("+data+")")));
        next();
      })