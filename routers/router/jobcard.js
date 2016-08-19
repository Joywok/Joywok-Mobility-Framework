// 获取报工信息（day／week）
router.route('/spms/jobcard/list')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-list.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 获取创建人所有项目，子项目以及成果
router.route('/spms/jobcard/targets')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-targets.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 单条报工
router.route('/spms/jobcard/')
  .all(function(req, res, next){
    next();
  })
  // 获取单条报工
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-single.json');
    res.end(JSON.stringify(eval("("+data+")")['get']));
    next();
  })
  // 添加单条报工
  .post(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-single.json');
    res.end(JSON.stringify(eval("("+data+")")['post']['result']));
    next();
  })
  // 更新单条报工
  .put(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-single.json');
    res.end(JSON.stringify(eval("("+data+")")['put']['result']));
    next();
  })
  // 删除单条报工
  .delete(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-single.json');
    res.end(JSON.stringify(eval("("+data+")")['delete']['delete']));
    next();
  })

// 复制一天报工信息
router.route('/spms/jobcard/copy?copyday=:copyday&newday=:newday')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-copy.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

