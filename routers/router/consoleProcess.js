//部门列表
  router.route('/spms/approve/getdeptinfo')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-process-dept.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })


//流程列表
  router.route('/spms/approve/synthesisqueryprocessinfo')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-process-list.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })