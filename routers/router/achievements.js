// 成果列表
router.route('/spms/achievement/achievements/pid/:pid')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-achievements.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 项目成果文档列表
router.route('/spms/achievement/:achievementid/achievementdocs/')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-achievementdocs.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  })
  .put(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-achievementdocs-put.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 上传项目成果文档
router.route('/spms/achievement/:chievement_id/achievementdoc/')
  .all(function(req, res, next){
    next();
  })
  .post(function(req,res,next){
    var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-achievementdocs-post.json');
    res.end(JSON.stringify({code:0, data:eval("(" + data + ")"), systime:Date.parse(new Date())}));
  });

// 项目文档列表
router.route('/spms/project/:pid/docs/')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-docs.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 非项目成果文档列表
router.route('/spms/project/:pid/nonachdocs/')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-nonachdocs.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 数据字典
router.route('/spms/achievement/docTypelist')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/docTypelist.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

