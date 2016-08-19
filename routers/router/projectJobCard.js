  //项目list列表
  router.route('/spms/projectjobcard/:id')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-jobcard.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
  