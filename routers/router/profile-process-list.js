//流程列表 待办
  router.route('/spms/approve/getProcessListBySearch')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/profile-process-todo.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

//流程列表 待阅
  router.route('/spms/approve/getstayreadlist')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/profile-process-toread.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

  //流程列表 已办
  router.route('/spms/approve/getcompletelist')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/profile-process-havetodo.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })