router.route('/spms/project/projectsssss')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })