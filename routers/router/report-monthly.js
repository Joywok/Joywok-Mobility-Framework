// 项目信息
router.route('/spms/report/monthly/project/:id')
  .all(function(req, res, next){
    next();
  })
  // 获取月报
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/report-monthly-project-info.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 单条月报
router.route('/spms/report/monthly')
  .all(function(req, res, next){
    next();
  })
  // 获取月报
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/report-monthly.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  })
  // 添加月报
  .post(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/report-monthly.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  })
  // 更新月报
  .put(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/report-monthly.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  })
