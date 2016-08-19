//里程碑列表
router.route('/spms/plantask/relevanceproject/:id')
  .all(function(req,res,next){
    next();
  })
  .get(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-subprojects.json');
    // res.end(JSON.stringify(eval("("+data+")")));
    res.end(JSON.stringify({code:0,data:{list:eval("("+data+")")},systime:Date.parse(new Date())}));
    next();
  })
